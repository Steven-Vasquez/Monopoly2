import { useState, useEffect } from "react";
import "../../stylesheets/Board.css"
import { BoardCell } from "./BoardCell.tsx";

export type CellProps = {
    type: "property" | "income-tax" | "chest" | "chance" | "railroad" | "electric-company" | "water-works" | "luxury-tax",
    price?: number,
    color?: "brown" | "sky" | "pink" | "orange" | "red" | "yellow" | "green" | "blue", 
    title?: string,
    description?: string,
}

interface BoardProps {
    center?: CellProps;
    bottom: CellProps[];
    left: CellProps[];
    top: CellProps[];
    right: CellProps[];
    topLeft?: CellProps;
    topRight?: CellProps;
    bottomLeft?: CellProps;
    bottomRight?: CellProps;
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
            <div className="top-left"></div>
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
            <div className="top-right"></div>
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
            <div className="bottom-left"></div>
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
            <div className="bottom-right"></div>
        </div>
        // <div>
        //     <div className="board" id="board-main">
        //         <div className="top-left parking" id="b-21">
        //             <div id="free-parking">
        //                 <h1>Free</h1>
        //                 <img src="../../assets/gameBoard/parking.svg" alt="" />
        //                 <h1>Parking</h1>
        //             </div>
        //         </div>
        //         <div className="top">
        //             <div className="space property" id="b-22">
        //                 <div className="colorblock brown"></div>
        //                 <div className="space-content">
        //                     <p className="name">Kentucky Ave</p>
        //                     <p className="price">$220</p>
        //                 </div>
        //             </div>
        //             <div className="space chance" id="b-23">
        //                 <div className="space-content">
        //                     <p className="name">Chance</p>
        //                     <img src="../../assets/gameBoard/question.svg" alt="" />
        //                     {/* <p className="price">$50</p> */}
        //                 </div>
        //             </div>
        //             <div className="space property" id="b-24">
        //                 <div className="colorblock brown"></div>
        //                 <div className="space-content">
        //                     <p className="name">Indiana Ave</p>
        //                     <p className="price">$220</p>
        //                 </div>
        //             </div>
        //             <div className="space property" id="b-25">
        //                 <div className="colorblock brown"></div>
        //                 <div className="space-content">
        //                     <p className="name">Illinois Ave</p>
        //                     <p className="price">$240</p>
        //                 </div>
        //             </div>
        //             <div className="space rail" id="b-26">
        //                 <div className="space-content">
        //                     <p className="name">Railroad</p>
        //                     <img src="../../assets/gameBoard/train.svg" alt="" />
        //                     <p className="price">$200</p>
        //                 </div>
        //             </div>
        //             <div className="space property" id="b-27">
        //                 <div className="colorblock brown"></div>
        //                 <div className="space-content">
        //                     <p className="name">Atlantic Ave</p>
        //                     <p className="price">$260</p>
        //                 </div>
        //             </div>
        //             <div className="space property" id="b-28">
        //                 <div className="colorblock brown"></div>
        //                 <div className="space-content">
        //                     <p className="name">Ventnor Ave</p>
        //                     <p className="price">$260</p>
        //                 </div>
        //             </div>
        //             <div className="space water" id="b-29">
        //                 <div className="space-content">
        //                     <p className="name">Water Works</p>
        //                     <img src="../../assets/gameBoard/water.svg" alt="" />
        //                     <p className="price">$150</p>
        //                 </div>
        //             </div>
        //             <div className="space property" id="b-30">
        //                 <div className="colorblock brown"></div>
        //                 <div className="space-content">
        //                     <p className="name">Marvin Gardens</p>
        //                     <p className="price">$280</p>
        //                 </div>
        //             </div>
        //         </div>
        //         <div className="top-right goto-jail" id="b-31">
        //             <div id="goto-jail">
        //                 <h1>Go</h1>
        //                 <h1>to</h1>
        //                 <h1>Jail</h1>
        //             </div>
        //         </div>
        //         <div className="left">
        //             <div className="space property" id="b-20">
        //                 <div className="colorblock brown"></div>
        //                 <div className="space-content">
        //                     <p className="name">New York Ave</p>
        //                     <p className="price">$200</p>
        //                 </div>
        //             </div>
        //             <div className="space property" id="b-19">
        //                 <div className="colorblock brown"></div>
        //                 <div className="space-content">
        //                     <p className="name">Tennessee Ave</p>
        //                     <p className="price">$180</p>
        //                 </div>
        //             </div>
        //             <div className="space chest" id="b-18">
        //                 <div className="space-content">
        //                     <p className="name">Community Chest</p>
        //                     <img src="../../assets/gameBoard/chest.svg" alt="" />
        //                     {/* <p className="price">$50</p> */}
        //                 </div>
        //             </div>
        //             <div className="space property" id="b-17">
        //                 <div className="colorblock brown"></div>
        //                 <div className="space-content">
        //                     <p className="name">St. James St</p>
        //                     <p className="price">$180</p>
        //                 </div>
        //             </div>
        //             <div className="space rail" id="b-16">
        //                 <div className="space-content">
        //                     <p className="name">Railroad</p>
        //                     <img src="../../assets/gameBoard/train.svg" alt="" />
        //                     <p className="price">$200</p>
        //                 </div>
        //             </div>
        //             <div className="space property" id="b-15">
        //                 <div className="colorblock brown"></div>
        //                 <div className="space-content">
        //                     <p className="name">Virginia Ave</p>
        //                     <p className="price">$140</p>
        //                 </div>
        //             </div>
        //             <div className="space property" id="b-14">
        //                 <div className="colorblock brown"></div>
        //                 <div className="space-content">
        //                     <p className="name">States Ave</p>
        //                     <p className="price">$140</p>
        //                 </div>
        //             </div>
        //             <div className="space electric" id="b-13">
        //                 <div className="space-content">
        //                     <p className="name">Electric Company</p>
        //                     <img src="../../assets/gameBoard/light.svg" alt="" />
        //                     <p className="price">$150</p>
        //                 </div>
        //             </div>
        //             <div className="space property" id="b-12">
        //                 <div className="colorblock brown"></div>
        //                 <div className="space-content">
        //                     <p className="name">St. Charles Pl</p>
        //                     <p className="price">$140</p>
        //                 </div>
        //             </div>
        //         </div>
        //         <div className="center">
        //             <h1>MONOPOLY</h1>
        //             {/* <button onclick="document.getElementById('dice-roll-popup').showModal()">Open Roll Dice</button> */}
        //             <button>Open Roll Dice</button>
        //             <div id="chance">
        //                 <img src="../../assets/gameBoard/question.svg" alt="" draggable="false" />
        //             </div>
        //             <div id="community-chest">
        //                 <img src="../../assets/gameBoard/chest.svg" alt="" draggable="false" />
        //             </div>
        //         </div>
        //         <div className="right">
        //             <div className="space property" id="b-32">
        //                 <div className="colorblock brown"></div>
        //                 <div className="space-content">
        //                     <p className="name">Pacific Ave</p>
        //                     <p className="price">$50</p>
        //                 </div>
        //             </div>
        //             <div className="space property" id="b-33">
        //                 <div className="colorblock brown"></div>
        //                 <div className="space-content">
        //                     <p className="name">North Carolina Ave</p>
        //                     <p className="price">$200</p>
        //                 </div>
        //             </div>
        //             <div className="space chest" id="b-34">
        //                 <div className="space-content">
        //                     <p className="name">Community Chest</p>
        //                     <img src="../../assets/gameBoard/chest.svg" alt="" />
        //                     {/* <!-- <p className="price">$50</p> --> */}
        //                 </div>
        //             </div>
        //             <div className="space property" id="b-35">
        //                 <div className="colorblock brown"></div>
        //                 <div className="space-content">
        //                     <p className="name">Pennsylvania Ave</p>
        //                     <p className="price">$200</p>
        //                 </div>
        //             </div>
        //             <div className="space rail" id="b-36">
        //                 <div className="space-content">
        //                     <p className="name">Railroad</p>
        //                     <img src="../../assets/gameBoard/train.svg" alt="" />
        //                     <p className="price">$200</p>
        //                 </div>
        //             </div>
        //             <div className="space chance" id="b-37">
        //                 <div className="space-content">
        //                     <p className="name">Chance</p>
        //                     <img src="../../assets/gameBoard/question.svg" alt="" />
        //                     {/* <p className="price">$50</p> */}
        //                 </div>
        //             </div>
        //             <div className="space property" id="b-38">
        //                 <div className="colorblock brown"></div>
        //                 <div className="space-content">
        //                     <p className="name">Park Pl</p>
        //                     <p className="price">$200</p>
        //                 </div>
        //             </div>
        //             <div className="space tax" id="b-39">
        //                 <div className="space-content">
        //                     <p className="name">Luxury Tax</p>
        //                     <img src="../../assets/gameBoard/tax.svg" alt="" />
        //                     {/* <p className="price">$50</p> */}
        //                 </div>
        //             </div>
        //             <div className="space property" id="b-40">
        //                 <div className="colorblock brown"></div>
        //                 <div className="space-content">
        //                     <p className="name">Boardwalk</p>
        //                     <p className="price">$200</p>
        //                 </div>
        //             </div>
        //         </div>
        //         <div className="bottom-left visit-jail" id="b-11">
        //             <div className="jail" id="b-41">
        //                 <h1>In Jail</h1>
        //                 <img src="../../assets/gameBoard/jail.svg" alt="" />
        //             </div>
        //         </div>
        //         <div className="bottom property">
        //             <div className="space" id="b-10">
        //                 <div className="colorblock sky"></div>
        //                 <div className="space-content">
        //                     <p className="name">Connecticut Ave</p>
        //                     <p className="price">$120</p>
        //                 </div>
        //             </div>
        //             <div className="space property" id="b-9">
        //                 <div className="colorblock brown"></div>
        //                 <div className="space-content">
        //                     <p className="name">Vermont Ave</p>
        //                     <p className="price">$100</p>
        //                 </div>
        //             </div>
        //             <div className="space chance" id="b-8">
        //                 <div className="space-content">
        //                     <p className="name">Chance</p>
        //                     <img src="../../assets/gameBoard/question.svg" alt="" />
        //                     {/* <p className="price">$50</p> */}
        //                 </div>
        //             </div>
        //             <div className="space property" id="b-7">
        //                 <div className="colorblock brown"></div>
        //                 <div className="space-content">
        //                     <p className="name">Oriental Ave</p>
        //                     <p className="price">$100</p>
        //                 </div>
        //             </div>
        //             <div className="space rail" id="b-6">
        //                 <div className="space-content">
        //                     <p className="name">Railroad</p>
        //                     <img src="../../assets/gameBoard/train.svg" alt="" />
        //                     <p className="price">$200</p>
        //                 </div>
        //             </div>
        //             <div className="space tax" id="b-5">
        //                 <div className="space-content">
        //                     <h2>Income Tax</h2>
        //                     <p className="price">Pay 10% OR $200</p>
        //                 </div>
        //             </div>
        //             <div className="space property" id="b-4">
        //                 <div className="colorblock brown"></div>
        //                 <div className="space-content">
        //                     <p className="name">Baltic Ave</p>
        //                     <p className="price">$60</p>
        //                 </div>
        //             </div>
        //             <div className="space" id="b-3">
        //                 <div className="space-content">
        //                     <p className="name">Community Chest</p>
        //                     <img src="../../assets/gameBoard/chest.svg" alt="" />
        //                     {/* <!-- <p className="price">$50</p> --> */}
        //                 </div>
        //             </div>
        //             <div className="space property" id="b-2">
        //                 <div className="colorblock brown"></div>
        //                 <div className="space-content">
        //                     <p className="name">Mediterranean Ave</p>
        //                     <p className="price">$60</p>
        //                 </div>
        //             </div>
        //         </div>
        //         <div className="bottom-right" id="b-1">
        //             <div id="go">
        //                 <div id="go-text">
        //                     <p>Collect $200 salary as you pass</p>
        //                     <h1>Go</h1>
        //                 </div>
        //                 <img src="../../assets/gameBoard/arrow.svg" alt="" />
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}

export default Board;
