import { InputHTMLAttributes } from "react";
import '../stylesheets/Button.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    width: string;
    variant?: "primary" | "secondary"
}

export function Button({ width, variant, ...props }: ButtonProps): JSX.Element {
    if (variant == "primary") {
        return (
            <>
                <button className={"button primary"} style={{width}} {...props}>
                    {props.children}
                </button>
            </>
        );
    } else if (variant == "secondary") {
        return (
            <>
                <button className={"button secondary"} style={{width}} {...props}>
                    {props.children}
                </button>
            </>
        );
    } else {
        return (
            <>
                <button className={"button"} style={{width}} {...props}>
                    {props.children}
                </button>
            </>
        );
    }
}

