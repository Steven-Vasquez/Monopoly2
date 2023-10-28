import '../stylesheets/Tab.css'
import { Link } from 'react-router-dom';

interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "button" | "link";
    className: string;
    linkTo: string;
}

export function Tab({ variant, className, linkTo, ...props }: TabProps): JSX.Element {
    if (variant == "button") {
        return (
            <>
                <button type="button" className={className} {...props}>
                    {props.children}
                </button>
            </>
        );
    } else if (variant == "link") {
        return (
            <>
                <Link to={linkTo} className={className}>{props.children}</Link>
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

