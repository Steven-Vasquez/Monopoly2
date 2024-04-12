import './DialoguePopup.css';

interface DialogueProps {
    contents: JSX.Element;
}

export function DialoguePopup({ contents, ...props }: DialogueProps): JSX.Element {
    return (
        <>
            <div className="popup-container">
                <div className="popup">
                    <div className="popup-content">
                        {contents}
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
//             <DialoguePopup contents={dialogContents}/>
//         </>
//     )
// }

