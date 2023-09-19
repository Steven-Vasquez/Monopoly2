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
}

const handleClick = () => {
    console.log("Button clicked!");
    // implementation details
};

export function Button({ label, width }: TextFieldProps): JSX.Element {
    return (
        <>
            <button className={"button"} onClick={handleClick} style={{width}} type="submit">
                {label}
            </button>
        </>
    );
}

