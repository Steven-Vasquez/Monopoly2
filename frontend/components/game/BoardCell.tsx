import "../../stylesheets/BoardCell.css"
import { useState, useEffect, useRef } from 'react'

type BoardCellProps = {
    type: "property" | "income-tax" | "chest" | "chance" | "railroad" | "electric-company" | "water-works" | "luxury-tax",
    price?: number,
    color?: "brown" | "sky" | "pink" | "orange" | "red" | "yellow" | "green" | "blue", 
    title?: string,
    description?: string,
    // width?: number,
    // height?: number,
    orientation?: "to-left" | "to-right" | "to-bottom" | "to-top"
}


export function BoardCell(props: BoardCellProps) {

    const container = useRef<HTMLDivElement>(null);
    const [dim, setDim] = useState({ width: 0, height: 0 });
    useEffect(() => {
        if (container.current) {
            setDim({
                width: container.current!.getBoundingClientRect().width,
                height: container.current!.getBoundingClientRect().height,
            });
            window.addEventListener('resize', () => {
                setDim({
                    width: container.current!.getBoundingClientRect().width,
                    height: container.current!.getBoundingClientRect().height,
                });
            })
        }
    }, []);


    if (props.type == "property") {
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
                    <div 
                        className={"colorblock" + props.color}
                    ></div>
                    <div className="space-content">
                        {/* <p className="name">{props.title}</p>
                        <p className="price">{props.price}</p> */}
                        {dim.width} x
                        {dim.height}
                    </div>
                </div>
            </div>
        )
    } else {
        return(
            <>
            </>
        );
    }
    
}