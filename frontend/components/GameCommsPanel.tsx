import '../stylesheets/GameCommsPanel.css';
import { useState, useEffect } from 'react';
import TextChatBox from './TextChatBox.tsx';
import VoiceChatRoom from './voice/VoiceChatRoom.tsx';
import GameActionsLog from './GameActionsLog.tsx';

export function GameCommsPanel(props: any) {
    const [showLog, setShowLog] = useState(false);

    // Show/hide chat and log when corresponding tab is clicked
    function toggleChat(event: React.MouseEvent<HTMLButtonElement>) {
        setShowLog(false);
        event.currentTarget.classList.add('active'); // Add active class to clicked button for underline
        event.currentTarget.nextElementSibling?.classList.remove('active');
    }

    function toggleLog(event: React.MouseEvent<HTMLButtonElement>) {
        setShowLog(true);
        event.currentTarget.classList.add('active'); // Add active class to clicked button for underline
        event.currentTarget.previousElementSibling?.classList.remove('active');
    }

    useEffect(() => {
        // Add active class to Chat button when component is first rendered (tab underline to be displayed on page load)
        const chatButton = document.querySelector('.tab:nth-child(1)') as HTMLButtonElement;
        chatButton.classList.add('active');
    }, []);

    return (
        <div className="comms-panel-container">
            <div className="tabs">
                <button type="button" className="tab" onClick={toggleChat}>Chat</button>
                <button type="button" className="tab" onClick={toggleLog}>Action Log</button>
            </div>
            <div className="log" style={{ display: showLog ? 'block' : 'none' }}>
                <GameActionsLog />
            </div>
            <div className="chat" style={{ display: showLog ? 'none' : 'block' }}>
                <VoiceChatRoom />
                <hr></hr>
                <TextChatBox game_id={'0'} socket={props.socket} />
            </div>

        </div>
    );
};

export default GameCommsPanel;
