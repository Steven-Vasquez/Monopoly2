import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import io, {Socket} from "socket.io-client";
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
import Property from '#types/Property.ts';
import BoardSpace from '#types/BoardSpace.ts';


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
    const [socket, setSocket] = useState<Socket | null>(null);

    // Disconnect from socket when component unmounts
    useEffect(() => {
        const socket = io("http://localhost:3001");
        socket.emit("join", lobbyID); // Connecting to the socket room of the lobby for lobby-wide event updates

        // Whenever any data from gameUserDict, inventoryArray, or propertyinventoryArray changes, update the game info on everybody's end
        socket.on("updateGameInfo", () => {
            fetchData();
        });

        // When a user joins the game, update the game info
        socket.on(GAME_JOINED, (_data: any) => {
            console.log("GAME_JOINED event received");
            fetchData();
        });

        setSocket(socket);

        return () => {
            socket.disconnect();
        }
    }, []);

    /************************************************************
     *  Game Data
     ************************************************************/

    // const [gameUsersArray, setgameUsersArray] = useState<Map<string, GameUser>>(new Map()); // Dictionary of all players in the game
    // const [inventoryArray, setinventoryArray] = useState<Map<string, Inventory>>(new Map()); // Inventory of all players in the game
    // const [propertyinventoryArray, setPropertyinventoryArray] = useState<Map<string, PropertyInventory>>(new Map()); // Property inventory of all players in the game

    const [gameUsersArray, setGameUsersArray] = useState<GameUser[]>([]);
    const [inventoryArray, setInventoryArray] = useState<Inventory[]>([]);
    const [propertyinventoryArray, setPropertyInventoryArray] = useState<PropertyInventory[]>([]); // Property inventory of all players in the game
    const [propertiesArray, setPropertiesArray] = useState<Property[]>([]); // Property inventory of all players in the game
    const [BoardSpacesArray, setBoardSpacesArray] = useState<BoardSpace[]>([]); // All board spaces on the map



    const updateGameUsers = (userId: number, newValues: Partial<GameUser>) => {
        setGameUsersArray(gameUsersArray.map((e) => {
            return e.user_id == userId ? { ...e, ...newValues } : e
        }))
    }

    const updateInventories = (userId: number, newValues: Partial<Inventory>) => {
        setInventoryArray(inventoryArray.map((e) => {
            return e.user_id == userId ? { ...e, ...newValues } : e
        }))
    }

    const updatePropertyInventories = (userId: number, newValues: Partial<PropertyInventory>) => {
        setPropertyInventoryArray(propertyinventoryArray.map((e) => {
            return e.user_id == userId ? { ...e, ...newValues } : e
        }))
    }

    const updatePropertiesArray = (propertyId: number, newValues: Partial<Property>) => {
        setPropertiesArray(propertiesArray.map((e) => {
            return e.property_id == propertyId ? { ...e, ...newValues } : e
        }))
    }




    const fetchData = async () => {
        console.log("Fetching data2");
        try {
            const response = await axiosInstance.get(`/api/games/getGameState/${lobbyID}`);
            const properties: Property[] = response.data.properties as Property[];
            const gameUsers: GameUser[] = response.data.game_users as GameUser[];
            const inventories: Inventory[] = response.data.inventories as Inventory[];
            const propertyInventories: PropertyInventory[] = response.data.property_inventories as PropertyInventory[];
            
            setPropertiesArray(properties);
            setGameUsersArray(gameUsers);
            setInventoryArray(inventories);
            setPropertyInventoryArray(propertyInventories);
        } catch (error) {
            console.error("Error fetching Game State: ", error);
        }  
    };

    const fetchBoardSpaces = async () => {
        try {
            const response = await axiosInstance.get(`/api/games/getBoardSpaces`);
            setBoardSpacesArray(response.data as BoardSpace[]);
        } catch (error) {
            console.error("Error fetching Board Spaces: ", error);
        }
    }
    

    useEffect(() => {
        console.log("GameSession useEffect fetch data upon loading the page")
        fetchData();
        fetchBoardSpaces();
    }, [lobbyID]);

    useEffect(() => {
        console.log("gameUsersArray: ", gameUsersArray);
        console.log("inventoryArray: ", inventoryArray);
        console.log("propertyinventoryArray: ", propertyinventoryArray);
        console.log("propertiesArray: ", propertiesArray);
        console.log("BoardSpacesArray: ", BoardSpacesArray);
    }, [gameUsersArray, inventoryArray, propertyinventoryArray]);




    const add10Balance = async (userId: number) => {
        try {
            const response = await axiosInstance.post(`/api/players/addBalance/${lobbyID}`);
            console.log(response.data); // Log the response from the server
            const user = inventoryArray.find((e) => e.user_id == userId)
            if (user) {
                updateInventories(userId, { balance: user.balance + 10 })
            } else {
                throw new Error("Could not find user")
            }

            // Perform any additional actions based on the response if needed
        } catch (error) {
            console.error('Error adding balance:', error);
            // Handle errors gracefully, e.g., show an error message to the user
        }
    };

    const subtract10Balance = async (userId: number) => {
        try {
            const user = inventoryArray.find((e) => e.user_id == userId)
            if (user) {
                updateInventories(userId, { balance: user.balance - 10 })
            } else {
                throw new Error("Could not find user")
            }
            const response = await axiosInstance.post(`/api/players/addBalance/${lobbyID}`);
            console.log(response.data); // Log the response from the server
            // Perform any additional actions based on the response if needed
        } catch (error) {
            console.error('Error adding balance:', error);
            // Handle errors gracefully, e.g., show an error message to the user
        }
    };

    return (
        <div>
            <div className="game-session-container">
                <div className="game-session">
                    <h2>Game #{lobbyID}</h2>

                    {gameUsersArray.map((user) => (
                        <div className="player-info" key={user.user_id}>
                            <p><strong>{user.username}</strong></p>
                            <p>Turn: {user.play_order}</p>
                            <p>Money: {inventoryArray.find((e) => e.user_id == user.user_id)?.balance}</p>
                            <div className="player-actions">
                                <div>{user.user_id}</div>
                                <button onClick={() => add10Balance(user.user_id)}>Add $10</button>
                                <button onClick={() => subtract10Balance(user.user_id)}>Subtract $10</button>
                            </div>
                        </div>
                    ))}
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