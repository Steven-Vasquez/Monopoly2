import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import io from "socket.io-client";
import axiosInstance from '#backend/axiosInstance.ts';
import { GAME_JOINED } from "#constants";

import { Link } from 'react-router-dom';
import { Button } from '../../components/general/Button/Button.tsx';

import { Board } from '../../components/game/Board/Board.tsx';
import VoiceChatRoom from '../../components/voiceChat/VoiceChatRoom/VoiceChatRoom.tsx';
import TextChatBox from '../../components/textChat/TextChatBox/TextChatBox.tsx';

import "./GameSession.css";
import GameUser from '#types/GameUser.ts';
import Inventory from '#types/Inventory.ts';
import PropertyInventory from '#types/PropertyInventory.ts';


interface GameUserDict {
    [key: string]: GameUser;
}

interface InventoryDict {
    [key: string]: Inventory;
}

interface PropertyInventoryDict {
    [key: string]: PropertyInventory;
}

function GameSession() {
    const navigate = useNavigate();
    const { lobbyID } = useParams<{ lobbyID: string }>();

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

    if (!lobbyID) { // To ensure that lobbyID is not undefined
        return <div>Invalid lobby ID</div>
    }

    /*************************************************************
     * Socket connection
     *************************************************************/
    const socket = io("http://localhost:3001");
    socket.emit("join", lobbyID); // Connecting to the socket room of the lobby for lobby-wide event updates

    /************************************************************
     *  Game Data
     ************************************************************/

    const [gameUsersDict, setGameUsersDict] = useState<GameUserDict>({}); // Dictionary of all players in the game
    const [inventoryDict, setInventoryDict] = useState<InventoryDict>({}); // Inventory of all players in the game
    const [propertyInventoryDict, setPropertyInventoryDict] = useState<PropertyInventoryDict>({}); // Property inventory of all players in the game

    // Function to update a specific GameUser object inside GameUsersDict
    const updateGameUserObject = (key: string, newValues: Partial<GameUser>) => {
        setGameUsersDict(prevGameUsersDict => ({
            ...prevGameUsersDict,
            [key]: { ...prevGameUsersDict[key], ...newValues } // Update the specified object with new values
        }));
    };

    // Function to update a specific Inventory object inside InventoryDict
    const updateInventoryObject = (key: string, newValues: Partial<Inventory>) => {
        setInventoryDict(prevInventoryDict => ({
            ...prevInventoryDict,
            [key]: { ...prevInventoryDict[key], ...newValues } // Update the specified object with new values
        }));
    };

    // Function to update a specific PropertyInventory object inside PropertyInventoryDict
    const updatePropertyInventoryObject = (key: string, newValues: Partial<PropertyInventory>) => {
        setPropertyInventoryDict(prevPropertyInventoryDict => ({
            ...prevPropertyInventoryDict,
            [key]: { ...prevPropertyInventoryDict[key], ...newValues } // Update the specified object with new values
        }));
    };

    
    const fetchData = async () => {
        try {
            const response = await axiosInstance.get("/api/players/getPlayerName");
            console.log("Fetched username", response.data.username);
        } catch (error) {
            console.error("Error fetching player name: ", error);
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

    const add10 = () => {
        socket.emit("UPDATE_PLAYER_BALANCE",)
    }

    return (
        <div>
            <div className="game-session-container">
                <div className="game-session">
                    <h2>Game #{lobbyID}</h2>
                    <div className="player-info">
                        <p>Player Name</p>
                        <p>{"{Player name here}"}</p>
                        <p>Turn</p>
                        <p>{"{Turn Number}"}</p>
                        <p>Money</p>
                        <p>{"{Money Amount}"}</p>

                        <div className="player-actions">
                            <button>Add $10</button>
                            <button>Subtract $10</button>
                        </div>



                    </div>
                    {/* <div id="board-container">
                        <Board></Board>
                        <div id="player-pieces">
                            <div className="player" id="p1"></div>
                            <div className="player" id="p2"></div>
                            <div className="player" id="p3"></div>
                        </div>
                    </div> */}
                    {/* <div id="users-list">
                        <template id="user-item">
                            <div className="user"></div>
                        </template>
                    </div> */}
                    {/* <VoiceChatRoom />
                    <TextChatBox game_id={lobbyID} socket={socket} height={100} /> */}
                    <div className="game-options-div">
                        {/* <form action="/api/games/<%= id %>/endGame" method="POST"> */}
                        <button type="submit" className="ms-btn ms-action" value="End Game">End Game</button>
                        {/* </form> */}
                    </div>
                </div>
            </div>
        </div >
    );
}

export default GameSession;