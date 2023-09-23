import { InputHTMLAttributes } from "react";
import '../stylesheets/Button.css'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    type: "button" | "submit" | "reset" | undefined;
    style: any;
    onClick: any;
}

// const handleClick = () => {
//     console.log("Button clicked!");
// };

export function Button({ label, type, style, onClick }: TextFieldProps): JSX.Element {
    return (
        <>
            <button className={"button"} type={type} style={style} onClick={onClick} >
                {label}
            </button>
        </>
    );
}

