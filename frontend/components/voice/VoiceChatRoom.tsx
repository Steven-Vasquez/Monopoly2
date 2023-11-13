import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../backend/axiosInstance.ts";
import io from "socket.io-client";

import { createPeerConnection, createOffer, createAnswer } from "./utility/webRTCUtils.ts";
import "../../stylesheets/VoiceChatRoom.css";
import { PhoneCall, PhoneX, Microphone, MicrophoneSlash, SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react";

function VoiceChatRoom() {
    const [inVoiceChat, setInVoiceChat] = useState(false); // State to manage whether the user is in the voice chat or not
    const [participants, setParticipants] = useState<{ // Use state to manage the participants in the chat
        id: number;
        audioStream: MediaStream
        peerConnection: RTCPeerConnection;
    }[]>([]);

    const [muted, setMuted] = useState(false); // State to manage mute/unmute
    // TODO
    const [deafened, setDeafened] = useState(false); // State to manage deafen/undeafen
    const [user_id, setUser_id] = useState(0);

    // Connecting to the socket room of the lobby for lobby-wide event updates
    const { lobbyID } = useParams<{ lobbyID: string }>();
    const socket = io("http://localhost:3001");


    useEffect(() => {
        socket.emit("joinVoice", lobbyID); // Joins voice chat socket room (for example: voiceChat:1)
        /*
        return () => {
            socket.emit("leaveVoice", lobbyID);
            socket.disconnect();
        }*/
    }, [lobbyID, socket]);

    socket.on("userJoinedVoiceChat", (data: any) => {
        //console.log("the test io.to event was received");
    });

    socket.on("offer", async (from: number, offer: RTCSessionDescriptionInit) => {
        console.log("Received an offer from another user");
        if (inVoiceChat) {
            console.log("Received an offer from user:", from);

            // Create a new RTCPeerConnection for the current user
            const peerConnection = createPeerConnection();

            // Set the remote description of the current user's peer connection with the received offer
            await peerConnection.setRemoteDescription(offer);

            // Handle the ontrack event to get the remote participant's audioStream
            peerConnection.ontrack = (event) => {
                const remoteAudioStream = event.streams[0];

                // Now you can use remoteAudioStream as needed
                console.log("Received remote audio stream:", remoteAudioStream);

                // Update the local state with the new participant and their peer connection
                setParticipants(prevParticipants => [...prevParticipants, { id: from, audioStream: remoteAudioStream, peerConnection }]);
            };

            // Create an answer for the received offer
            const answer = await createAnswer(peerConnection);

            // Set the local description of the current user's peer connection to the created answer
            await peerConnection.setLocalDescription(answer);

            // Send the answer to the user who sent the offer
            socket.emit("answer", {
                to: from,
                from: user_id,
                answer: peerConnection.localDescription,
            });

        }
    });

    socket.on("answer", (data: any) => {
        if (inVoiceChat) {
            console.log("Received an answer from user:", data.from);

            // Find the receiver's participant based on the data.from ID
            const receiverParticipant = participants.find((participant) => participant.id === data.from);

            if (receiverParticipant) {
                const peerConnection = receiverParticipant.peerConnection;

                // Set the remote description of the peer connection with the received answer
                peerConnection.setRemoteDescription(data.answer)
                    .then(() => {
                        console.log("Remote description set successfully.");
                    })
                    .catch((error) => {
                        console.error("Error setting remote description:", error);
                    });
            } else {
                console.warn("Receiver participant not found.");
            }
        }
    });

    useEffect(() => {
        // Get the current user's ID
        //console.log("Getting user id");
        axiosInstance.get("/getUserID")
            .then(res => {
                setUser_id(res.data.id);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);


    // Handle joining the chat
    const handleJoinVoiceChat = async (participantId: number) => {
        // Create a new RTCPeerConnection for this participant
        const peerConnection = createPeerConnection();
        try {
            const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });

            // Add the local audio track to the peer connection
            audioStream.getTracks().forEach((track) => {
                peerConnection.addTrack(track, audioStream);
            });

            // Add the new participant to the list. Functional form of setParticipants is used to ensure that the state is updated correctly.
            setParticipants(prevParticipants => [...prevParticipants, { id: participantId, audioStream, peerConnection }]);

            const offer = await createOffer(peerConnection); // Create an offer for connection setup

            // Notify other users about the new participant and include relevant details for connection setup
            socket.emit("newParticipant", {
                id: participantId,
                offer: offer, // Include the offer for connection setup
                game_id: lobbyID,
            });

        } catch (error) {
            console.error("Error accessing SpeakerHigh:", error);
        }
        setInVoiceChat(true); // Set inVoiceChat to true
    };

    // Handle leaving the chat
    const handleLeaveVoiceChat = (participantId: number) => {
        // Find the leaving participant in the state
        const leavingParticipant = participants.find((participant) => participant.id === participantId);

        if (leavingParticipant) {
            // Close the associated RTCPeerConnection
            const peerConnection = leavingParticipant.peerConnection;
            peerConnection.close();

            // Remove the participant from the state
            setParticipants((prevParticipants) =>
                prevParticipants.filter((participant) => participant.id !== participantId)
            );

            // Notify the server or other participants, if needed
            // For example, you can emit a "userLeftVoiceChat" event to inform others
            socket.emit("leaveVoice", lobbyID);
        } else {
            console.warn("Leaving participant not found.");
        }
        setInVoiceChat(false);
    };

    // // Handle mute/unmute
    const toggleMute = () => {
        setMuted(!muted);
    };

    // // Handle deafen/undeafen
    // const toggleDeafen = () => {
    //     setDeafened(!deafened);
    // };

    // Disconnect from socket when component unmounts
    useEffect(() => {
        return () => {
            socket.disconnect();
        }
    }, []);


    return (
        <div className="voice-chat-room-container" id="voice-chat-room">
            <h3>Voice</h3>
            <div id="voice-controls">
                {inVoiceChat ? (
                    <>
                        <button className="voice-toggle" onClick={() => handleLeaveVoiceChat(user_id)}>
                            <PhoneX size={24} color="#fff" weight="bold" />
                            Leave Voice
                        </button>
                        <button className="toggle-icon-button" onClick={() => { setMuted(!muted) }}>
                            {muted ? <span title="Unmute mic"><MicrophoneSlash size={20} color="#fff" weight="bold" /></span> : <span title="Mute mic"><Microphone size={20} weight="bold" /></span>}
                        </button>
                        <button className="toggle-icon-button" onClick={() => { setDeafened(!deafened) }}>
                            {deafened ? <span title="Unmute voice chat"><SpeakerSlash size={20} color="#fff" weight="bold" /></span> : <span title="Mute voice chat"><SpeakerHigh size={20} weight="bold" /></span>}
                        </button>
                    </>
                ) : (
                    <button className="voice-toggle" onClick={() => handleJoinVoiceChat(user_id)}>
                        <PhoneCall size={24} color="#fff" weight="bold" />
                        Join Voice
                    </button>
                )}

            </div>
            <div>
                {participants
                    .filter((participant) => participant.id !== user_id)
                    .map((participant) => (
                        <div key={participant.id}>
                            <span>{participant.id}</span>
                            <audio
                                autoPlay
                                muted={muted}
                                ref={(audioElement) => {
                                    if (audioElement) {
                                        audioElement.srcObject = participant.audioStream;
                                    }
                                }}
                            />
                        </div>
                    ))}
            </div>

            {/* {inVoiceChat ? (
                <div id="voice-controls">
                    <span title="Leave voice chat">
                        <Button variant="primary" style={{ width: "auto", padding: "0.3rem 0.5rem 0.6rem 0.5rem" }} onClick={() => handleLeaveVoiceChat(user_id)}>
                            <PhoneX size={20} color="#fff" weight="bold" /> Leave Voice
                        </Button>
                    </span>

                </div>

            ) : (
                <div> */}
            {/* Replace '1' with the participant ID */}
            {/* <span title="Join voice chat">
                        <Button variant="primary" style={{ width: "auto", padding: "0.3rem 0.5rem 0.6rem 0.5rem" }} onClick={() => handleJoinVoiceChat(user_id)}>
                            <PhoneCall size={20} color="#fff" weight="bold" /> Join Voice
                        </Button>
                    </span>
                </div>
            )} */}

        </div>
    );
};

export default VoiceChatRoom;
