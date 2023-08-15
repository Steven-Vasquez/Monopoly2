import express from "express";
import Games from "../../database/games.ts";
import Users from "../../database/users.ts";

//import Users from "../../database/users.ts";

import { GAME_CREATED } from "../../../shared/constants.ts";

const router = express.Router();

// Get list of games
router.get("/getGamesList", async (_request: any, response: any) => {
    try {
        const available_games = await Games.listGames();

        response.json(available_games);
    } catch (error) {
        console.log({ error });
    }
});

// Get list of players in a game/lobby (by game_id)
router.get("/getPlayersList/:id", async (request: any, response: any) => {
    const { id: game_id } = request.params;
    const playerList = await Games.listPlayers(game_id);

    const playerNames = []; //playerList.map((player: any) =>  Games.getUsername(player.user_id));
    for (let i = 0; i < playerList.length; i++) {
        const username = await Users.getUsername(playerList[i].user_id);
        playerNames.push(username);
      }

      response.json(playerNames);
});

/*
router.get("/", async (request: any, response: any) => {
    const { id: user_id } = request.session.user;

    try {
        const available_games = await Games.listGames(user_id);

        response.json(available_games);
    } catch (error) {
        console.log({ error });

        response.redirect("/home");
    }
});
*/



// Create new game
router.post("/create", async (request: any, response: any) => {
    // Saves the user_id of whoever created the game
    const { id: user_id } = request.session.user;
    const io = request.app.get("io");
    const { roomName, isPrivate, password } = request.body;


    try {
        const { id: game_id, created_at } = await Games.create(user_id, roomName, isPrivate, password);
        created_at;
        
        try {
            io.emit(GAME_CREATED, { game_id, created_at });
            console.log("Game emitted successfully!!!!");
        }
        catch (error) {
            console.log({ error });
        }

        io.emit(GAME_CREATED, { game_id, created_at });
        response.send({message: "Game created successfully", success: true, game_id: game_id});
    } catch (error) {
        console.log({ error });
        response.send({message: "An error occurred during game creation.", success: false});
    }
});


export default router;
