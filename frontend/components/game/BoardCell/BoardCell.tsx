import "./BoardCell.css"
import { useState, useEffect, useRef } from 'react'

export type BoardCellProps = {
    data: {space: BoardSpace, property?: Property},
    // type: SpaceType,
    // price?: number,
    // color?: PropertyColor, 
    // title?: string,
    // width?: number,
    // height?: number,
    orientation?: "to-left" | "to-right" | "to-bottom" | "to-top"
}


export function BoardCell(props: BoardCellProps) {

    const container = useRef<HTMLDivElement>(null);
    const [dim, setDim] = useState({ width: 0, height: 0 });
    useEffect(() => {
        // console.log("use effect", container)
        function resize() {

            if (container.current) {
                //console.log(container.current!.getBoundingClientRect());
                setDim({
                    width: container.current!.getBoundingClientRect().width,
                    height: container.current!.getBoundingClientRect().height,
                });
            }
        }
        resize();
        return () => {
            window.addEventListener('resize', resize)   
        }
        // return _ => {
        //     window.removeEventListener('resize', resize)
        // }
    }, [container.current]);


    switch (props.data.space.space_type) {
        case "property":
            return(
                <div className="board-cell property" ref={container}>
                    <div 
                        className={"cell-contents " + props.orientation} 
                        style={
                            props.orientation == "to-left" || props.orientation == "to-right" ? 
                            {width: dim.height, height: dim.width} 
                            : 
                            {width: dim.width, height: dim.height}
                        }
                    >
                        {props.data.property?.property_type == 'color' ?
                            <div 
                                className={"colorblock " + props.data.property?.property_color}
                            ></div>
                            :
                            <></>
                        }
                        <div className="cell-info">
                            <p className="name">{props.data.property?.property_name}</p>
                            {
                                (() => {
                                    if (props.data.property?.property_type == 'railroad') {
                                        return(<img className="cell-icon" src="/frontend/assets/gameBoard/train.svg" alt="" draggable="false"/>) 
                                    } 
                                    else if (props.data.property?.property_type == 'utility' && props.data.property?.property_name.toLowerCase().includes('water')) {
                                        return(<img className="cell-icon" src="/frontend/assets/gameBoard/water.svg" alt="" draggable="false"/>) 
                                    } 
                                    else if (props.data.property?.property_type == 'utility' && props.data.property?.property_name.toLowerCase().includes('electric')) {
                                        return(<img className="cell-icon" src="/frontend/assets/gameBoard/light.svg" alt="" draggable="false"/>) 
                                    } 
                                    else {
                                        return(<></>)
                                    }
                                }
                                )()
                            }
                            <p className="price">${props.data.property?.property_cost}</p>
                        </div>
                    </div>
                </div>
            )
        case "income_tax":
            return(
                <div className="board-cell income-tax" ref={container}>
                    <div 
                        className={"cell-contents " + props.orientation} 
                        style={
                            props.orientation == "to-left" || props.orientation == "to-right" ? 
                            {width: dim.height, height: dim.width} 
                            : 
                            {width: dim.width, height: dim.height}
                        }
                    >
                        <div className="cell-info">
                            <p className="title">Income Tax</p>
                            <p className="desc">{props.data.space.tax_amount}</p>
                        </div>
                    </div>
                </div>
            )
        case "community_chest":
            return(
                <div className="board-cell chest" ref={container}>
                    <div 
                        className={"cell-contents " + props.orientation} 
                        style={
                            props.orientation == "to-left" || props.orientation == "to-right" ? 
                            {width: dim.height, height: dim.width} 
                            : 
                            {width: dim.width, height: dim.height}
                        }
                    >
                        <div className="cell-info">
                            <p className="name">Community Chest</p>
                            <img className="cell-icon" src="/frontend/assets/gameBoard/chest.svg" alt="chest" draggable="false"/>
                        </div>
                    </div>
                </div>
            )
        case "chance":
            return(
                <div className="board-cell chance" ref={container}>
                    <div 
                        className={"cell-contents " + props.orientation} 
                        style={
                            props.orientation == "to-left" || props.orientation == "to-right" ? 
                            {width: dim.height, height: dim.width} 
                            : 
                            {width: dim.width, height: dim.height}
                        }
                    >
                        <div className="cell-info">
                            <p className="name">Chance</p>
                            <img className="cell-icon" src="/frontend/assets/gameBoard/question.svg" alt="chest" draggable="false"/>
                        </div>
                    </div>
                </div>
            )
        // case "railroad":
        //     return(
        //         <div className="board-cell railroad" ref={container}>
        //             <div 
        //                 className={"cell-contents " + props.orientation} 
        //                 style={
        //                     props.orientation == "to-left" || props.orientation == "to-right" ? 
        //                     {width: dim.height, height: dim.width} 
        //                     : 
        //                     {width: dim.width, height: dim.height}
        //                 }
        //             >
        //                 <div className="cell-info">
        //                     <p className="name">{props.title}</p>
        //                     <img className="cell-icon" src="/frontend/assets/gameBoard/train.svg" alt="" draggable="false"/>
        //                     <p className="price">${props.price}</p>
        //                 </div>
        //             </div>
        //         </div>
        //     )
        // case "electric-company":
        //     return(
        //         <div className="board-cell electric-company" ref={container}>
        //             <div 
        //                 className={"cell-contents " + props.orientation} 
        //                 style={
        //                     props.orientation == "to-left" || props.orientation == "to-right" ? 
        //                     {width: dim.height, height: dim.width} 
        //                     : 
        //                     {width: dim.width, height: dim.height}
        //                 }
        //             >
        //                 <div className="cell-info">
        //                     <p className="name">{props.title ? props.title : "Electric Company"}</p>
        //                     <img className="cell-icon" src="/frontend/assets/gameBoard/light.svg" alt="" draggable="false"/>
        //                     <p className="price">${props.price}</p>
        //                 </div>
        //             </div>
        //         </div>
        //     )
        // case "water-works":
        //     return(
        //         <div className="board-cell water-works" ref={container}>
        //             <div 
        //                 className={"cell-contents " + props.orientation} 
        //                 style={
        //                     props.orientation == "to-left" || props.orientation == "to-right" ? 
        //                     {width: dim.height, height: dim.width} 
        //                     : 
        //                     {width: dim.width, height: dim.height}
        //                 }
        //             >
        //                 <div className="cell-info">
        //                     <p className="name">{props.title ? props.title : "Water Works"}</p>
        //                     <img className="cell-icon" src="/frontend/assets/gameBoard/water.svg" alt="" draggable="false"/>
        //                     <p className="price">${props.price}</p>
        //                 </div>
        //             </div>
        //         </div>
        //     )
        case "luxury_tax":
            return(
                <div className="board-cell luxury-tax" ref={container}>
                    <div 
                        className={"cell-contents " + props.orientation} 
                        style={
                            props.orientation == "to-left" || props.orientation == "to-right" ? 
                            {width: dim.height, height: dim.width} 
                            : 
                            {width: dim.width, height: dim.height}
                        }
                    >
                        <div className="cell-info">
                            <p className="title">Luxury Tax</p>
                            <img className="cell-icon" src="/frontend/assets/gameBoard/tax.svg" alt="" draggable="false"/>
                            <p className="desc">{props.data.space.tax_amount}</p>
                        </div>
                    </div>
                </div>
            )
        case "go":
            return(
                <div className="board-corner go" ref={container}>
                    <div 
                        className={"corner-contents"}
                        style={{width: dim.width * 0.7, height: dim.height * 0.7}}
                    >
                        <p>Collect $200 salary as you pass</p>
                        {/* <img className="cell-icon" src="/frontend/assets/gameBoard/parking.svg" alt="" draggable="false"/> */}
                        <h1>Go</h1>
                    </div>
                    <div id="go-arrow">
                        <img className="cell-icon" src="/frontend/assets/gameBoard/arrow.svg" alt="" draggable="false"/>
                    </div>
                </div>
            )
        case "jail":
            return(
                <div className="board-corner jail" ref={container}>
                    <div className="jail-grid">
                        <div id="just" style={{width: dim.width * 0.7, height: dim.height * 0.3}}>
                            <p>Just</p>
                        </div>
                        <div id="jail-cell">
                            <div id="jail-cell-contents" style={{width: dim.width * 0.7, height: dim.height * 0.7}}>
                                <p>In</p>
                                <img className="cell-icon" src="/frontend/assets/gameBoard/jail.svg" alt="" draggable="false"/>
                                <p>Jail</p>
                            </div>
                        </div>
                        <div id="visiting">
                            <p>Visiting</p>
                        </div>
                    </div>
                </div>
            )
        case "free_parking":
            return(
                <div className="board-corner free-parking" ref={container}>
                    <div 
                        className={"corner-contents"}
                        style={{width: dim.width * 0.7, height: dim.height * 0.7}}
                    >
                        <h1>Free</h1>
                        <img className="cell-icon" src="/frontend/assets/gameBoard/parking.svg" alt="" draggable="false"/>
                        <h1>Parking</h1>
                    </div>
                </div>
            )
        case "go_to_jail":
            return(
                <div className="board-corner go-to-jail" ref={container}>
                    <div 
                        className={"corner-contents"}
                        style={{width: dim.width * 0.7, height: dim.height * 0.7}}
                    >
                        <h1>Go To</h1>
                        <img className="cell-icon" src="/frontend/assets/gameBoard/gotojail.svg" alt="" draggable="false"/>
                        <h1>Jail</h1>
                    </div>
                </div>
            )
    }

    
}