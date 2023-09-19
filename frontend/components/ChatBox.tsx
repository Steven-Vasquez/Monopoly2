import React, { useState, useEffect } from "react";
import axiosInstance from "../../backend/axiosInstance.ts";
import { Socket } from "socket.io-client";

import {CHAT_MESSAGE_RECEIVED} from "../../shared/constants.ts"


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
            <div>
                <ul>
                    {chatMessages.map((message: { username: string, message: string, timestamp: string }) => (
                        <li key={message.timestamp}>
                            <span>{message.username}: </span>
                            <span>{message.message}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <form onSubmit={sendMessage}>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)} />
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    )
}

export default ChatBox;