import db from "./connection.ts";

const create = (game_id: number, sender_id: number, message: string) =>
    // db.one(
    //     "INSERT INTO chat (game_id, sender_id, message) VALUES ($1, $2, $3) RETURNING created_at, message",
    //     [game_id, sender_id, message]
    // );

    // Creates temorary table to return username (from diff table) with chat message
    db.one(
        `WITH temp AS (
        INSERT INTO chat (game_id, sender_id, message) 
        VALUES ($1, $2, $3) 
        RETURNING *
    )
    SELECT temp.*, (SELECT username FROM users WHERE id = temp.sender_id) AS username
    FROM temp`,
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