import express from "express";
import Games from "../database/games.ts";
import Users from "../database/users.ts";

//import Users from "../../database/users.ts";

import { GAME_CREATED, GAME_JOINED } from "#constants";

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


// Get list of games that user is in
router.get("/getMyGamesList", async (request: any, response: any) => {
    if(!request.session.user) return response.json([]); // If user is not logged in, return empty array
    const { id: user_id } = request.session.user;
    
    try {
        const available_games = await Games.listMyGames(user_id);
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

// Join a game
router.post("/:id/join", async (request: any, response: any) => {
    const { id: game_id } = request.params;
    const { id: user_id } = request.session.user;
    const io = request.app.get("io");

    try {
        await Games.join(game_id, user_id);

        const state = await Games.state(game_id, user_id);
        console.log("state: ");
        console.log(state);
        //io.to(game_id).emit(GAME_UPDATED(game_id), state);

        const username = await Users.getUsername(user_id);
        console.log(
            "the username being sent to lobby websocket is " + username.username
        );
        io.to(game_id).emit(GAME_JOINED, username.username); // not working

        response.send({ message: "Game joined successfully", success: true, game_id: game_id });
    } catch (error) {
        console.log({ error });

        response.send({ message: "An error occured while joining a game", success: false, game_id: game_id });

    }
});


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
        response.send({ message: "Game created successfully", success: true, game_id: game_id });
    } catch (error) {
        console.log({ error });
        response.send({ message: "An error occurred during game creation.", success: false });
    }
});


export default router;
