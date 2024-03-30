import { useState } from 'react';
import axiosInstance from '#backend/axiosInstance.ts';
import "./PlayerTurnOptionsPopup.css";

function PlayerTurnOptionsPopup(props: any) {
    const playerOptions = [
        {
            name: "Player 1",
            vc: "[VC]",
            properties: ["4", "2", "0"],
        },

        // Add more player objects as needed
    ];


    return (props.trigger) ? (
        <div className="player-options-container">
            {playerOptions.map((player, index) => (
                <div className="player-options" key={index}>
                    <div className={"player-turn-name"}>
                        <span>It's {player.name}'s Turn!</span>
                    </div>
                    <div className="option-buttons">
                        {player.properties.map((option, optionIndex) => (
                            <div className="option-button" key={optionIndex}>
                                    <div className="number-container">
                                        <span>{option}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <button className="close-btn" onClick={() => props.setTrigger(false)}>Close</button>
        </div>
    ) : "";
}

export default PlayerTurnOptionsPopup;