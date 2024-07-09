import Board from "#components/game/Board/Board.tsx";
import PlayerStats from "#components/game/PlayerStats/PlayerStats.tsx";
import PlayerInventory from "#components/game/PlayerInventory/PlayerInventory.tsx";
import { BoardCell } from "#components/game/BoardCell/BoardCell.tsx";
import { useState, useEffect, useRef } from 'react'
import { GameModel } from '../../models/GameModel.ts'
import { Player } from '../../models/Player.ts'

import io, { Socket } from "socket.io-client";
import GameCommsPanel from "#components/game/GameCommsPanel/GameCommsPanel.tsx";

export default function Test() {

    const lobbyID: string = "1";
    // Hard-coded socket connection for testing purposes
    const [socket, setSocket] = useState<Socket | null>(null);

    // Socket cleanup function
    useEffect(() => {
        const socket = io("http://localhost:3001");
        const game_id = '0'; // Hard-coded socket connection for testing purposes
        socket.emit("join", game_id); // Connecting to the socket room of the lobby for lobby-wide event updates

        setSocket(socket);

        return () => {
            socket.disconnect();
        }
    }, []);

    const container = useRef<HTMLDivElement>(null);
    const [dim, setDim] = useState({ width: 0, height: 0 });

    const [gameModel, setGameModel] = useState(new GameModel([]))
    useEffect(() => {
        if (container.current) {
            setDim({
                width: container.current!.getBoundingClientRect().width,
                height: container.current!.getBoundingClientRect().height,
            });
            window.addEventListener('resize', () => {
                setDim({
                    width: container.current!.getBoundingClientRect().width,
                    height: container.current!.getBoundingClientRect().height,
                });
            })
        }
    }, []);

    let [index, setIndex] = useState(0);

    const addPlayer = () => {
        // gameModel.addPlayer(player);
        const newGame = new GameModel([...gameModel.players, new Player(index, "Top Hat", 0, 0, 0)]);
        setIndex(index += 1)
        setGameModel((newGame));
        console.log(newGame)
    }

    return (
        <div>
            <div className="game-session-container">
                <div className="game-session">
                    {/* <> */}
                    <div style={{ width: '100vw', height: '100vh' }} ref={container}>

                        <Board
                            width={Math.min(dim.width, dim.height)}
                            height={Math.min(dim.width, dim.height)}
                            lobbyID={lobbyID}
                            // left={
                            //     [
                            //         { type: "property", price: 140, color: "pink", title: "St. Charles Place" },
                            //         { type: "electric-company", price: 150 },
                            //         { type: "property", price: 140, color: "pink", title: "States Ave" },
                            //         { type: "property", price: 160, color: "pink", title: "Virginia Ave" },
                            //         { type: "railroad", price: 200, title: "Pennsylvania Railroad" },
                            //         { type: "property", price: 180, color: "orange", title: "St. James Place" },
                            //         { type: "chest" },
                            //         { type: "property", price: 180, color: "orange", title: "Tennessee Ave." },
                            //         { type: "property", price: 200, color: "orange", title: "New York Ave." }
                            //     ]
                            // }
                            // right={
                            //     [
                            //         { type: "property", price: 300, color: "green", title: "Pacific Ave." },
                            //         { type: "property", price: 300, color: "green", title: "North Carolina Ave." },
                            //         { type: "chest" },
                            //         { type: "property", price: 320, color: "green", title: "Pennsylvania Ave." },
                            //         { type: "railroad", price: 200, title: "Short Line" },
                            //         { type: "chance" },
                            //         { type: "property", price: 350, color: "blue", title: "Park Place" },
                            //         { type: "luxury-tax", description: "Pay $100" },
                            //         { type: "property", price: 400, color: "blue", title: "Boardwalk" }
                            //     ]
                            // }
                            // top={
                            //     [
                            //         { type: "property", price: 220, color: "red", title: "Kentucky Ave." },
                            //         { type: "chance" },
                            //         { type: "property", price: 220, color: "red", title: "Indiana Ave." },
                            //         { type: "property", price: 240, color: "red", title: "Illinois Ave." },
                            //         { type: "railroad", price: 200, title: "B & O Railroad" },
                            //         { type: "property", price: 260, color: "yellow", title: "Atlantic Ave." },
                            //         { type: "property", price: 260, color: "yellow", title: "Ventnor Ave." },
                            //         { type: "water-works", price: 150 },
                            //         { type: "property", price: 280, color: "yellow", title: "Marvin Gardens" }
                            //     ]
                            // }
                            // bottom={
                            //     [
                            //         { type: "property", price: 60, color: "brown", title: "Mediterranean Ave." },
                            //         { type: "chest" },
                            //         { type: "property", price: 60, color: "brown", title: "Baltic Ave." },
                            //         { type: "income-tax", price: 400, description: "Pay $200" },
                            //         { type: "railroad", price: 200, title: "Reading Railroad" },
                            //         { type: "property", price: 100, color: "sky", title: "Oriental Ave." },
                            //         { type: "chance" },
                            //         { type: "property", price: 100, color: "sky", title: "Vermont Ave." },
                            //         { type: "property", price: 120, color: "sky", title: "Connecticut Ave." }
                            //     ]
                            // }
                        />
                    </div>
                    {socket ? (
                        <GameCommsPanel socket={socket} />
                    ) : (
                        <p>Connecting to chat...</p>

                    )}

                    <PlayerStats />
                    <PlayerInventory />
                    {/* <VoiceChatRoom />
                    <ChatBox game_id={'0'} socket={socket} /> */}

                    <>
                        <h1>Testing stuff</h1>
                        <h3>Current players in gameModel</h3>
                        {gameModel.players.map((i, index) => (
                            <p key={index}>{i.playerId} {i.token}</p>
                        ))}
                        <button onClick={addPlayer}>Add new player</button>
                    </>
                </div>
            </div>
        </div >
    );
}