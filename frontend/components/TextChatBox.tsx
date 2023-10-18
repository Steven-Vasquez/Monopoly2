import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../backend/axiosInstance.ts";
import { Socket } from "socket.io-client";

import { CHAT_MESSAGE_RECEIVED } from "../../shared/constants.ts"
import { PaperPlaneRight } from "@phosphor-icons/react";
import { Button } from './Button.tsx';
import "../stylesheets/Chat.css"

interface ChatMessage { // Interface to define the shape of the ChatMessage data returned from the API call to get list of chat messages
    username: string;
    message: string;
    timestamp: string;
}

function TextChatBox({ game_id, socket, height }: { game_id: string, socket: Socket, height: number }) {

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
        <div className="chat-container" id="text-chat" style={{maxHeight: height}}>
            <h3>Text</h3>
                <div className="messages">

                    {chatMessages.map((message: { username: string, message: string, timestamp: string }, index) => (
                        <div className="message">
                            <div className="user-line">
                                <p className="username">TestUser: {message.username}</p>
                                <p className="timestamp">{getTimestamp()}</p>
                            </div>
                            <div className="message-line" key={message.timestamp}>
                                <p className="body">{index} This is a test message: {message.message}</p>
                            </div>
                        </div>
                    ))}

                </div>

                <form onSubmit={sendMessage} className="message-input">
                    <label className="input-textfield">
                        <input
                            type="text"
                            value={message}
                            placeholder="Type here..."
                            onChange={(e) => setMessage(e.target.value)} />
                    </label>
                    <span title="Send message">
                        <button type="submit" title="send" id="send-message-button">
                            <PaperPlaneRight size={20} color="#fff" weight="bold" />
                        </button>
                    </span>
            </form>
        </div>
    )
}

export default TextChatBox;