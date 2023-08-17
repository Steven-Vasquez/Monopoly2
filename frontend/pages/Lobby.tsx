
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import io from "socket.io-client";
import { GAME_JOINED } from "../../shared/constants.ts"


function Lobby() {

    const { lobbyID } = useParams<{ lobbyID: string }>();
    const [playerUsernames, setPlayerUsernames] = useState<string[]>([]);
    const socket = io("http://localhost:3001");
    socket.emit("join", lobbyID);

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

    return (
        <div>
            <h1>Lobby #{lobbyID}</h1>
            <ul>
                {playerUsernames.map(username => (
                    <li key={username}>{username}</li>
                ))}
            </ul>
        </div>
    )
}

export default Lobby;