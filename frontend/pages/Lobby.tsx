
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Lobby() {

    const { lobbyID } = useParams<{ lobbyID: string }>();
    const [playerUsernames, setPlayerUsernames] = useState<string[]>([]);

    useEffect(() => {
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
        fetchData();
    }, [lobbyID]);

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