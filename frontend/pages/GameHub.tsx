import { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import axios from "axios";
import io from "socket.io-client";

import { GAME_CREATED } from "../../shared/constants.ts"
import CreateGame from "../components/CreateGame.tsx";

import 'react-tabs/style/react-tabs.css';
import "../stylesheets/GameHub.css"

// Interface to define the shape of the Game data returned from the API call to get list of games
interface Game {
    id: number;
    joinable: boolean;
    started: boolean;
    game_title: string;
    is_private: boolean;
    created_at: Date;
    turn_number: number;
    player_count: number;
}

interface TimeAgoProps {
    date: Date | string; // Accept Date object or string representation of date (because TypeScript)
}

function TimeAgo({ date }: TimeAgoProps) {
    const timeAgo = formatDistanceToNow(new Date(date), { addSuffix: true });

    return <span>{timeAgo}</span>;
}

export function Hub() {
    const navigate = useNavigate();
    const socket = io("http://localhost:3001"); // Connecting to the socket room of the GameHub to update the list of games as needed
    console.log("Hub.tsx: socket: ", socket);

    const [gamesList, setGamesList] = useState<Game[]>([]); // Array of joinable games
    const [myGamesList, setMyGamesList] = useState<Game[]>([]); // Array of games that the user is a part of

    // Updates the list of joinable games
    async function getGamesList() {
        try {
            const response = await axios.get("http://localhost:3001/api/games/getGamesList");
            setGamesList(response.data);
        } catch (error) {
            console.error("Error fetching games list: ", error);
        }
    }

    // Updates the list of games the user is in
    async function getMyGamesList() {
        try {
            const response = await axios.get("http://localhost:3001/api/games/getMyGamesList");
            setMyGamesList(response.data);
        } catch (error) {
            console.error("Error fetching my games list: ", error);
        }
    }


    useEffect(() => { // Initial fetch of games list
        getGamesList();
        getMyGamesList();
    }, []);


    socket.on(GAME_CREATED, (_data: any) => { // Updates the list of joinable games when a new game is created
        console.log("GAME_CREATED event received");
        getGamesList();
        getMyGamesList();
    });

    const handleJoinRequest = (game_id: any) => {
        axios.post(`http://localhost:3001/api/games/${game_id}/join`)
            .then(res => {
                console.log(res);
                navigate(`/lobby/${game_id}`);
            })
            .catch(err => {
                console.log(err);
            });
    }

    // Disconnect from socket when component unmounts
    useEffect(() => {
        return () => {
            socket.disconnect();
        }
    }, [socket]);
    return (
        <div>
            <CreateGame />
            <h1>Games List</h1>
            <div className="games-tabs-container">
                <Tabs>
                    <TabList>
                        <Tab>Joinable Games</Tab>
                        <Tab>My Games</Tab>
                    </TabList>

                    <TabPanel>
                        <ul className="game-list">
                            <li>
                                <ul className="game-info-labels">
                                    <li>Game Title</li>
                                    <li>Players</li>
                                    <li>Privacy</li>
                                    <li>Created</li>
                                    <li>Join</li>
                                </ul>
                            </li>
                            {gamesList.map(game => (
                                <li key={game.id} className="game">
                                    <ul className="game-info">
                                        <li className="game-title">{game.game_title}</li>
                                        <li className="game-playe-count">{game.player_count}/4</li>
                                        <li className="game-type">{game.is_private ? "private" : "public"}</li>
                                        <li className="game-date"><TimeAgo date={game.created_at} /> </li>
                                        <li>
                                            <Link className="join-button" to={''} onClick={() => handleJoinRequest(game.id)}>Join Game</Link>
                                        </li>
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </TabPanel>

                    <TabPanel>
                        <ul className="game-list">
                            <li>
                                <ul className="game-info-labels">
                                    <li>Game Title</li>
                                    <li>Players</li>
                                    <li>Privacy</li>
                                    <li>Created</li>
                                    <li>Join</li>
                                </ul>
                            </li>
                            {myGamesList.map(game => (
                                <li key={game.id} className="game">
                                    <ul className="game-info">
                                        <li className="game-title">{game.game_title}</li>
                                        <li className="game-playe-count">{game.player_count}</li>
                                        <li className="game-type">{game.is_private ? "private" : "public"}</li>
                                        <li className="game-date"><TimeAgo date={game.created_at} /> </li>
                                        {!game.started ?
                                            <li>
                                                <Link className="join-button" to={`/lobby/${game.id}`}>Rejoin Game</Link>
                                            </li>
                                            :
                                            <li>
                                                <Link className="join-button" to={`/game/${game.id}`}>Rejoin Game</Link>
                                            </li>
                                        }
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </TabPanel>
                </Tabs>
            </div>


        </div>
    );
}

export default Hub;