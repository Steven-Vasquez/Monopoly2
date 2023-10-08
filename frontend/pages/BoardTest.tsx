import Board from "../components/game/Board.tsx";
import { BoardCell } from "../components/game/BoardCell.tsx";
import { useState, useEffect, useRef } from 'react'

export default function Test() {
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
    return(
        <>
        <div style={{width: '100vw', height: '100vh'}} ref={container}>
            
            <Board
                width={Math.min(dim.width, dim.height)}
                height={Math.min(dim.width, dim.height)}
                left={
                    [
                        {type: "property", price: 300, color: "brown", title: "Virginia St."},
                        {type: "property", price: 300, color: "brown", title: "California St."},
                        {type: "property", price: 300, color: "brown", title: "Nevada St."},
                        {type: "property", price: 300, color: "brown", title: "Florida St."},
                        {type: "property", price: 300, color: "brown", title: "Ohio St."},
                        {type: "property", price: 300, color: "brown", title: "Maine St."},
                        {type: "property", price: 300, color: "brown", title: "Washington St."},
                        {type: "property", price: 300, color: "brown", title: "Carolina St."},
                        {type: "property", price: 300, color: "brown", title: "Colorado St."},
                    ]
                }
                right={
                    [
                        {type: "property", price: 300, color: "brown", title: "Virginia St."},
                        {type: "property", price: 300, color: "brown", title: "California St."},
                        {type: "property", price: 300, color: "brown", title: "Nevada St."},
                        {type: "property", price: 300, color: "brown", title: "Florida St."},
                        {type: "property", price: 300, color: "brown", title: "Ohio St."},
                        {type: "property", price: 300, color: "brown", title: "Maine St."},
                        {type: "property", price: 300, color: "brown", title: "Washington St."},
                        {type: "property", price: 300, color: "brown", title: "Carolina St."},
                        {type: "property", price: 300, color: "brown", title: "Colorado St."},
                    ]
                }
            />
        </div>
        </>
    );
}