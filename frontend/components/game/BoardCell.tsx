import "../../stylesheets/BoardCell.css"

type BoardCellProps = {
    type: "property" | "income-tax" | "chest" | "chance" | "railroad" | "electric-company" | "water-works" | "luxury-tax",
    price?: number,
    color?: "brown" | "sky" | "pink" | "orange" | "red" | "yellow" | "green" | "blue", 
    title?: string,
    description?: string,
}


export function BoardCell(props: BoardCellProps) {
    if (props.type == "property") {
        return(
            <div className="board-cell property">
                <div className={"colorblock" + props.color}></div>
                <div className="space-content">
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