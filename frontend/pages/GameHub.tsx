
import { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import { formatDistanceToNow } from 'date-fns';

import { GAME_CREATED } from "../../shared/constants.ts"

import "../stylesheets/GameHub.css"

// Interface to define the shape of the Game data returned from the API call to get list of games
interface Game {
    id: number;
    joined: boolean;
    completed: boolean;
    game_title: string;
    is_private: boolean;
    created_at: Date;
    turn_number: number;
    player_count: number;
}

/*
function gameListItem() { //TODO: insert Game info to make a list item
    return (
        <div>
            <h1>Game List Item</h1>
        </div>
    );
}
*/

interface TimeAgoProps {
    date: Date | string; // Accept Date object or string representation of date (because TypeScript)
}

function TimeAgo({ date }: TimeAgoProps) {
    const timeAgo = formatDistanceToNow(new Date(date), { addSuffix: true });

    return <span>{timeAgo}</span>;
}

export function Hub() {
    const socket = io("http://localhost:3001");
    console.log("Hub.tsx: socket: ", socket);
    const [gamesList, setGamesList] = useState<Game[]>([]);

    async function getGamesList() {
        try {
            const response = await axios.get("http://localhost:3001/api/games/getGamesList");
            setGamesList(response.data);
        } catch (error) {
            console.error("Error fetching games list: ", error);
        }
    }

    useEffect(() => {
        getGamesList();
    }, []);


    socket.on(GAME_CREATED, (_data: any) => {
        console.log("GAME_CREATED event received");
        getGamesList();
    });

    return (
        <div>
            <h1>Games List</h1>
            <ul>
                {gamesList.map(game => (
                    <li key={game.id}>
                        <ul className="game-info-row">
                            <li>{game.game_title}</li>
                            <li>{game.is_private ? "private" : "public"}</li>
                            <li><TimeAgo date={game.created_at} /> </li>
                            <li><a href={`/api/games/${game.id}/join`}>Join button</a></li>
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Hub;