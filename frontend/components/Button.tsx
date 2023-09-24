import { InputHTMLAttributes } from "react";
import '../stylesheets/Button.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary"
}

export function Button({variant, ...props }: ButtonProps): JSX.Element {
    if (variant == "primary") {
        return (
            <>
                <button className={"button primary"} {...props}>
                    {props.children}
                </button>
            </>
        );
    } else if (variant == "secondary") {
        return (
            <>
                <button className={"button secondary"} {...props}>
                    {props.children}
                </button>
            </>
        );
    } else {
        return (
            <>
                <button className={"button"} {...props}>
                    {props.children}
                </button>
            </>
        );
    }
}

