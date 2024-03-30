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
        className={"monopoly-title link " + (animated ? "animated" : "")} 
        to="/" 
        style={
            {
                fontSize: size, 
                gap: spacing
            }} >
        <span className="mt-letter" id="m1">M</span>
        <span className="mt-letter" id="o2">O</span>
        <span className="mt-letter" id="n3">N</span>
        <span className="mt-letter" id="o4">O</span>
        <span className="mt-letter" id="p5">P</span>
        <span className="mt-letter" id="o6">O</span>
        <span className="mt-letter" id="l7">L</span>
        <span className="mt-letter" id="y8">Y</span>
        </Link>
        </>
    );
}