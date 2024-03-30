import "./PlayerStats.css";
// TODO: indicate if player is in Voice Chat (VC)
import { PhoneCall, PhoneX, Microphone, MicrophoneSlash, SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react";

function PlayerStats() {
    const playerInfo = [
        {
            name: "Hubert Blaine Wolfeschlegelsteinhausenbergerdorff Sr.",
            vc: "[VC]",
            properties: ["4", "2", "0"],
            avatar: "/frontend/assets/react.svg",
            avatarAltText: "player-avatar"
        },
        {
            name: "Player 2",
            vc: "",
            properties: ["6", "9"],
            avatar: "/frontend/assets/react.svg",
            avatarAltText: "player-avatar"
        },
        {
            name: "Player 3",
            vc: "",
            properties: ["", "", "", ""],
            avatar: "/frontend/assets/react.svg",
            avatarAltText: "player-avatar"
        },
        {

            name: "You",
            vc: "[VC]",
            properties: ["", "", "", "", "", "", "", ""],
            avatar: "/frontend/assets/react.svg",
            avatarAltText: "player-avatar"
        },
        // Add more player objects as needed
    ];


    return (
        <div className="player-stats-container">
            {playerInfo.map((player, index) => (
                <div className="player-stats" key={index}>
                    <div className="player-avatar">
                        <img src={player.avatar} alt={player.avatarAltText} />
                    </div>
                    <div className={`player-name ${player.name === 'You' ? 'bold' : ''}`}>
                        <span>{player.name}</span>
                    </div>
                    <div className="player-vc">
                        <span>{player.vc}</span>
                    </div>
                    <div className="player-properties">
                        {player.properties.map((property, propertyIndex) => (
                            <div className="player-property" key={propertyIndex}>
                                <div className="vertical-rectangle-small">
                                    <div className="horizontal-rectangle-small"></div>
                                    <div className="number-container">
                                        <span>{property}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PlayerStats;