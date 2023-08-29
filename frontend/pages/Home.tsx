import { Link } from "react-router-dom";

import "../stylesheets/Home.css";

import { AnimatedLogo } from "../components/AnimatedLogo.tsx";

function Home(props: any) {
    const { loggedIn } = props;


    return (
        <div className="page-container">
            <AnimatedLogo></AnimatedLogo>
            {/* <h1 id="site-title">Monopoly</h1> */}
            <div>
                <h2>Introduction</h2>
                <p>The classic board game Monopoly is now available online for multiplayer! Compete with friends and strangers from all over the world in this fast-paced and strategic game.</p>
                <p>Choose your game room, customize your character, and start playing today!</p>
                <div className="action-links">
                    <>
                        {loggedIn ? (
                            <Link to={"/hub"}>Play Now!</Link>
                        ) : (
                            <Link to={"/login"}>Get Started</Link>
                        )}
                    </>
                </div>
            </div>
        </div>
    )
}

export default Home;
