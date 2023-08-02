import { Link } from "react-router-dom";

function Home() {


    return (
        <div>
            <h1>Monopoly</h1>
            <div>
                <h2>Introduction</h2>
                <p>This is the introduction to the monopoly site</p>
                <Link to={"/hub"}>Join game</Link>
                <Link to={"/createGame"}>Create game</Link>
            </div>
        </div>
    )
}

export default Home;