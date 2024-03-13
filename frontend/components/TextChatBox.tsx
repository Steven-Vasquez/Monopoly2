import React, { useState, useEffect } from "react";
import axiosInstance from "../../backend/axiosInstance.ts";
import { Socket } from "socket.io-client";

import { CHAT_MESSAGE_RECEIVED } from "../../shared/constants.ts"
import { PaperPlaneRight } from "@phosphor-icons/react";
import "../stylesheets/Chat.css"

interface ChatMessage { // Interface to define the shape of the ChatMessage data returned from the API call to get list of chat messages
    username: string;
    message: string;
    created_at: string;
}

function TextChatBox({ game_id, socket, height }: { game_id: string, socket: Socket, height?: number }) {

    /***************************************************************************
     * Message retrieval (below)
    ***************************************************************************/
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

    async function getChatMessages() {
        try {
            const response = await axiosInstance.get(`/api/chat/getMessages/${game_id}`);
            setChatMessages(response.data);
            // console.log("chatMessages", chatMessages);
        } catch (error) {
            console.error("Error fetching chat messages: ", error);
        }
    }

    useEffect(() => { // Initial fetch of chat messages
        getChatMessages();
    }, [game_id]);

    socket.on(CHAT_MESSAGE_RECEIVED, (data: any) => {
        // console.log("data", data);
        console.log("CHAT_MESSAGE_RECEIVED event received");
        console.log("Username: ", data.username, "Message: ", data.message, "Timestamp: ", data.created_at)
        setChatMessages([...chatMessages, data])

        // Not needed because websocket hook above will re-fetch the chat messages since websockets now contain chat message data
        // getChatMessages();
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
                // timestamp: formatTimestamp()
            });
            console.log(response.data);
            setMessage('');
        } catch (error) {
            console.error("Error sending chat message: ", error);
        }
    }

    // NOTE: This function was originally for formatting the timestamp of the message to be stored into the db
    // But not needed cuz db automatically stores timestamp using built-in function (current_timestamp) in chat migrations file
    /***************************************************************************
    * Message timestamp formatting from db (MM/DD/YYYY, HH:MM AM/PM)
    ***************************************************************************/
    function formatTimestamp(timestamp: string) {
        const date = new Date(timestamp);

        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });

        const formattedTime = date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });

        return `${formattedDate}, ${formattedTime}`;
    }

    return (
        <div className="chat-container" id="text-chat" style={{ maxHeight: height ? height : "100%" }}>
            <h3>Text</h3>
            <div className="messages">
                {chatMessages.map((message: { username: string, message: string, created_at: string }, index) => (
                    <div className="message" key={index}>
                        <div className="user-line">
                            <p className="username">{message.username}</p>
                            <p className="timestamp">{formatTimestamp(message.created_at)}</p>
                        </div>
                        <div className="message-line">
                            <p className="body">{message.message}</p>
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