import './GameCommsPanel.css';
import { useState, useEffect, useRef } from 'react';
import TextChatBox from '../../textChat/TextChatBox/TextChatBox.tsx';
import VoiceChatRoom from '../../voiceChat/VoiceChatRoom/VoiceChatRoom.tsx';
import GameActionsLog from '../GameActionsLog/GameActionsLog.tsx';
import { Tab } from '#components/general/Tab/Tab.tsx';

export function GameCommsPanel(props: any) {

    const chatbox = useRef<HTMLDivElement>(null);
    const tabs = useRef<HTMLDivElement>(null);
    const [chatHeight, setChatHeight] = useState(0)

    const [activeTab, setActiveTab] = useState(''); // No tabs are active by default (for underline animation)
    const [showLog, setShowLog] = useState(false);  // Log is hidden by default

    useEffect(() => {
        if (chatbox.current && tabs.current) {
            const tabsHeight = tabs.current!.getBoundingClientRect().height;
            // const chatBoxHeight = chatbox.current!.getBoundingClientRect().height;
            // const voiceHeight = chatbox.current!.querySelector('#voice-chat-room')!.getBoundingClientRect().height;
            // console.log(chatbox.current!)
            // setChatHeight(chatBoxHeight - voiceHeight);
            // .getBoundingClientRect().height;
            setChatHeight(tabsHeight)
            window.addEventListener('resize', () => {
                const tabsHeight = tabs.current!.getBoundingClientRect().height;
                // const chatBoxHeight = chatbox.current!.getBoundingClientRect().height;
                // const voiceHeight = chatbox.current!.querySelector('#voice-chat-room')!.getBoundingClientRect().height;
                // console.log(chatbox.current!)
                // setChatHeight(chatBoxHeight - voiceHeight);
                setChatHeight(tabsHeight)
            })
        }

        // Set chat tab as active by default
        setActiveTab('chat');
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
                {/* If tab is active, append 'active' to className (for underline to work) */}
                <Tab variant="button" linkTo="" className={`tab ${activeTab === 'chat' ? 'active' : ''}`} onClick={toggleTab('chat')}>Chat</Tab>
                <Tab variant="button" linkTo="" className={`tab ${activeTab === 'log' ? 'active' : ''}`} onClick={toggleTab('log')}>Log</Tab>
            </div>
            {(showLog) ? (
                <GameActionsLog />
                // <p>Game Actions go here...</p>
            ) :
                <div className="chat" ref={chatbox}>
                    <VoiceChatRoom />
                    <hr className="divider"></hr>
                    <TextChatBox game_id={'0'} socket={props.socket} height={chatHeight} />
                </div>
            }
        </div>
    );
};

export default GameCommsPanel;
