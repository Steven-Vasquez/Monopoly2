import { useState } from 'react';
import axiosInstance from '#backend/axiosInstance.ts';
import "./PlayerTurnDialogOptions.css";
import { DialogPopup } from '#components/general/DialogPopup/DialogPopup.js';

function PlayerTurnDialogOptionsPopup({ setDialogContents, setDialogVisible }) {

    const playerOptions = [
        {
            name: "Player 1",
            vc: "[VC]",
            properties: ["4", "2", "0"],
        },

        // Add more player objects as needed
    ];
    
    const handleClick = () => {
        const contents = (
            <div className="player-options-container">
                {playerOptions.map((player, playerIndex) => (
                    <div className="player-options" key={playerIndex}>
                        <div className={"player-turn-name"}>
                            <span>It's {player.name}'s Turn!</span>
                        </div>
                        <div className="option-buttons">
                            {player.properties.map((option, optionIndex) => (
                                <div className="option-button" key={optionIndex}>
                                    <div className="option-container">
                                        <span>Choice: {option}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );

        // Update the contents and visibility of the dialog
        setDialogContents(contents);
        setDialogVisible(true);
    };

    return (
        <div>
            <button onClick={handleClick}>Open Popup</button>
        </div>
    );
}

export default PlayerTurnDialogOptionsPopup;