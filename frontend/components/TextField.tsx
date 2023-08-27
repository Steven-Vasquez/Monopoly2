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
            <label className={(props.value) ? "filled" : "label-class"}>
                <span className="text-field-span">{label}</span>
                <input className="text-field-input" {...props}/>
            </label>
        </>
    );
}