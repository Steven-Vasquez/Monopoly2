import { Question } from "@phosphor-icons/react";
import "../../stylesheets/PlayerInventory.css";

function PlayerInventory() {
    const playerInventory = [
        {
            balance: 69420,
            properties: ['', '', ''], // Add more properties as needed
            color: 'var(--orange)', // TODO: Grab color from player object
        },
        // Add more player objects as needed
    ]

    return (
        <>
            {playerInventory.map((player, index) => (
                <div key={index} className="player-inventory-container">
                    <div className="inventory-left">
                        <div className="center-icon-container" id="chance-cards">
                            <Question size={45} color="#00000" weight="fill" />
                        </div>
                        <div className="center-icon-container" id="balance">
                            <div className="balance-amount">
                                <div className="monopoly-dollar-sign">
                                    ₩
                                </div>
                                <span>{player.balance.toLocaleString()}</span> {/* Formats as balance, adding commas */}
                            </div>
                        </div>
                    </div>
                    <div className="inventory-right">
                        <div className="my-properties" >
                            {player.properties.map((property, propertyIndex) => (
                                <div key={propertyIndex} className="property">
                                    <div className="vertical-rectangle-big">
                                        <div className="horizontal-rectangle-big" style={{ backgroundColor: player.color }}></div>
                                        <div className="number-container">
                                            <span>{property}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default PlayerInventory;