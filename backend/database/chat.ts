import db from "./connection.ts";

const create = (game_id: number, sender_id: number, message: string) =>
    db.one(
        "INSERT INTO chat (game_id, sender_id, message) VALUES ($1, $2, $3) RETURNING created_at",
        [game_id, sender_id, message]
    );

const GET_MESSAGES_SQL = `SELECT users.username, chat.message, chat.created_at FROM chat JOIN users ON chat.sender_id= users.id WHERE game_id = $1`;
const getMessages = async (game_id: number) => {
    return db.any(GET_MESSAGES_SQL, game_id);
};

export default {
    create,
    getMessages,
};