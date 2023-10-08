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
                        {type: "property", price: 102, color: "brown", title: "Virginia St."},
                        {type: "property", price: 202, color: "brown", title: "California St."},
                        {type: "property", price: 302, color: "brown", title: "Nevada St."},
                        {type: "property", price: 402, color: "brown", title: "Florida St."},
                        {type: "property", price: 502, color: "brown", title: "Ohio St."},
                        {type: "property", price: 602, color: "brown", title: "Maine St."},
                        {type: "property", price: 702, color: "brown", title: "Washington St."},
                        {type: "property", price: 802, color: "brown", title: "Carolina St."},
                        {type: "property", price: 902, color: "brown", title: "Colorado St."},
                    ]
                }
                right={
                    [
                        {type: "property", price: 104, color: "brown", title: "Virginia St."},
                        {type: "property", price: 204, color: "brown", title: "California St."},
                        {type: "property", price: 304, color: "brown", title: "Nevada St."},
                        {type: "property", price: 404, color: "brown", title: "Florida St."},
                        {type: "property", price: 504, color: "brown", title: "Ohio St."},
                        {type: "property", price: 604, color: "brown", title: "Maine St."},
                        {type: "property", price: 704, color: "brown", title: "Washington St."},
                        {type: "property", price: 804, color: "brown", title: "Carolina St."},
                        {type: "property", price: 904, color: "brown", title: "Colorado St."},
                    ]
                }
                top={
                    [
                        {type: "property", price: 103, color: "brown", title: "Virginia St."},
                        {type: "property", price: 203, color: "brown", title: "California St."},
                        {type: "property", price: 303, color: "brown", title: "Nevada St."},
                        {type: "property", price: 403, color: "brown", title: "Florida St."},
                        {type: "property", price: 503, color: "brown", title: "Ohio St."},
                        {type: "property", price: 603, color: "brown", title: "Maine St."},
                        {type: "property", price: 703, color: "brown", title: "Washington St."},
                        {type: "property", price: 803, color: "brown", title: "Carolina St."},
                        {type: "property", price: 903, color: "brown", title: "Colorado St."},
                    ]
                }
                bottom={
                    [
                        {type: "property", price: 101, color: "brown", title: "Virginia St."},
                        {type: "property", price: 201, color: "brown", title: "California St."},
                        {type: "property", price: 301, color: "brown", title: "Nevada St."},
                        {type: "property", price: 401, color: "brown", title: "Florida St."},
                        {type: "property", price: 501, color: "brown", title: "Ohio St."},
                        {type: "property", price: 601, color: "brown", title: "Maine St."},
                        {type: "property", price: 701, color: "brown", title: "Washington St."},
                        {type: "property", price: 801, color: "brown", title: "Carolina St."},
                        {type: "property", price: 901, color: "brown", title: "Colorado St."},
                    ]
                }
            />
        </div>
        </>
    );
}