import { useState, useEffect } from "react";
import axios from "axios";

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

export function Hub() {
    const [gamesList, setGamesList] = useState<Game[]>([]);

    useEffect(() => {
        async function getGamesList() {
            try {
                const response = await axios.get("http://localhost:3001/api/games/getGamesList");
                setGamesList(response.data);
            } catch (error) {
                console.error("Error fetching games list: ", error);
            }
        }

        getGamesList();
    }, []);



    return (
        <div>
            <h1>Games List</h1>
            <ul>
                {gamesList.map(game => (
                    <li key={game.id}>{game.game_title}</li>
                ))}
            </ul>
        </div>
    );
}

export default Hub;