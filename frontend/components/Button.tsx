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

}

const handleClick = () => {
    console.log("Button clicked!");
    // implementation details
};

export function Button({ label }: TextFieldProps): JSX.Element {
    return (
        <>
            <div className={"button"} onClick={handleClick}>
                {label}
            </div>
        </>
    );
}

