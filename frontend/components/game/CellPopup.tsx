function CellPopup() {
    return (
        <div>
            <dialog className="card-dialog" id="card-popup-${id}">
                <div className="card-dialog-container">
                    <div className="card property">
                        <div className="card-content">
                            <div className="color-block">
                                <h1 className="property-name">
                                    Lorem Ipsum St.
                                </h1>
                            </div>
                            <div className="card-body">
                                <span className="rent">
                                    <span>With 1 House</span>
                                    <span>$50</span>
                                </span>
                                <span className="rent">
                                    <span>With 1 House</span>
                                    <span>$100</span>
                                </span>
                                <span className="rent">
                                    <span>With 1 House</span>
                                    <span>$100</span>
                                </span>
                                <span className="rent">
                                    <span>With 1 House</span>
                                    <span>$100</span>
                                </span>
                                <span className="rent">
                                    <span>With 1 House</span>
                                    <span>$100</span>
                                </span>
                            </div>
                            <div className="card-bottom">
                                <span className="rent">
                                    <span>With 1 House</span>
                                    <span>$100</span>
                                </span>
                                <span className="rent">
                                    <span>With 1 House</span>
                                    <span>$100</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="card chance">
                        <div className="card-content">
                            <div className="card-left">
                                <img src="/assets/img/question.svg" alt="" />
                            </div>
                            <div className="card-right">
                                <h1>Chance</h1>
                                <p>Lorem ipsum dolor sit amet consectetur!</p>
                            </div>
                        </div>
                    </div>
                    <div className="card chest">
                        <div className="card-content">
                            <div className="card-left">
                                <img src="/assets/img/chest.svg" alt="" />
                            </div>
                            <div className="card-right">
                                <h1>Community Chest</h1>
                                <p>Lorem ipsum dolor sit amet consectetur!</p>
                            </div>
                        </div>
                    </div>
                    <button className="close primary-button" /*onClick="document.getElementById('card-popup-<%= id %>').close();"*/>
                        Close
                    </button>
                </div>
            </dialog>
        </div >
    );
}

export default CellPopup;