import '../stylesheets/GameCommsPanel.css';
import { useState, useEffect, useRef } from 'react';
import TextChatBox from './TextChatBox.tsx';
import VoiceChatRoom from './voice/VoiceChatRoom.tsx';
import GameActionsLog from './GameActionsLog.tsx';

export function GameCommsPanel(props: any) {

    const chatbox = useRef<HTMLDivElement>(null);
    const tabs = useRef<HTMLDivElement>(null);
    const [chatHeight, setChatHeight] = useState(0)

    const [activeTab, setActiveTab] = useState('chat'); // Chat tab is active by default
    const [showLog, setShowLog] = useState(false);      // Log is hidden by default

    useEffect(() => {
        if (chatbox.current && tabs.current) {
            const tabsHeight = tabs.current!.getBoundingClientRect().height;
            const chatBoxHeight = chatbox.current!.getBoundingClientRect().height;
            const voiceHeight = chatbox.current!.querySelector('#voice-chat-room')!.getBoundingClientRect().height;
            // console.log(chatbox.current!)
            setChatHeight(chatBoxHeight - voiceHeight);
            // .getBoundingClientRect().height;
            window.addEventListener('resize', () => {
                const tabsHeight = tabs.current!.getBoundingClientRect().height;
                const chatBoxHeight = chatbox.current!.getBoundingClientRect().height;
                const voiceHeight = chatbox.current!.querySelector('#voice-chat-room')!.getBoundingClientRect().height;
                // console.log(chatbox.current!)
                setChatHeight(chatBoxHeight - voiceHeight);
            })
        }
    }, []);

    function toggleTab(tab: string) {
        return () => {
            setActiveTab(tab);

            // Show/hide chat and log when corresponding tab is clicked
            if (tab === 'chat') {
                setShowLog(false);
            }
            else if (tab === 'log') {
                setShowLog(true);
            }
        };
    };

    return (
        <div className="comms-panel-container">
            <div className="tabs" ref={tabs}>
                <button type="button" className={`tab ${activeTab === 'chat' ? 'active' : ''}`} // If tab is active, append 'active' to className (for underline to work)
                    onClick={toggleTab('chat')}>Chat</button>
                <button type="button" className={`tab ${activeTab === 'log' ? 'active' : ''}`}
                    onClick={toggleTab('log')}>Log</button>
            </div>
            {(showLog) ? (
                <GameActionsLog />
            ) :
                <div className="chat" ref={chatbox}>
                    <VoiceChatRoom />
                    {/* <hr className="divider"></hr> */}
                    <TextChatBox game_id={'0'} socket={props.socket} height={chatHeight} />
                </div>
            }
        </div>
    );
};

export default GameCommsPanel;
