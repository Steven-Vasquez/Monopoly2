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
    socket.emit("joinVoice", lobbyID); // Joins voice chat socket room (for example: voiceChat:1)


    socket.on("offer", (data: any) => {
        if (inVoiceChat) {
            console.log("Received an offer from user:", data.from);

            const peerConnection = createPeerConnection();

            // Assuming you have a participant with the given `data.from` ID in your participants state.
            const senderParticipant = participants.find((participant) => participant.id === data.from);

            if (senderParticipant) {
                const senderStream = senderParticipant.audioStream;

                // Add the sender's audio stream to the peer connection
                senderStream.getTracks().forEach((track) => {
                    peerConnection.addTrack(track, senderStream);
                });

                // Create an answer
                createAnswer(peerConnection)
                    .then((answer) => {
                        // Set the local description of the peer connection
                        return peerConnection.setLocalDescription(answer);
                    })
                    .then(() => {
                        // Send the answer back to the sender
                        socket.emit("answer", {
                            to: data.from,
                            from: user_id,
                            answer: peerConnection.localDescription,
                        });
                    })
                    .catch((error) => {
                        console.error("Error creating answer:", error);
                    });
            } else {
                console.warn("Sender participant not found.");
            }
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
        axiosInstance.get("/getUserID")
            .then(res => {
                setUser_id(res.data.user_id);
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

            // Add the new participant to the list
            setParticipants([...participants, { id: participantId, audioStream, peerConnection }]);

            // Send an offer to all other participants
            participants.forEach((participant) => {
                if (participant.id !== participantId) {
                    createOffer(peerConnection).then((offer) => {
                        console.log("Sending offer to:", participant.id + ": " + offer);
                        socket.emit("offer", {
                            to: participant.id,
                            from: user_id,
                            offer,
                        });
                    });
                }
            });

            // Add the audio stream to the peer connection
            audioStream.getTracks().forEach((track) => {
                peerConnection.addTrack(track, audioStream);
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
            socket.emit("userLeftVoiceChat", participantId);
        } else {
            console.warn("Leaving participant not found.");
        }
        setInVoiceChat(false);
    };

    // // Handle mute/unmute
    // const toggleMute = () => {
    //     setMuted(!muted);
    // };

    // // Handle deafen/undeafen
    // const toggleDeafen = () => {
    //     setDeafened(!deafened);
    // };

    // Disconnect from socket when component unmounts
    useEffect(() => {
        return () => {
            socket.disconnect();
        }
    }, [socket]);

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
                        <button className="toggle-icon-button" onClick={() => {setMuted(!muted)}}>
                            {muted ? <span title="Unmute mic"><MicrophoneSlash size={20} color="#fff" weight="bold" /></span> : <span title="Mute mic"><Microphone size={20} weight="bold" /></span>}
                        </button>
                        <button className="toggle-icon-button" onClick={() => {setDeafened(!deafened)}}>
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
                {participants.map((participant) => (
                    <div>
                        <span key={participant.id}>{participant.id}</span>
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
