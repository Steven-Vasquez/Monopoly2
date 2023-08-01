import {HTMLInputTypeAttribute} from "react";

type TextFieldProps = {
    inputType?: HTMLInputTypeAttribute;
    value?: string;
    error?: boolean;
    disabled?: boolean;
    required?: boolean;
    placeholder?: string;
}

export function TextField (props: TextFieldProps): JSX.Element {
    return (
        <>
            <label>
                <input type={props.inputType || "text"} disabled={props.disabled} required={props.required} placeholder={props.placeholder}/>
            </label>
        </>
    );
}