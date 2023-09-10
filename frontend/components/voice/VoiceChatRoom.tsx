import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";

import Participant from "./Participant.tsx"; // Import your Participant component



function VoiceChatRoom() {
    const [user_id, setUser_id] = useState(0);
    
    // Use state to manage the participants in the chat
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [muted, setMuted] = useState(false); // State to manage mute/unmute
   
    // Connecting to the socket room of the lobby for lobby-wide event updates
    const { lobbyID } = useParams<{ lobbyID: string }>();
    const socket = io("http://localhost:3001");
    socket.emit("join", lobbyID);

    useEffect(() => {
        // Get the current user's ID
        axios.get("http://localhost:3001/getUserID")
            .then(res => {
                setUser_id(res.data.user_id);
            })
            .catch(err => {
                console.log(err);
            });

        
    }, []);


    // Handle joining the chat
    const handleJoinVoiceChat = (participantId: number) => {
        const audioRef = useRef<HTMLAudioElement | null>(null); // Create an audioRef

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
            <div>
                <button onClick={toggleMute}>
                    {muted ? "Unmute" : "Mute"} {/* Toggle mute/unmute button */}
                </button>
            </div>
            <div>
                {participants.map((participant) => (
                    <Participant key={participant.id} id={participant.id} audioRefPassed={participant.audioRefPassed} />
                ))}
            </div>
            <div>
                <button onClick={() => handleJoinVoiceChat(user_id)}>
                    Join Voice Chat {/* Replace '1' with the participant ID */}
                </button>
                <button onClick={() => handleLeaveVoiceChat(user_id)}>
                    Leave Voice Chat {/* Replace '1' with the participant ID */}
                </button>
            </div>
        </div>
    );
};

export default VoiceChatRoom;
