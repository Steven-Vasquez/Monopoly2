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

const getInventories = async (game_id: number) => {
    return db.manyOrNone(
        `SELECT * FROM inventory WHERE game_id=$1`,
        [game_id]
    );
}

const getPropertyInventories = async (game_id: number) => {
    return db.manyOrNone(
        `SELECT * FROM property_inventory WHERE game_id=$1`,
        [game_id]
    );
}

export default {
    getUserIDS,
    getGameUsers,
    getInventories,
    getPropertyInventories
}