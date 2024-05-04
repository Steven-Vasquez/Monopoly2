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

// Get all the game_users database rows in the game
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

// Get all the inventories database rows in the game
router.get("/getInventories/:id", async (req: any, res: any) => {
    try {
        const { id: game_id } = req.params;
        //const { id: user_id } = req.session.user;
        const inventories = await Players.getInventories(game_id);
        console.log("Inventory is " + inventories);
        res.json(inventories);
    }
    catch (error) {
        console.error(error);
        res.send("Error");
    }
});

// Get all the property_inventory database rows in the game
router.get("/getPropertyInventories/:id", async (req: any, res: any) => {
    try {
        const { id: game_id } = req.params;
        //const { id: user_id } = req.session.user;
        const property_inventories = await Players.getPropertyInventories(game_id);
        console.log("Property inventory is " + property_inventories);
        res.json(property_inventories);
    }
    catch (error) {
        console.error(error);
        res.send("Error");
    }
});


// For testing purposes- Add 10$ to user's balance
router.post("/addBalance/:id", async (req: any, res: any) => {
    try {
        const { id: user_id } = req.session.user;
        const { id: game_id } = req.params;
        await Players.addBalance(user_id, game_id, 10);
        res.send("Success");
    }
    catch (error) {
        console.error(error);
        res.send("Error");
    }
});


export default router