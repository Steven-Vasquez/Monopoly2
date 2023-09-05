import React from 'react';
import { useState } from 'react';

function VoiceChat() {

    const [inVoiceChat, setInVoiceChat] = useState(false);

    const handleJoinVoiceChat = () => {
        console.log("Joining voice chat...");
    }


    const handleLeaveVoiceChat = () => {
        console.log("Leaving voice chat...");
    }

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

export default VoiceChat;