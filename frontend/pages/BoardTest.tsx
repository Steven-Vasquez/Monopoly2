import Board from "../components/game/Board.tsx";
import { BoardCell } from "../components/game/BoardCell.tsx";
import { useState, useEffect, useRef } from 'react'

// Kenny's Imports
import "../stylesheets/GameSession.css";
import io from "socket.io-client";
import GameCommsPanel from "../components/GameCommsPanel.tsx";

export default function Test() {
    // Hard-coded socket connection for testing purposes
    const socket = io("http://localhost:3001");
    socket.emit("join", '0'); // Connecting to the socket room of the lobby for lobby-wide event updates


    const container = useRef<HTMLDivElement>(null);
    const [dim, setDim] = useState({ width: 0, height: 0 });
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
    return (
        <div>
            <div className="game-session-container">
                <div className="game-session">
                    <h1>Game Room</h1>
                    {/* <> */}
                        <div style={{ width: '100vw', height: '100vh' }} ref={container}>

                            <Board
                                width={Math.min(dim.width, dim.height)}
                                height={Math.min(dim.width, dim.height)}
                                left={
                                    [
                                        { type: "property", price: 140, color: "pink", title: "St. Charles Place" },
                                        { type: "electric-company", price: 150 },
                                        { type: "property", price: 140, color: "pink", title: "States Ave" },
                                        { type: "property", price: 160, color: "pink", title: "Virginia Ave" },
                                        { type: "railroad", price: 200, title: "Pennsylvania Railroad" },
                                        { type: "property", price: 180, color: "orange", title: "St. James Place" },
                                        { type: "chest" },
                                        { type: "property", price: 180, color: "orange", title: "Tennessee Ave." },
                                        { type: "property", price: 200, color: "orange", title: "New York Ave." }
                                    ]
                                }
                                right={
                                    [
                                        { type: "property", price: 300, color: "green", title: "Pacific Ave." },
                                        { type: "property", price: 300, color: "green", title: "North Carolina Ave." },
                                        { type: "chest" },
                                        { type: "property", price: 320, color: "green", title: "Pennsylvania Ave." },
                                        { type: "railroad", price: 200, title: "Short Line" },
                                        { type: "chance" },
                                        { type: "property", price: 350, color: "blue", title: "Park Place" },
                                        { type: "luxury-tax", description: "Pay $100" },
                                        { type: "property", price: 400, color: "blue", title: "Boardwalk" }
                                    ]
                                }
                                top={
                                    [
                                        { type: "property", price: 220, color: "red", title: "Kentucky Ave." },
                                        { type: "chance" },
                                        { type: "property", price: 220, color: "red", title: "Indiana Ave." },
                                        { type: "property", price: 240, color: "red", title: "Illinois Ave." },
                                        { type: "railroad", price: 200, title: "B & O Railroad" },
                                        { type: "property", price: 260, color: "yellow", title: "Atlantic Ave." },
                                        { type: "chest" },
                                        { type: "property", price: 260, color: "yellow", title: "Ventnor Ave." },
                                        { type: "property", price: 280, color: "yellow", title: "Marvin Gardens" }
                                    ]
                                }
                                bottom={
                                    [
                                        { type: "property", price: 60, color: "brown", title: "Mediterranean Ave." },
                                        { type: "chest" },
                                        { type: "property", price: 60, color: "brown", title: "Baltic Ave." },
                                        { type: "income-tax", price: 400, description: "Pay $200" },
                                        { type: "railroad", price: 200, title: "Reading Railroad" },
                                        { type: "property", price: 100, color: "sky", title: "Oriental Ave." },
                                        { type: "chance" },
                                        { type: "property", price: 100, color: "sky", title: "Vermont Ave." },
                                        { type: "property", price: 120, color: "sky", title: "Connecticut Ave." }
                                    ]
                                }
                            />
                        </div>
                    {/* </> */}
                    <GameCommsPanel socket={socket}/>
                    {/* <VoiceChatRoom />
                    <ChatBox game_id={'0'} socket={socket} /> */}
                </div>
            </div>
        </div >
    );
}