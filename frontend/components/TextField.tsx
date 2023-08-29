import {HTMLInputTypeAttribute, InputHTMLAttributes} from "react";
import './TextField.css'

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

export function TextField ({label, ...props}: TextFieldProps): JSX.Element {
    return (
        <>
            <label className={"input-container " + ((props.value) ? "filled" : "")}>
                <span className="text-field-label">{label}</span>
                <input className="text-field-input" {...props}/>
            </label>
        </>
    );
}