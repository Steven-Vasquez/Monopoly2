import { Link } from "react-router-dom";

import "../stylesheets/Home.css";

function Home(props: any) {
    const { loggedIn } = props;


    return (
        <div className="page-container">
            <h1 id="site-title">Monopoly</h1>
            <div>
                <h2>Introduction</h2>
                <p>This is the introduction to the monopoly site (a web app to play monopoly with friends or strangers online)</p>
                {loggedIn ? (
                    <Link to={"/hub"}>Play Now!</Link>
                ) : (
                    <Link to={"/login"}>Get Started</Link>
                    )}
            </div>
        </div>
    )
}

export default Home;
