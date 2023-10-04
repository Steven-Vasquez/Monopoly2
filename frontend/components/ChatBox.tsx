import React, { useState, useEffect } from "react";
import axiosInstance from "../../backend/axiosInstance.ts";
import { Socket } from "socket.io-client";

import { CHAT_MESSAGE_RECEIVED } from "../../shared/constants.ts"
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
                message: message
            });
            console.log(response.data);
            setMessage('');
        } catch (error) {
            console.error("Error sending chat message: ", error);
        }
    }

    return (
        <div>
            <h1>Chat</h1>
            <div className="chat-container">
                <div className="messages">
                    <div className="message-line">
                        <div className="message">
                            <ul>
                                {chatMessages.map((message: { username: string, message: string, timestamp: string }) => (
                                    <li className="timestamp" key={message.timestamp}>
                                        <span className="username">{message.username}: </span>
                                        <span className="body">{message.message}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <form onSubmit={sendMessage}>
                    <label className="input-textfield">
                        <input
                            type="text"
                            value={message}
                            placeholder="Message..."
                            onChange={(e) => setMessage(e.target.value)} />
                    </label>
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    )
}

export default ChatBox;