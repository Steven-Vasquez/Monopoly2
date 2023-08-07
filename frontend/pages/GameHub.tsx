import Games from "../../backend/database/games.ts";

export function Hub() {
    
    const gamesList = Games.listGames();

    console.log(gamesList);
    return (
        <div>
            <h1>Games List</h1>
            <p></p>
        </div>
    );
}

export default Hub;