import { useState, useEffect } from "react";
import "../../stylesheets/Board.css"
import { BoardCell } from "./BoardCell.tsx";
import { BoardCellProps } from "./BoardCell.tsx";

// interface CellProps extends BoardCellProps {
//     type: "property" | "income-tax" | "chest" | "chance" | "railroad" | "electric-company" | "water-works" | "luxury-tax",
//     price?: number,
//     color?: "brown" | "sky" | "pink" | "orange" | "red" | "yellow" | "green" | "blue", 
//     title?: string,
//     description?: string,
// }

interface BoardProps {
    bottom: BoardCellProps[];
    left: BoardCellProps[];
    top: BoardCellProps[];
    right: BoardCellProps[];
    height: number;
    width: number;
}


export function Board(props : BoardProps) {
    return (
        <div className="board" style={{
            height: props.height,
            width: props.width
        }}>
            {/* <p>{props.width} x {props.height}</p> */}
            <div className="top-left">
                <BoardCell type={"free-parking"} />
            </div>
            <div className="top">
            {
                props.top.map((e) => {
                    return <BoardCell 
                        type={e.type} 
                        price={e.price} 
                        color={e.color} 
                        title={e.title} 
                        description={e.description}
                        orientation="to-bottom"
                    />
                })
            }
            </div>
            <div className="top-right">
                <BoardCell type={"go-to-jail"} />
            </div>
            <div className="left">
                {
                    props.left.map((e) => {
                        return <BoardCell 
                            type={e.type} 
                            price={e.price} 
                            color={e.color} 
                            title={e.title} 
                            description={e.description}
                            orientation="to-right"
                        />
                    })
                }
            </div>
            <div className="center"></div>
            <div className="right">
            {
                props.right.map((e) => {
                    return <BoardCell 
                        type={e.type} 
                        price={e.price} 
                        color={e.color} 
                        title={e.title} 
                        description={e.description}
                        orientation="to-left"
                    />
                })
            }
            </div>
            <div className="bottom-left">
                <BoardCell type={"jail"} />
            </div>
            <div className="bottom">
            {
                props.bottom.map((e) => {
                    return <BoardCell 
                        type={e.type} 
                        price={e.price} 
                        color={e.color} 
                        title={e.title} 
                        description={e.description}
                        orientation="to-top"
                    />
                })
            }
            </div>
            <div className="bottom-right">
                <BoardCell type={"go"} />
            </div>
        </div>
    )
}

export default Board;
