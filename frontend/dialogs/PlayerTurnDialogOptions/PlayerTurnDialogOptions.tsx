import { useState } from 'react';
import axiosInstance from '#backend/axiosInstance.ts';
import { DialogPopup } from '../../components/general/DialogPopup/DialogPopup.tsx';
import "./PlayerTurnDialogOptions.css";

// function PlayerTurnDialogOptionsPopup({ setDialogContents, setDialogVisible }: ThisDialogProps) {
export default function PlayerTurnDialogOptions(): JSX.Element {
    const [isDialogVisible, setDialogVisible] = useState(false);

    const playerOptions = [
        {
            name: "Player 69",
            vc: "[VC]",
            properties: ["4", "2", "0"],
        },

        // Add more player objects as needed
    ];

    return (
        <div>
            <button onClick={() => setDialogVisible(true)}>Open Popup</button>
            {isDialogVisible && (
                <DialogPopup setDialogVisible={setDialogVisible}>
                    <div className="player-options-dialog-container">
                        {playerOptions.map((player, playerIndex) => (
                            <div className="player-options" key={playerIndex}>
                                <div className={"player-turn-name"}>
                                    <h2>It's {player.name}'s Turn!</h2>
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
                </DialogPopup>
            )}
        </div>
    );
}