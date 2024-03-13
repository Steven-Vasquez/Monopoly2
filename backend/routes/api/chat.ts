import express from 'express';
import Chat from "../../database/chat.ts";

import { CHAT_MESSAGE_RECEIVED } from "../../../shared/constants.ts";

const router = express.Router(); // Create router object to define routes

router.get("/getMessages/:id", async (request: any, response: any) => {
    try {
        const { id: game_id } = request.params;
        const chatMessages = await Chat.getMessages(game_id);
        response.json(chatMessages);
    } catch (error) {
        console.log({ error });
    }
});

router.post("/sendMessage/:id", async (request: any, response: any) => {
    try {
        const { id: game_id } = request.params;
        const { id: sender_id } = request.session.user;
        const { message } = request.body;
        const io = request.app.get("io");

        const chatMessage = await Chat.create(game_id, sender_id, message);
        console.log("chat message", chatMessage)
        io.to(game_id).emit(CHAT_MESSAGE_RECEIVED, chatMessage);
        response.json(chatMessage);
    } catch (error) {
        console.log({ error });
    }
});

export default router;