import { useState, useEffect } from "react";
import "./Board.css"
import { BoardCell } from "../BoardCell/BoardCell.tsx";
import { BoardCellProps } from "../BoardCell/BoardCell.tsx";
import PlayerTurnDialogOptions from "../../../dialogs/PlayerTurnDialogOptions/PlayerTurnDialogOptions.tsx";
import axiosInstance from "#backend/axiosInstance.js";
import { toast } from 'react-hot-toast';
// import { Logo } from "../../general/Logo/Logo.tsx";


// import GameUser from '#types/GameUser.ts';
// import Inventory from '#types/Inventory.js';
// import PropertyInventory from '#types/PropertyInventory.js';

// interface CellProps extends BoardCellProps {
//     type: "property" | "income-tax" | "chest" | "chance" | "railroad" | "electric-company" | "water-works" | "luxury-tax",
//     price?: number,
//     color?: "brown" | "sky" | "pink" | "orange" | "red" | "yellow" | "green" | "blue", 
//     title?: string,
//     description?: string,
// }

interface BoardProps {
    // bottom: BoardCellProps[];
    // left: BoardCellProps[];
    // top: BoardCellProps[];
    // right: BoardCellProps[];
    height: number;
    width: number;
}

export function Board(props: {height: number, width: number, lobbyID: string}) {

    // const [gameUsersArray, setGameUsersArray] = useState<GameUser[]>([]);
    // const [inventoryArray, setInventoryArray] = useState<Inventory[]>([]);
    // const [propertyinventoryArray, setPropertyInventoryArray] = useState<PropertyInventory[]>([]); // Property inventory of all players in the game
    const [propertiesArray, setPropertiesArray] = useState<Property[]>([]); // Property inventory of all players in the game
    const [BoardSpacesArray, setBoardSpacesArray] = useState<BoardSpace[]>([]); // All board spaces on the map


    const fetchData = async () => {
        console.log("Fetching data2");
        try {
            const stateResponse = await axiosInstance.get(`/api/games/getGameState/${props.lobbyID}`);
            const properties: Property[] = stateResponse.data.properties as Property[];

            const spacesResponse = await axiosInstance.get(`/api/games/getBoardSpaces`);
            console.log(spacesResponse);
            const spaces: BoardSpace[] = spacesResponse.data as BoardSpace[]

            // const gameUsers: GameUser[] = response.data.game_users as GameUser[];
            // const inventories: Inventory[] = response.data.inventories as Inventory[];
            // const propertyInventories: PropertyInventory[] = response.data.property_inventories as PropertyInventory[];
            
            setPropertiesArray(properties);
            setBoardSpacesArray(spaces);
            // setGameUsersArray(gameUsers);
            // setInventoryArray(inventories);
            // setPropertyInventoryArray(propertyInventories);
            console.log("Board Fetch", properties);
        } catch (error) {
            console.error("Error fetching Game State: ", error);
            toast.error(`Error fetching Game State!`);
        }  
    };

    useEffect(() => {
        console.log("Board useEffect fetch data upon loading the page")
        fetchData();
        // fetchBoardSpaces();
    }, [props.lobbyID]);

    function GenerateBoardTopRow(): React.JSX.Element {
        const topRowSlice = BoardSpacesArray.slice(21,30)
        console.log(topRowSlice);
        return(
            <>
                {topRowSlice.map((e) => {
                    if (e.space_type == 'property' && e.property_id) {
                        let propertyInfo = propertiesArray.find((elem) => elem.property_id == e.property_id);
                        if (!propertyInfo) {
                            // if property not found, return empty element
                            console.log("Property not found", e.property_id)
                            return (<></>)
                        }
                        console.log("Property", propertyInfo)
                        return <BoardCell
                            data={{space: e, property: propertyInfo}}
                            // price={propertyInfo.property_cost}
                            // color={propertyInfo.property_color}
                            // title={propertyInfo.property_name}
                            orientation="to-bottom"
                        />
                    } else {
                        console.log("Space", e.space_type)
                    }
                })}
            </>
        )
    }

    return (
        <div className="board" style={{
            height: props.height,
            width: props.width
        }}>
            {/* <p>{props.width} x {props.height}</p> */}
            <div className="top-left">
                {/* <BoardCell type={SpaceType.freeParking} /> */}
            </div>
            <div className="top">
                <GenerateBoardTopRow />
                {/* {
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
                } */}
            </div>
            <div className="top-right">
                {/* <BoardCell type={"go-to-jail"} /> */}
            </div>
            <div className="left">
                {/* {
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
                } */}
            </div>
            <div className="center">
                <div className="center-monopoly-title">
                    <span className="mt-letter" id="m1">M</span>
                    <span className="mt-letter" id="o2">O</span>
                    <span className="mt-letter" id="n3">N</span>
                    <span className="mt-letter" id="o4">O</span>
                    <span className="mt-letter" id="p5">P</span>
                    <span className="mt-letter" id="o6">O</span>
                    <span className="mt-letter" id="l7">L</span>
                    <span className="mt-letter" id="y8">Y</span>
                </div>
                <PlayerTurnDialogOptions />
            </div>
            <div className="right">
                {/* {
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
                } */}
            </div>
            <div className="bottom-left">
                {/* <BoardCell type={"jail"} /> */}
            </div>
            <div className="bottom">
                {/* {
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
                } */}
            </div>
            <div className="bottom-right">
                {/* <BoardCell type={"go"} /> */}
            </div>
        </div>
    )
}

export default Board;
