import Board from "../components/game/Board.tsx";
import { BoardCell } from "../components/game/BoardCell.tsx";

export default function Test() {
    return(
        <>
            <Board>
                <BoardCell type="property" price={500} color="blue" title="Kentucky Ave."/>
                <BoardCell type="property" price={500} color="blue" title="Kentucky Ave."/>
                <BoardCell type="property" price={500} color="blue" title="Kentucky Ave."/>
                <BoardCell type="property" price={500} color="blue" title="Kentucky Ave."/>
                <BoardCell type="property" price={500} color="blue" title="Kentucky Ave."/>
                <BoardCell type="property" price={500} color="blue" title="Kentucky Ave."/>
            </Board>
        </>
    );
}