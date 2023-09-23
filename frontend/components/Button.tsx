import { InputHTMLAttributes } from "react";
import '../stylesheets/Button.css'

// type TextFieldProps = {
//     inputType?: HTMLInputTypeAttribute;
//     value?: string;
//     error?: boolean;
//     disabled?: boolean;
//     required?: boolean;
//     placeholder?: string;
// }

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    width: string;
    type: "button" | "submit" | "reset" | undefined;
}

const handleClick = () => {
    console.log("Button clicked!");
};

export function Button({ label, width, type }: TextFieldProps): JSX.Element {
    return (
        <>
            <button className={"button"} onClick={handleClick} style={{width}} type={type}>
                {label}
            </button>
        </>
    );
}

