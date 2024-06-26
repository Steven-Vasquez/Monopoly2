import { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { GlobeHemisphereWest, Lock } from "@phosphor-icons/react";
import { Button } from "#components/general/Button/Button.tsx";
import { Tab } from "#components/general/Tab/Tab.tsx";
import CreateGameDialog from "../../dialogs/CreateGameDialog/CreateGameDialog.tsx";
import usePageTitle from "../../hooks/UsePageTitle.tsx";
import axiosInstance from "#backend/axiosInstance.ts";
import io, {Socket} from "socket.io-client";

import { GAME_CREATED } from "#constants"

import 'react-tabs/style/react-tabs.css';
import "./GameHub.css"

// import type { ReactTabsFunctionComponent, TabProps } from 'react-tabs';

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

export default function GameHub(): JSX.Element {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const socket = io("http://localhost:3001"); // Connecting to the socket room of the GameHub to update the list of games as needed
        console.log("Hub.tsx: socket: ", socket);

        // Updates the list of joinable games when a new game is created
        socket.on(GAME_CREATED, (_data: any) => { 
            console.log("GAME_CREATED event received");
            getGamesList();
            getMyGamesList();
        });

        setSocket(socket);

        return () => {
            socket.disconnect();
        }
    }, []);

    usePageTitle('Game Hub');

    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('');        // No tabs are active by default (for underline animation)
    const [showMyGames, setShowMyGames] = useState(false); // My games tab content is hidden by default

    const [gamesList, setGamesList] = useState<Game[]>([]);     // Array of joinable games
    const [myGamesList, setMyGamesList] = useState<Game[]>([]); // Array of games that the user is a part of

    // Updates the list of joinable games
    async function getGamesList() {
        try {
            const response = await axiosInstance.get("/api/games/getGamesList");
            setGamesList(response.data);
        } catch (error) {
            console.error("Error fetching games list: ", error);
        }
    }

    // Updates the list of games the user is in
    async function getMyGamesList() {
        try {
            const response = await axiosInstance.get("/api/games/getMyGamesList");
            setMyGamesList(response.data);
        } catch (error) {
            console.error("Error fetching my games list: ", error);
        }
    }

    useEffect(() => {
        // Initial fetch of games list
        getGamesList();
        getMyGamesList();

        // Set joinable games tab as active by default
        setActiveTab('joinable-games');
    }, []);


    const handleJoinRequest = (game_id: any) => {
        axiosInstance.post(`/api/games/${game_id}/join`)
            .then(res => {
                console.log(res);
                navigate(`/lobby/${game_id}`);
            })
            .catch(err => {
                console.log(err);
            });
    }



    function toggleTab(tab: string) {
        return () => {
            setActiveTab(tab);

            // Show/hide table contents when corresponding tab is clicked
            if (tab === 'joinable-games') {
                setShowMyGames(false);
            }
            else if (tab === 'my-games') {
                setShowMyGames(true);
            }
        };
    };

    return (
        <div className="game-hub-container">
            <h1>Games List</h1>
            <CreateGameDialog />
            <div className="games-tabs-container">
                <div className="tabs">
                    {/* If tab is active, append 'active' to className (for underline to work) */}
                    <Tab variant="button" linkTo="" className={`tab ${activeTab === 'joinable-games' ? 'active' : ''}`} onClick={toggleTab('joinable-games')}>Joinable Games</Tab>
                    <Tab variant="button" linkTo="" className={`tab ${activeTab === 'my-games' ? 'active' : ''}`} onClick={toggleTab('my-games')}>My Games</Tab>
                </div>
                {(showMyGames) ? (
                    // FIRST TAB SHOWS JOINABLE GAMES CREATED BY OTHER USERS
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
                        {myGamesList.length === 0 ? (
                            // NO USER-CREATED GAMES AVAILABLE
                            <div className="empty-games-list">
                                <li>No games available. Create a new game or refresh the page.</li>
                                <CreateGameDialog />
                            </div>
                        ) : (
                            // USER-CREATED GAMES ARE AVAILABLE
                            <>
                                {myGamesList.map(game => (
                                    <li key={game.id} className="game">
                                        <ul className="game-info">
                                            <li className="game-title">{game.game_title}</li>
                                            <li className="game-player-count">{game.player_count}/4</li>
                                            <li className="game-type">{game.is_private ?
                                                <span title="private"><Lock size={22} color="#777" weight="fill" /></span> : <span title="public"><GlobeHemisphereWest size={22} color="#777" weight="fill" /></span>
                                            }</li>
                                            <li className="game-date"><TimeAgo date={game.created_at} /> </li>
                                            {!game.started ?
                                                <li>
                                                    <Link className="join-button" to={`/lobby/${game.id}`}>
                                                        <Button type="button" style={{ height: "auto", fontSize: "0.9rem", padding: "12px 20px" }}>Join Game</Button>
                                                    </Link>
                                                </li>
                                                :
                                                <li>
                                                    <Link className="join-button" to={`/game/${game.id}`}>
                                                        <Button type="button" style={{ height: "auto", fontSize: "0.9rem", padding: "12px 20px" }}>Rejoin Game</Button>
                                                    </Link>
                                                </li>
                                            }
                                        </ul>
                                    </li>
                                ))}
                            </>
                        )}
                    </ul>
                ) :
                    // SECOND TAB SHOWS GAMES CREATED BY ME
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
                        {gamesList.length === 0 ? (
                            // NONE OF MY GAMES ARE AVAILABLE
                            <div className="empty-games-list">
                                <li>No games available. Create a new game or refresh the page.</li>
                                <CreateGameDialog />
                            </div>
                        ) : (
                            // MY GAMES AVAILABLE
                            <>
                                {gamesList.map(game => (
                                    <li key={game.id} className="game">
                                        <ul className="game-info">
                                            <li className="game-title">{game.game_title}</li>
                                            <li className="game-player-count">{game.player_count}/4</li>
                                            <li className="game-type">{game.is_private ?
                                                <span title="private"><Lock size={22} color="#777" weight="fill" /></span> : <span title="public"><GlobeHemisphereWest size={22} color="#777" weight="fill" /></span>
                                            }</li>
                                            <li className="game-date"><TimeAgo date={game.created_at} /> </li>
                                            <li>
                                                <Link className="join-button" to={''} onClick={() => handleJoinRequest(game.id)}>
                                                    <Button type="button" style={{ height: "auto", fontSize: "0.9rem", padding: "12px 20px" }}>Join Game</Button>
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                ))}
                            </>
                        )}
                    </ul>
                }
            </div >
        </div >
    );
}