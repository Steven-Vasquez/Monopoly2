import "./Logo.css"

import { Link } from 'react-router-dom';

interface LogoProps {
    animated?: boolean,
    size: number,
    spacing: number,
}

export function Logo({animated, size, spacing, ...props}: LogoProps): JSX.Element {
    return (
        <>
        <Link 
        className={"logo link " + (animated ? "animated" : "")} 
        to="/" 
        style={
            {
                fontSize: size, 
                gap: spacing
            }} >
        <span id="m1">M</span>
        <span id="o2">O</span>
        <span id="n3">N</span>
        <span id="o4">O</span>
        <span id="p5">P</span>
        <span id="o6">O</span>
        <span id="l7">L</span>
        <span id="y8">Y</span>
        </Link>
        </>
    );
}