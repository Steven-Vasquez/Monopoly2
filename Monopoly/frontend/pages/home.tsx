import axios from "axios";

function Home() {
    return (
        <div>
            <h1>Home</h1>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
            <a href="/lobby">Lobby</a>
            <button onClick={() => { axios.get("http://localhost:3001/logout") }}>Logout</button>
        </div>
    )
}

export default Home;