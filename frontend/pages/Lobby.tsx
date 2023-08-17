import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import io from "socket.io-client";
import axios from "axios";

import { GAME_JOINED } from "../../shared/constants.ts";

import ChatBox from '../components/ChatBox.tsx';

function Lobby() {

    const { lobbyID } = useParams<{ lobbyID: string }>();
    const [playerUsernames, setPlayerUsernames] = useState<string[]>([]);
    
    if(!lobbyID) { // To ensure that lobbyID is not undefined
        return <div>Invalid lobby ID</div>
    }

    const socket = io("http://localhost:3001");
    socket.emit("join", lobbyID); // Connecting to the socket room of the lobby for lobby-wide event updates

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/games/getPlayersList/${lobbyID}`);
            const currentPlayers = response.data;
            const usernames = currentPlayers.map((player: { username: string }) => player.username);
            setPlayerUsernames(usernames);
        } catch (error) {
            console.log(error);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, [lobbyID]);

    socket.on(GAME_JOINED, (_data: any) => {
        console.log("GAME_JOINED event received");
        fetchData();
    });

    // Disconnect from socket when component unmounts
    useEffect(() => {
        return () => {
            socket.disconnect();
        }
    }, [socket]);

    return (
        <div>
            <h1>Lobby #{lobbyID}</h1>
            <ul>
                {playerUsernames.map(username => (
                    <li key={username}>{username}</li>
                ))}
            </ul>

            <ChatBox game_id={lobbyID} socket={socket} />
        </div>
    )
}

export default Lobby;