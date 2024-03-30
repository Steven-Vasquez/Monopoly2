import './GameActionsLog.css';
import { useState, useEffect } from 'react';

export function GameActionsLog(props: any) {
    // Component logic here
    const gameActions = [
        "Player 1 rolls the dice and moves 7 spaces to Baltic Avenue",
        "Player 1 buys Baltic Avenue for $60",
        "Player 2 rolls the dice and moves 9 spaces to Community Chest",
        "Player 2 draws a Community Chest card and receives $50",
        "Player 3 rolls the dice and moves 5 spaces to Income Tax",
        "Player 3 pays $200 in income tax",
        "Player 4 rolls the dice and moves 11 spaces to St. James Place",
        "Player 4 buys St. James Place for $180",
        "Player 1 rolls the dice and moves 8 spaces to Community Chest",
        "Player 1 draws a Community Chest card and receives $100",
        "Player 2 rolls the dice and moves 6 spaces to Free Parking",
        "Player 3 rolls the dice and moves 4 spaces to Chance",
        "Player 3 draws a Chance card and advances to Boardwalk",
        "Player 3 buys Boardwalk for $400",
        "Player 4 rolls the dice and moves 10 spaces to Luxury Tax",
        "Player 4 pays $75 in luxury tax"
    ];

    return (
        <div className="log-container">
            {gameActions.map((action, index) => (
                <div className="log-item" key={index}>{action}</div>
            ))}
        </div>
    );
};


export default GameActionsLog;
