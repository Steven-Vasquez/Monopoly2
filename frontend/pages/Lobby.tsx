import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import io from "socket.io-client";
import axiosInstance from '../../backend/axiosInstance.ts';
import { GAME_JOINED } from "../../shared/constants.ts";

import ChatBox from '../components/TextChatBox.tsx';
import VoiceChatRoom from '../components/voice/VoiceChatRoom.tsx';
import { Link } from "react-router-dom";
import { Button } from '../components/Button.tsx';

function Lobby() {
    const navigate = useNavigate();
    const { lobbyID } = useParams<{ lobbyID: string }>();

    
    // TODO: Check if user is player 1, and if so, show the start game button (must be host)
    // Otherwise, user must wait for player 1 to start the game
    const [isPlayerOne, setIsPlayerOne] = useState(true);  // NOTE: Set to true for testing purposes

    /*************************************************************
     * User authentication (route protection for users not in the game)  
     *************************************************************/
    const inGameCheck = async () => {
        console.log("inGameCheck() called");
        try {
            const inGameResponse = await axiosInstance.get(`/checkInGame/${lobbyID}`);
            const inGame = inGameResponse.data.inGame;
            console.log("inGame: ", inGame);
            if (inGame === false) {

                navigate('/hub');
                setTimeout(() => {
                    alert("You are not in this game!"); // Show the alert after a brief delay (to show after navigating)
                }, 100); // Adjust the delay time as needed
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    // Check if user is in the game when component mounts
    useEffect(() => {
        inGameCheck();
    }, [lobbyID]);


    /*************************************************************
     * Game Lobby
     *************************************************************/
    const [playerUsernames, setPlayerUsernames] = useState<string[]>([]);

    if (!lobbyID) { // To ensure that lobbyID is not undefined
        return <div>Invalid lobby ID</div>
    }

    const socket = io("http://localhost:3001");
    socket.emit("join", lobbyID); // Connecting to the socket room of the lobby for lobby-wide event updates

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(`/api/games/getPlayersList/${lobbyID}`);
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

            <VoiceChatRoom />
            <ChatBox game_id={lobbyID} socket={socket} />
            <>
                {isPlayerOne ? (
                    <div className="action-links">
                        <p>Hey, everyone's waiting on you!</p>
                        <Link className="button-link" to={`/game/${lobbyID}`}>
                            <Button style={{ width: "auto" }}>Start Game</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="action-links">
                        <p>Waiting on Host to start the game...</p>
                        <Link className="button-link" to={`/hub`}>
                            <Button style={{ width: "auto" }}>Leave Game</Button>
                        </Link>
                    </div>
                )}
            </>
        </div>
    )
}

export default Lobby;