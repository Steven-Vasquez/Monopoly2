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
import { Property } from "#types/Property.js"; // Fix Not Found Error- Importing Property interface from types folder


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

export function Board(props: { height: number, width: number, lobbyID: string }) {

    // const [gameUsersArray, setGameUsersArray] = useState<GameUser[]>([]);
    // const [inventoryArray, setInventoryArray] = useState<Inventory[]>([]);
    // const [propertyinventoryArray, setPropertyInventoryArray] = useState<PropertyInventory[]>([]); // Property inventory of all players in the game
    const [propertiesArray, setPropertiesArray] = useState<Property[]>([]); // Property inventory of all players in the game
    const [BoardSpacesArray, setBoardSpacesArray] = useState<BoardSpace[]>([]); // All board spaces on the map
    const [boardLoaded, setBoardLoaded] = useState(false)

    const fetchData = async () => {
        console.log("Fetching data2");
        try {
            const stateResponse = await axiosInstance.get(`/api/games/getGameState/${props.lobbyID}`);
            const properties: Property[] = stateResponse.data.properties as Property[];

            const spacesResponse = await axiosInstance.get(`/api/games/getBoardSpaces`);
            console.log("Space response", spacesResponse);
            const spaces: BoardSpace[] = spacesResponse.data as BoardSpace[];

            // const gameUsers: GameUser[] = response.data.game_users as GameUser[];
            // const inventories: Inventory[] = response.data.inventories as Inventory[];
            // const propertyInventories: PropertyInventory[] = response.data.property_inventories as PropertyInventory[];

            setPropertiesArray(properties);
            setBoardSpacesArray(spaces);
            // setGameUsersArray(gameUsers);
            // setInventoryArray(inventories);
            // setPropertyInventoryArray(propertyInventories);
            console.log("Board Fetch", spaces);
            setBoardLoaded(true)
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
        const topRowSlice = BoardSpacesArray.slice(21, 30)
        // console.log(topRowSlice);
        return (
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
                            data={{ space: e, property: propertyInfo }}
                            orientation="to-bottom"
                        />
                    } else {
                        return <BoardCell
                            data={{ space: e }}
                            orientation="to-bottom"
                        />
                    }
                })}
            </>
        )
    }

    function GenerateBoardLeftCol(): React.JSX.Element {
        const leftColSlice = BoardSpacesArray.slice(11, 20)
        // console.log(leftColSlice);
        return (
            <>
                {leftColSlice.map((e) => {
                    if (e.space_type == 'property' && e.property_id) {
                        let propertyInfo = propertiesArray.find((elem) => elem.property_id == e.property_id);
                        if (!propertyInfo) {
                            // if property not found, return empty element
                            console.log("Property not found", e.property_id)
                            return (<></>)
                        }
                        console.log("Property", propertyInfo)
                        return <BoardCell
                            data={{ space: e, property: propertyInfo }}
                            orientation="to-right"
                        />
                    } else {
                        return <BoardCell
                            key={e.board_position}
                            data={{ space: e }}
                            orientation="to-right"
                        />
                    }
                })}
            </>
        )
    }

    function GenerateBoardRightCol(): React.JSX.Element {
        const rightColSlice = BoardSpacesArray.slice(31, 40)
        console.log("Right col slice:", rightColSlice);
        return (
            <>
                {rightColSlice.map((e) => {
                    if (e.space_type == 'property' && e.property_id) {
                        let propertyInfo = propertiesArray.find((elem) => elem.property_id == e.property_id);
                        if (!propertyInfo) {
                            // if property not found, return empty element
                            console.log("Property not found", e.property_id)
                            return (<></>)
                        }
                        console.log("Property", propertyInfo)
                        return <BoardCell
                            key={e.board_position}
                            data={{ space: e, property: propertyInfo }}
                            orientation="to-left"
                        />
                    } else {
                        // console.log("Space", e.space_type)
                        return <BoardCell 
                            key={e.board_position}
                            data={{ space: e }}
                            orientation="to-left"
                        />
                    }
                })}
            </>
        )
    }

    function GenerateBoardBotttomRow(): React.JSX.Element {
        const bottomRowSlice = BoardSpacesArray.slice(1, 10)
        // console.log(topRowSlice);
        return (
            <>
                {bottomRowSlice.map((e) => {
                    if (e.space_type == 'property' && e.property_id) {
                        let propertyInfo = propertiesArray.find((elem) => elem.property_id == e.property_id);
                        if (!propertyInfo) {
                            // if property not found, return empty element
                            console.log("Property not found", e.property_id)
                            return (<></>)
                        }
                        console.log("Property", propertyInfo)
                        return <BoardCell 
                            key={e.board_position}
                            data={{ space: e, property: propertyInfo }}
                            orientation="to-top"
                        />
                    } else {
                        return <BoardCell 
                            key={e.board_position}
                            data={{ space: e }}
                            orientation="to-top"
                        />
                    }
                })}
            </>
        )
    }

    if (!boardLoaded) {
        return (<></>)
    }
    return (
        <div className="board" style={{
            height: props.height,
            width: props.width
        }}>
            {/* {isLoading ? 'loading': 'done'} */}
            {/* <p>{props.width} x {props.height}</p> */}
            <div className="top-left">
                <BoardCell data={{ space: BoardSpacesArray[20] }} />
            </div>
            <div className="top">
                <GenerateBoardTopRow />
            </div>
            <div className="top-right">

                <BoardCell data={{ space: BoardSpacesArray[30] }} />
            </div>
            <div className="left">
                <GenerateBoardLeftCol />
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
                <GenerateBoardRightCol />
            </div>
            <div className="bottom-left">
                <BoardCell data={{ space: BoardSpacesArray[10] }} />
            </div>
            <div className="bottom">
                <GenerateBoardBotttomRow />
            </div>
            <div className="bottom-right">
                <BoardCell data={{ space: BoardSpacesArray[0] }} />
            </div>
        </div>
    )
}

export default Board;
