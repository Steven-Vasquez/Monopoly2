import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../backend/axiosInstance.ts";
import io from "socket.io-client";

import Participant from "./Participant.tsx"; // Import your Participant component

import { createPeerConnection, createOffer, createAnswer } from "./utility/webRTCUtils.ts";


function VoiceChatRoom() {
    const [inVoiceChat, setInVoiceChat] = useState(false); // State to manage whether the user is in the voice chat or not
    const [participants, setParticipants] = useState<Participant[]>([]); // Use state to manage the participants in the chat
    const [muted, setMuted] = useState(false); // State to manage mute/unmute
    const [user_id, setUser_id] = useState(0);

    // Connecting to the socket room of the lobby for lobby-wide event updates
    const { lobbyID } = useParams<{ lobbyID: string }>();
    const socket = io("http://localhost:3001");

    socket.on("userLeftVoiceChat", (participantId: number) => {
        handleLeaveVoiceChat(participantId);
    });

    socket.on("userJoinedVoiceChat", (participantId: number) => {
        handleJoinVoiceChat(participantId);
    });

    socket.on("offer", (data: any) => {
        console.log("offer received");
        socket.emit("answer", data);
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
    const handleJoinVoiceChat = (participantId: number) => {
        socket.emit("joinVoiceChat", lobbyID);
        const audioRef = useRef<HTMLAudioElement | null>(null); // Create an audioRef
        setInVoiceChat(true); // Set inVoiceChat to true
        // Add the participant to the list
        setParticipants([...participants, { id: participantId, audioRefPassed: audioRef }]);
    };

    // Handle leaving the chat
    const handleLeaveVoiceChat = (participantId: number) => {
        // Remove the participant from the list
        setParticipants(participants.filter((p) => p.id !== participantId));
    };

    // Handle mute/unmute
    const toggleMute = () => {
        setMuted(!muted);
    };

    return (
        <div className="voice-chat-room">
            {inVoiceChat ? (
                <div>
                    <button onClick={() => handleLeaveVoiceChat(user_id)}>
                        Leave Voice Chat
                    </button>

                    <button onClick={toggleMute}>
                        {muted ? "Unmute" : "Mute"} {/* Toggle mute/unmute button */}
                    </button>

                    <div>
                        {participants.map((participant) => (
                            <Participant key={participant.id} id={participant.id} audioRefPassed={participant.audioRefPassed} />
                        ))}
                    </div>

                </div>

            ) : (
                <div>
                    <h1>You are not in the voice chat!</h1>
                    <button onClick={() => handleJoinVoiceChat(user_id)}>
                        Join Voice Chat {/* Replace '1' with the participant ID */}
                    </button>
                </div>
            )}

        </div>
    );
};

export default VoiceChatRoom;
