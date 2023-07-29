import {HTMLInputTypeAttribute} from "react";

type TextFieldProps = {
    inputType?: HTMLInputTypeAttribute;
    value: String;
    error: Boolean;
    disabled: Boolean;
    required: Boolean;
}

export function TextField (props: TextFieldProps): JSX.Element {
    return (
        <>
            <label>
                <input type={props.inputType} />
            </label>
        </>
    );
}