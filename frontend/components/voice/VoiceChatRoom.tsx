import React from 'react';
import { useState } from 'react';

import Participant from "./Participant.tsx";

function VoiceChatRoom() {
    const [participants, setParticipants] = useState([]);
    const [inVoiceChat, setInVoiceChat] = useState(false);
    const [isMuted, setIsMuted] = useState(false);



    const handleJoinVoiceChat = () => {
        // Simulate joining a voice chat room and fetching participants
        // Replace this with your actual logic for joining a voice chat room
        // For now, we'll simulate two participants
        setParticipants(["User 1", "User 2"]);
        setInVoiceChat(true);
    };


    const handleLeaveVoiceChat = () => {
        // Simulate leaving the voice chat room
        // Replace this with your actual logic for leaving the voice chat room
        setParticipants([]);
        setInVoiceChat(false);
        setIsMuted(false);
    };

    const handleToggleMute = () => {
        // Toggle mute state
        setIsMuted(!isMuted);
    };

    return (

        inVoiceChat ? (
            <div>
                {/* Content when inChat is true */}
                <button onClick={() => handleJoinVoiceChat()}>Leave Voice Chat</button>
            </div>
        ) : (
            <div>
                {/* Content when inChat is false */}
                <button onClick={() => handleLeaveVoiceChat()}>Join Voice Chat</button>
            </div>
        )
    );
}

export default VoiceChatRoom;