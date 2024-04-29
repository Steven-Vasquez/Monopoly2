import express from "express";
import users from "#backend/database/users.js";
import Players from "../database/players.ts";

const router = express.Router();

router.get("/getPlayerName", async (req: any, res: any) => {
    //console.log(req)
    if (!req.session.user) return res.json([]);
    const { id: user_id } = req.session.user;
    //TODO: convert the user_id to a string
    const username = await users.getUsername(user_id);
    console.log("Username is " + username);
    res.send(username);
});

router.get("/getGameUsers/:id", async (req: any, res: any) => {
    try {
        const { id: game_id } = req.params;
        //const { id: user_id } = req.session.user;
        const game_users = await Players.getGameUsers(game_id);
        console.log("Game users are " + game_users);
        res.json(game_users);
    }
    catch (error) {
        console.error(error);
        res.send("Error");
    }
});

export default router