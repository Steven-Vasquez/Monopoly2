import './DialogPopup.css';

interface DialogProps {
    contents: JSX.Element;
    isDialogVisible: boolean;
    setDialogVisible: (isVisible: boolean) => void;
}

export function DialogPopup({ contents, isDialogVisible, setDialogVisible, ...props }: DialogProps): JSX.Element {
    if (!isDialogVisible) {
        return null;
    }

    return (
        <>
            <div className="popup-container">
                <div className="popup">
                    <div className="popup-content">
                        {contents}
                        <button onClick={() => setDialogVisible(false)}>Close</button>
                    </div>
                </div>
            </div>
        </>
    );
}


// export default function SomePage() {

//     function dialogContents() {
//         const doSomething = () => {
//             console.log("Hello World")
//         }

//         return(
//             <>
//                 <h1>Title</h1>
//                 <p>Lorem ipsum dolor sit amet</p>
//                 <button onClick={dialogContents}></button>
//             </>
//         )
//     }

//     return(
//         <>
//             <DialogPopup contents={dialogContents}/>
//         </>
//     )
// }

