import './DialogPopup.css';

interface DialogProps {
    setDialogVisible: (isVisible: boolean) => void;
    children: React.ReactNode;
}

export function DialogPopup({ setDialogVisible, children }: DialogProps): JSX.Element {
    return (
        <>
            <div className="modal">
                <div className="backdrop">
                    <div className="dialog">
                        {children}
                        <button title="Close dialog" aria-label="Close dialog" onClick={() => setDialogVisible(false)}></button>
                    </div>
                </div>
            </div>
        </>
    );
}
