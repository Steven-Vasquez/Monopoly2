import express from "express";
import users from "#backend/database/users.js";

const router = express.Router();

router.get("/getPlayerName", async (req: any, res: any) => {
    //console.log(req)
    if(!req.session.user) return res.json([]);
    const user_id = "1";
    //TODO: convert the user_id to a string
    const username = await users.getUsername(user_id);
    console.log("Username is " + username);
    res.send(username);
})

export default router