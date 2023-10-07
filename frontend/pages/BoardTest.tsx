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
                bottom={
                    <>
                    <BoardCell type="property" price={500} color="blue" title="Kentucky Ave."/>
                    <BoardCell type="property" price={500} color="blue" title="Carolina Ave."/>
                    <BoardCell type="property" price={500} color="blue" title="Virginia Ave."/>
                    <BoardCell type="property" price={500} color="blue" title="Iowa Ave."/>
                    <BoardCell type="property" price={500} color="blue" title="Arizona Ave."/>
                    <BoardCell type="property" price={500} color="blue" title="Oregon Ave."/>
                    <BoardCell type="property" price={500} color="blue" title="Colorado Ave."/>
                    <BoardCell type="property" price={500} color="blue" title="Maine Ave."/>
                    <BoardCell type="property" price={500} color="blue" title="Montana Ave."/>
                    </>
                }
                left={
                    <>
                    <BoardCell type="property" price={500} color="blue" title="Kentucky Ave."/>
                    <BoardCell type="property" price={500} color="blue" title="Carolina Ave."/>
                    <BoardCell type="property" price={500} color="blue" title="Virginia Ave."/>
                    <BoardCell type="property" price={500} color="blue" title="Iowa Ave."/>
                    <BoardCell type="property" price={500} color="blue" title="Arizona Ave."/>
                    <BoardCell type="property" price={500} color="blue" title="Oregon Ave."/>
                    <BoardCell type="property" price={500} color="blue" title="Colorado Ave."/>
                    <BoardCell type="property" price={500} color="blue" title="Maine Ave."/>
                    <BoardCell type="property" price={500} color="blue" title="Montana Ave."/>
                    </>
                }
                top={
                    <>
                    <BoardCell type="property" price={500} color="blue" title="Kentucky Ave."/>
                    <BoardCell type="property" price={500} color="blue" title="Carolina Ave."/>
                    <BoardCell type="property" price={500} color="blue" title="Virginia Ave."/>
                    <BoardCell type="property" price={500} color="blue" title="Iowa Ave."/>
                    <BoardCell type="property" price={500} color="blue" title="Arizona Ave."/>
                    <BoardCell type="property" price={500} color="blue" title="Oregon Ave."/>
                    <BoardCell type="property" price={500} color="blue" title="Colorado Ave."/>
                    <BoardCell type="property" price={500} color="blue" title="Maine Ave."/>
                    <BoardCell type="property" price={500} color="blue" title="Montana Ave."/>
                    </>
                }
                right={
                    <>
                    <BoardCell type="property" price={500} color="blue" title="Kentucky Ave."/>
                    <BoardCell type="property" price={500} color="blue" title="Carolina Ave."/>
                    <BoardCell type="property" price={500} color="blue" title="Virginia Ave."/>
                    <BoardCell type="property" price={500} color="blue" title="Iowa Ave."/>
                    <BoardCell type="property" price={500} color="blue" title="Arizona Ave."/>
                    <BoardCell type="property" price={500} color="blue" title="Oregon Ave."/>
                    <BoardCell type="property" price={500} color="blue" title="Colorado Ave."/>
                    <BoardCell type="property" price={500} color="blue" title="Maine Ave."/>
                    <BoardCell type="property" price={500} color="blue" title="Montana Ave."/>
                    </>
                }
            />
        </div>
        </>
    );
}