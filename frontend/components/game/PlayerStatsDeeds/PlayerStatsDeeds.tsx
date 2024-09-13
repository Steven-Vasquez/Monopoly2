import "./PlayerStatsDeeds.css"
import { Color } from "#types/Color.js"

interface PlayerStatsDeedsProps {
    count: number,
    type: "railroad" | "utility" | Color
}


function PlayerStatsDeeds(props: PlayerStatsDeedsProps) {
    return(
        <div className="deed-icon">
            <div className={"deed-color " + props.type}></div>
            <div className="deed-count">
                <span>{props.count}</span>
            </div>
        </div>
    )
}

export default PlayerStatsDeeds