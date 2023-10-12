import React, { useState, useEffect } from "react";
import axiosInstance from "../../backend/axiosInstance.ts";
import { Socket } from "socket.io-client";

import { CHAT_MESSAGE_RECEIVED } from "../../shared/constants.ts"
import { ArrowRight } from "@phosphor-icons/react";
import { Button } from '../components/Button.tsx';
import "../stylesheets/Chat.css"

interface ChatMessage { // Interface to define the shape of the ChatMessage data returned from the API call to get list of chat messages
    username: string;
    message: string;
    timestamp: string;
}

function ChatBox({ game_id, socket }: { game_id: string, socket: Socket }) {

    /***************************************************************************
     * Message retrieval (below)
    ***************************************************************************/
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

    async function getChatMessages() {
        try {
            const response = await axiosInstance.get(`/api/chat/getMessages/${game_id}`);
            setChatMessages(response.data);
        } catch (error) {
            console.error("Error fetching chat messages: ", error);
        }
    }

    useEffect(() => { // Initial fetch of chat messages
        getChatMessages();
    }, [game_id]);

    socket.on(CHAT_MESSAGE_RECEIVED, (_data: any) => {
        console.log("CHAT_MESSAGE_RECEIVED event received");
        getChatMessages();
    });

    /***************************************************************************
     * Message sending (below)
    ***************************************************************************/
    const [message, setMessage] = useState(''); // Message the user will send

    async function sendMessage(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault(); // Prevents page refresh on form submission

        try {
            const response = await axiosInstance.post(`/api/chat/sendMessage/${game_id}`, {
                // username: username,
                message: message,
                timestamp: getTimestamp()
            });
            console.log(response.data);
            setMessage('');
        } catch (error) {
            console.error("Error sending chat message: ", error);
        }
    }

    /***************************************************************************
    * Timestamp creation
    ***************************************************************************/
    // TODO: store timestamp in chat message db
    function getTimestamp() {
        const date = new Date();
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
    }

    return (
        <div>
            <h1>Chat</h1>
            <div className="chat-container">
                <h2>Text</h2>
                <div className="messages">
                    <ul>
                        {chatMessages.map((message: { username: string, message: string, timestamp: string }) => (
                            <li className="message-line" key={message.timestamp}>
                                <p className="username">TestUser: {message.username}</p>
                                <p className="timestamp">{getTimestamp()}</p>
                                <p className="body">This is a test message: {message.message}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="message-input">
                    <form onSubmit={sendMessage}>
                        <label className="input-textfield">
                            <input
                                type="text"
                                value={message}
                                placeholder="Type here..."
                                onChange={(e) => setMessage(e.target.value)} />
                        </label>
                        <span title="Send message">
                            <Button type="submit" style={{ padding: "0.3rem 0.33rem 0.2rem 0.33rem", verticalAlign: "middle" }} >
                                <ArrowRight size={20} color="#fff" weight="bold" />
                            </Button>
                        </span>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChatBox;