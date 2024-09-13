import db from "./connection.ts";

const getUserIDS = async (game_id: number) => {
    return db.any(
        `SELECT user_id FROM game_users WHERE game_id=$1`,
        [game_id]
    );
}

const getGameUsers = async (game_id: number) => {
    return db.manyOrNone(
        `SELECT * FROM game_users WHERE game_id=$1`,
        [game_id]
    );
};

const addBalance = async (user_id: number, game_id: number, amount: number) => {
    return db.none(
        `UPDATE inventory 
         SET balance = balance + $3 
         WHERE user_id = $1 AND game_id = $2`,
        [user_id, game_id, amount]
    );
};

const subtractBalance = async (user_id: number, game_id: number, amount: number) => {
    return db.none(
        `UPDATE inventory 
         SET balance = balance - $3 
         WHERE user_id = $1 AND game_id = $2`,
        [user_id, game_id, amount]
    );
};

export default {
    getUserIDS,
    getGameUsers,
    addBalance,
    subtractBalance
}