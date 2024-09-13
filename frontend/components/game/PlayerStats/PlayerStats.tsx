import PlayerStatsDeeds from "../PlayerStatsDeeds/PlayerStatsDeeds.tsx";
import "./PlayerStats.css";
// TODO: indicate if player is in Voice Chat (VC)
import { PhoneCall, PhoneX, Microphone, MicrophoneSlash, SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react";
import { Color } from "#types/Color.js";

interface PlayerInfo {
    name: string,
    vc: boolean,
    turn: boolean,
    properties: PropertyInventory,
    avatar: string
}

function PlayerStats() {
    const playerInfo: PlayerInfo[] = [
        {
            name: "Hubert Blaine Wolfeschlegelsteinhausenbergerdorff Sr.",
            vc: true,
            turn: false,
            properties: {
                user_id: 1,
                game_id: 1,
                railroads_owned: 0,
                utilities_owned: 0,
                browns_owned: 1,
                light_blues_owned: 2,
                magentas_owned: 3,
                oranges_owned: 0,
                reds_owned: 0,
                yellows_owned: 0,
                greens_owned: 0,
                dark_blues_owned: 0,
            },
            avatar: "/frontend/assets/react.svg",
        },
        {
            name: "Player 2",
            vc: false,
            turn: false,
            properties: {
                user_id: 2,
                game_id: 1,
                railroads_owned: 0,
                utilities_owned: 0,
                browns_owned: 0,
                light_blues_owned: 1,
                magentas_owned: 0,
                oranges_owned: 2,
                reds_owned: 0,
                yellows_owned: 0,
                greens_owned: 0,
                dark_blues_owned: 0,
            },
            avatar: "/frontend/assets/react.svg",
        },
        {
            name: "Player 3",
            vc: false,
            turn: false,
            properties: {
                user_id: 3,
                game_id: 1,
                railroads_owned: 0,
                utilities_owned: 0,
                browns_owned: 0,
                light_blues_owned: 0,
                magentas_owned: 0,
                oranges_owned: 0,
                reds_owned: 0,
                yellows_owned: 0,
                greens_owned: 0,
                dark_blues_owned: 0,
            },
            avatar: "/frontend/assets/react.svg",
        },
        {

            name: "You",
            vc: true,
            turn: true,
            properties: {
                user_id: 4,
                game_id: 1,
                railroads_owned: 1,
                utilities_owned: 1,
                browns_owned: 1,
                light_blues_owned: 1,
                magentas_owned: 1,
                oranges_owned: 1,
                reds_owned: 1,
                yellows_owned: 1,
                greens_owned: 1,
                dark_blues_owned: 1,
            },
            avatar: "/frontend/assets/react.svg",
        },
        // Add more player objects as needed
    ];


    return (
        <div className="player-stats-container">
            {playerInfo.map((player, index) => (
                <div className={"player-stats " + (player.turn && "is-turn")} key={index}>
                    <div className="player-avatar">
                        <img src={player.avatar} alt={"avatar of " + player.name} />
                    </div>
                    <div className="player-name-status">
                        <span className="player-name">{player.name}</span>
                        {player.vc &&
                            <span className="player-vc"><SpeakerHigh size={16} weight="fill" /></span>
                        }

                    </div>
                    <div className="player-properties">
                        {player.properties.browns_owned > 0 &&
                            <PlayerStatsDeeds count={player.properties.browns_owned} type={Color.brown} />
                        }
                        {player.properties.light_blues_owned > 0 &&
                            <PlayerStatsDeeds count={player.properties.light_blues_owned} type={Color.light_blue} />
                        }
                        {player.properties.magentas_owned > 0 &&
                            <PlayerStatsDeeds count={player.properties.magentas_owned} type={Color.pink} />
                        }
                        {player.properties.oranges_owned > 0 &&
                            <PlayerStatsDeeds count={player.properties.oranges_owned} type={Color.orange} />
                        }
                        {player.properties.reds_owned > 0 &&
                            <PlayerStatsDeeds count={player.properties.reds_owned} type={Color.red} />
                        }
                        {player.properties.yellows_owned > 0 &&
                            <PlayerStatsDeeds count={player.properties.yellows_owned} type={Color.yellow} />
                        }
                        {player.properties.greens_owned > 0 &&
                            <PlayerStatsDeeds count={player.properties.greens_owned} type={Color.green} />
                        }
                        {player.properties.dark_blues_owned > 0 &&
                            <PlayerStatsDeeds count={player.properties.dark_blues_owned} type={Color.dark_blue} />
                        }
                        {/* {player.properties.map((property, propertyIndex) => (
                            <div className="player-property" key={propertyIndex}>
                                <div className="vertical-rectangle-small">
                                    <div className="horizontal-rectangle-small"></div>
                                    <div className="number-container">
                                        <span>{property}</span>
                                    </div>
                                </div>
                            </div>
                        ))} */}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PlayerStats;