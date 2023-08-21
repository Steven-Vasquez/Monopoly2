import { Link } from "react-router-dom";

import "../stylesheets/Home.css";

function Home() {


    return (
        <div className="page-container">
            <h1 id="site-title">Monopoly</h1>
            <div>
                <h2>Introduction</h2>
                <p>This is the introduction to the monopoly site (why we built it/copyright avoidance)</p>
                <Link to={"/hub"}>Join game</Link>
                <Link to={"/createGame"}>Create game</Link>
            </div>
        </div>
    )
}

export default Home;
