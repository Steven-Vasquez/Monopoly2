import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import axiosInstance from "../../../backend/axiosInstance.ts";
import io from "socket.io-client";

import { createPeerConnection, createOffer, createAnswer } from "./utility/webRTCUtils.ts";
import "../../stylesheets/VoiceChatRoom.css";
import { PhoneCall, PhoneX, Microphone, MicrophoneSlash, SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react";

function VoiceChatRoom() {
    const [joinedVoice, setJoinedVoice] = useState(false);
    const [inVoiceChat, setInVoiceChat] = useState(false); // State to manage whether the user is in the voice chat or not
    const [user_id, setUser_id] = useState(0);
    const inVoiceChatRef = useRef(inVoiceChat);
    const user_idRef = useRef(user_id);
    const [participants, setParticipants] = useState<{ // Use state to manage the participants in the chat
        id: number;
        audioStream: MediaStream
        peerConnection: RTCPeerConnection;
    }[]>([]);

    const [muted, setMuted] = useState(false); // State to manage mute/unmute
    // TODO
    const [deafened, setDeafened] = useState(false); // State to manage deafen/undeafen

    // Connecting to the socket room of the lobby for lobby-wide event updates
    const { lobbyID } = useParams<{ lobbyID: string }>();
    const socket = io("http://localhost:3001");

    if (!joinedVoice) {
        socket.emit("joinVoice", lobbyID); // Joins voice chat socket room (for example: voiceChat:1)
    }

    /*
    useEffect(() => {
        if (!joinedVoice) {
            console.log("Joining voice chat socket room: " + lobbyID);
            socket.emit("joinVoice", lobbyID); // Joins voice chat socket room (for example: voiceChat:1)
            setJoinedVoice(true); // Set the state to indicate that the join has occurred
            socket.emit("test", lobbyID);
        }
        else {
            console.log("Already joined voice chat socket room");
        }
    }, [lobbyID]);
    */

    // Update the ref of "inVoiceChat" when the state changes
    useEffect(() => {
        inVoiceChatRef.current = inVoiceChat;
        //console.log("Updated inVoiceChatRef:", inVoiceChatRef.current);
    }, [inVoiceChat]);

    // Update the ref of "user_id" when the state changes
    useEffect(() => {
        user_idRef.current = user_id;
        //console.log("Updated user_idRef:", user_idRef.current);
    }, [user_id]);

    // Handle receiving a new participant
    useEffect(() => {
        console.log("a socket listener is being added");
        socket.on("userJoinedVoiceChat", (data: any) => {
            console.log("A user has joined the voice room (not chat)");
        });
        // Clean up the event listener
        return () => {
            console.log("a socket listener is being removed");
            socket.off("userJoinedVoiceChat");
        }
    }, []);

    // Handle receiving an offer from another user
    useEffect(() => {
        interface OfferData {
            from: number;
            offer: RTCSessionDescriptionInit;
        }

        socket.on("offer", async (data: OfferData) => {
            const { from, offer } = data;

            //console.log("Received an offer from another user");
            console.log("from: " + from);
            console.log("inVoiceChatRef from \"offer\":" + inVoiceChatRef.current);
            console.log(from !== user_idRef.current);
            if (inVoiceChat && from !== user_idRef.current) {
                console.log("Received an offer from user:", from);

                // Create a new RTCPeerConnection for the current user
                const peerConnection = createPeerConnection();
                peerConnection.addEventListener('icegatheringstatechange', () => {
                    console.log('ICE Gathering State:', peerConnection.iceGatheringState);
                });

                // Set the remote description of the current user's peer connection with the received offer
                console.log("Setting remote description");
                await peerConnection.setRemoteDescription(offer);


                
                // Create an answer for the received offer, setting peerConnection.localDescription properly
                // Wait for createAnswer to complete before accessing localDescription
                const answer = await createAnswer(peerConnection);

                const localDescription = peerConnection.localDescription;
                
                // Handle the ontrack event to get the remote participant's audioStream
                peerConnection.ontrack = (event) => {
                    const remoteAudioStream = event.streams[0];

                    // Now you can use remoteAudioStream as needed
                    console.log("Received remote audio stream:", remoteAudioStream);

                    // Update the local state with the new participant and their peer connection
                    setParticipants(prevParticipants => [...prevParticipants, { id: from, audioStream: remoteAudioStream, peerConnection }]);
                };

                // Send the answer to the user who sent the offer
                socket.emit("answer", {
                    to: from,
                    from: user_id,
                    answer: localDescription,
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

        // Clean up the event listener
        return () => {
            socket.off("offer");
            socket.off("answer");
        }
    }, [socket]);


    // Handle joining the chat
    const handleJoinVoiceChat = async (participantId: number) => {
        // Create a new RTCPeerConnection for this participant
        console.log("handleJoinVoiceChat is being called");

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

            if (offer === null) {
                console.log("Offer is null");
                return;
            }

            console.log("Sending offer to server:");
            console.log("id: " + participantId);
            console.log("offer: " + offer);
            console.log("game_id: " + lobbyID);

            const offerData = {
                type: offer.type,
                sdp: offer.sdp,
            };
            // Notify other users about the new participant and include relevant details for connection setup
            setInVoiceChat(true); // Set inVoiceChat to true

            socket.emit("newParticipant",
                participantId,
                offer, // Include the offer for connection setup
                lobbyID,
            );

        } catch (error) {
            console.error("Error accessing SpeakerHigh:", error);
        }
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


    useEffect(() => {
        // Get the current user's ID
        axiosInstance.get("/getUserID")
            .then(res => {
                setUser_id(res.data.id);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        console.log("user_id from useEffect:", user_id);
    }, [user_id]);

    // Disconnect from socket when component unmounts
    useEffect(() => {
        return () => {
            socket.disconnect();
        }
    }, []);

    const testFunction = () => {
        console.log("test function");
        console.log("user_id: " + user_id);
        socket.emit("test", lobbyID);
    }

    useEffect(() => {
        socket.on("testReceived", (data: any) => {
            console.log("test received");
        });
        // Clean up the event listener
        return () => {
            socket.off("testReceived");
        }
    }, [socket]);

    useEffect(() => {
        console.log("inVoiceChat: " + inVoiceChat);
    }, [inVoiceChat]);

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
                <button onClick={() => testFunction()}>Test</button>

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
