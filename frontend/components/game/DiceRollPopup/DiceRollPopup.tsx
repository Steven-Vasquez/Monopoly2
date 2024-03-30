function DiceRollPopup() {

    const thisElem = document.getElementById("dice-roll-popup");
    const rollButton = document.getElementById("roll-button");
    const closeButton = document.getElementById("close-button");
    const dice1 = document.getElementById("dice1");
    const dice1text = document.getElementById("dice1-number");
    const dice2 = document.getElementById("dice2");
    const dice2text = document.getElementById("dice2-number");

    function rollDice() {
        let d1 = Math.floor((Math.random() * 6) + 1);
        let d2 = Math.floor((Math.random() * 6) + 1);
        // for (let i = 1; i <= 6; i++) {
        //     dice1.classList.remove(`show-${i}`)
        //     dice2.classList.remove(`show-${i}`)
        // }

        // dice1.classList.add(`show-${d1}`);
        // dice1text.innerHTML = d1;

        // dice2.classList.add(`show-${d2}`);
        // dice2text.innerHTML = d2;

        // rollButton.disabled = true;
        // rollButton.style.display = "none";
        // closeButton.style.display = "block";

        // setTimeout(() => { thisElem.close(); }, 2000);
    }
    return (
        <div>
            <dialog id="dice-roll-popup">
                <div className="dice-popup-container">
                    <div className="dice-grid">
                        <div id="dice1" className="dice">
                            <div id="d1-1" className="side">
                                <img src="/assets/img/d1.svg" alt="" />
                            </div>
                            <div id="d1-2" className="side">
                                <img src="/assets/img/d2.svg" alt="" />
                            </div>
                            <div id="d1-3" className="side">
                                <img src="/assets/img/d3.svg" alt="" />
                            </div>
                            <div id="d1-4" className="side">
                                <img src="/assets/img/d4.svg" alt="" />
                            </div>
                            <div id="d1-5" className="side">
                                <img src="/assets/img/d5.svg" alt="" />
                            </div>
                            <div id="d1-6" className="side">
                                <img src="/assets/img/d6.svg" alt="" />
                            </div>
                        </div>
                        <div id="dice2" className="dice">
                            <div id="d2-1" className="side">
                                <img src="/assets/img/d1.svg" alt="" />
                            </div>
                            <div id="d2-2" className="side">
                                <img src="/assets/img/d2.svg" alt="" />
                            </div>
                            <div id="d2-3" className="side">
                                <img src="/assets/img/d3.svg" alt="" />
                            </div>
                            <div id="d2-4" className="side">
                                <img src="/assets/img/d4.svg" alt="" />
                            </div>
                            <div id="d2-5" className="side">
                                <img src="/assets/img/d5.svg" alt="" />
                            </div>
                            <div id="d2-6" className="side">
                                <img src="/assets/img/d6.svg" alt="" />
                            </div>
                        </div>
                    </div>
                    {/* <div id="dice1-number" className="dice-number">
                                ?
                        </div>
                        <div id="dice2-number" className="dice-number">
                                ?
                        </div> */}
                </div>

                <div className="button-container">
                    <form action="/api/games/<%= id %>/move" method="POST">
                        <button id="roll-button" className="primary-button" /*onclick="rollDice();"*/>Roll</button>

                        <button /*style="display: none;"*/ id="close-button" className="close primary-button" /*onClick="document.getElementById('dice-roll-popup').close();"*/>
                            Close
                        </button>
                    </form>
                </div>
            </dialog>
        </div>
    );
}

export default DiceRollPopup;