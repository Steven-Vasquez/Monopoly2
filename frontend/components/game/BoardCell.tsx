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
        console.log("use effect", container)
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
                    {/* <div 
                        className={"colorblock" + props.color}
                    ></div> */}
                    <p className="name">{props.title}</p>
                    <p className="price">{props.price}</p>
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