import db from "./connection.ts";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from "fs";
import { Property } from "#types/Property.js"; // Fix Not Found Error- Importing Property interface from types folder


// Ensures the property_info table is populated. Otherwise, no game can be played properly
const checkPropertyInfo = async (game_id: number) => {
    console.log("Checking if property info is correct...");
    //const rows = await db.any("SELECT * FROM property_info");

    //const rowCount = rows.length;


    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const propertiesPath = __dirname + "/../data/properties.json";

    console.log(propertiesPath);
    // Read the property data from the JSON file
    const properties: Property[] = JSON.parse(fs.readFileSync(propertiesPath, 'utf-8'));
    console.log("properties length:" + properties.length);
    // Insert the property data into the database
    for (const property of properties) {
        const query = {
            text: `INSERT INTO property_info
             (property_id, game_id, property_name, property_type, property_color, property_cost, mortgage_payout, unmortgage_cost, payout_base,
              house_count, house_hotel_cost, payout_house_1, payout_house_2, payout_house_3, payout_house_4, payout_hotel,
              mortgaged, property_owned, property_owner)
             VALUES
             ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)`,
            values: [
                property.property_id,
                game_id,
                property.property_name,
                property.property_type,
                property.property_color,
                property.property_cost,
                property.mortgage_payout,
                property.unmortgage_cost,
                property.payout_base,
                property.house_count,
                property.house_hotel_cost,
                property.payout_house_1,
                property.payout_house_2,
                property.payout_house_3,
                property.payout_house_4,
                property.payout_hotel,
                false,
                false,
                null
            ],
        };
        await db.query(query);
    }

};

// Ensures the chance_cards table is populated. Otherwise, no game can be played properly
const checkChanceCards = async () => {
    console.log("Checking if chance cards are correct...");
    const rows = await db.any("SELECT * FROM chance_deck");

    const rowCount = rows.length;

    if (rowCount === 0) {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);

        const chanceCardsPath = __dirname + "/../data/chance_cards.json";

        // Read the chance card data from the JSON file
        const chanceCards = JSON.parse(fs.readFileSync(chanceCardsPath, 'utf-8'));
        // Insert the chance card data into the database
        for (const chanceCard of chanceCards) {
            const query = {
                text: `INSERT INTO chance_deck
              (card_id, card_text, action_type, action_data)
              VALUES
              ($1, $2, $3, $4)`,
                values: [
                    chanceCard.card_id,
                    chanceCard.card_text,
                    chanceCard.action_type,
                    chanceCard.action_data,
                ],
            };
            await db.query(query);
        }
    } else {
        console.log("chance_cards table is already populated");
    }
};

// Ensures the community_chest_cards table is populated. Otherwise, no game can be played properly
const checkCommunityChestCards = async () => {
    console.log("Checking if community chest cards are correct...");
    const rows = await db.any("SELECT * FROM community_chest_deck");

    const rowCount = rows.length;

    if (rowCount === 0) {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);

        const communityChestCardsPath = __dirname + "/../data/community_chest_cards.json";
        // Read the community chest card data from the JSON file
        const communityChestCards = JSON.parse(
            fs.readFileSync(communityChestCardsPath, 'utf-8')
        );
        // Insert the community chest card data into the database
        for (const communityChestCard of communityChestCards) {
            const query = {
                text: `INSERT INTO community_chest_deck
              (card_id, card_text, action_type, action_data)
              VALUES
              ($1, $2, $3, $4)`,
                values: [
                    communityChestCard.card_id,
                    communityChestCard.card_text,
                    communityChestCard.action_type,
                    communityChestCard.action_data,
                ],
            };
            await db.query(query);
        }
    } else {
        console.log("community_chest_cards table is already populated");
    }
};

// Creates a game board to be used for a new game
const createGameBoard = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const rows = await db.any("SELECT * FROM board_spaces");

    const rowCount = rows.length;

    if (rowCount === 0) {

        const boardSpacesPath = __dirname + "/../data/board_spaces.json";
        // Read the board space data from the JSON file
        const boardSpaces = JSON.parse(fs.readFileSync(boardSpacesPath, 'utf-8'));
        // Insert the board space data into the database
        for (const boardSpace of boardSpaces) {
            const query = {
                text: `INSERT INTO board_spaces
            (board_position, space_type, property_id, tax_amount)
            VALUES
            ($1, $2, $3, $4)`,
                values: [
                    boardSpace.board_position,
                    boardSpace.space_type,
                    boardSpace.property_id,
                    boardSpace.tax_amount,
                ],
            };
            await db.query(query);
        }
    }
    else {
        console.log("board_spaces table is already populated");
    }
};

// Creates a new game
const create = async (creator_id: number, game_title: string, is_private: boolean, game_password: string) => {
    checkChanceCards(); // Checks if chance_cards table is populated. If not, populates it so users can play the game
    checkCommunityChestCards(); // Checks if community_chest_cards table is populated. If not, populates it so users can play the game

    const CREATE_GAME_SQL =
        "INSERT INTO games (game_title, is_private, game_password, completed) VALUES ($1, $2, $3, false) RETURNING id, created_at";
    const INSERT_FIRST_USER_SQL =
        "INSERT INTO game_users (user_id, game_id, current_player, play_order) VALUES ($1, $2, true, 1)";

    const INSERT_INVENTORY_SQL =
        "INSERT INTO inventory (user_id, game_id) VALUES ($1, $2)";
    const INSERT_PROPERTY_INV_SQL =
        "INSERT INTO property_inventory (user_id, game_id) VALUES ($1, $2)";
    const { id, created_at }: { id: number; created_at: string } = await db.one(
        CREATE_GAME_SQL,
        [game_title, is_private, game_password]
    ); // Creates game instance for this game (in the database in the games table)
    await db.none(INSERT_FIRST_USER_SQL, [creator_id, id]); // Insert creator of the game into the game (into the game_users column of the game row)
    await db.none(INSERT_INVENTORY_SQL, [creator_id, id]);
    await db.none(INSERT_PROPERTY_INV_SQL, [creator_id, id]);
    createGameBoard(); // Creates the game board for this game (in the database in the board_spaces table)
    checkPropertyInfo(id); // Checks if property_info table is populated. If not, populates it so users can play the game
    return { id, created_at }; // Returns the game id
};


// Allow a user to join the game database-wise
const join = async (game_id: number, user_id: number) => {
    // Check if user is already in the game they're trying to join
    // const CHECK_IF_IN_CURRENT_GAME_SQL = "SELECT * FROM game_users WHERE user_id=$1 AND game_id=$2";
    // const rowCount = await db.one(CHECK_IF_IN_GAME_SQL, [user_id, game_id]);
    // if (rowCount) {
    //   throw new Error("Error thrown: Player is already in a game");
    //   console.log("Error thrown: Player is already in a game");
    // }

    // User is added to game (they are added to the game_users table with the corresponding game_id)

    // Read player_count from game from games table with game_id
    let player_count = await db.one(
        "SELECT player_count FROM games WHERE id=$1",
        [game_id]
    );

    if (player_count.player_count >= 4) {
        console.log("Error thrown: Game is full");
        throw new Error("Error thrown: Game is full");
    }


    // Add 1 to player_count
    console.log("Player count: ");
    console.log(player_count);
    player_count = player_count.player_count;
    player_count++;

    if (player_count >= 4) {
        await db.none("UPDATE games SET joinable=false WHERE id=$1", [game_id]);
    }

    console.log("Player count: " + player_count);

    // Insert into game_users table with game_id, user_id, player_count
    const INSERT_GAME_USER_SQL =
        "INSERT INTO game_users (game_id, user_id, play_order) VALUES ($1, $2, $3)";
    const INSERT_INVENTORY_SQL =
        "INSERT INTO inventory (user_id, game_id) VALUES ($1, $2)";
    const INSERT_PROPERTY_INV_SQL =
        "INSERT INTO property_inventory (user_id, game_id) VALUES ($1, $2)";
    await db.none(INSERT_GAME_USER_SQL, [game_id, user_id, player_count]);
    await db.none(INSERT_INVENTORY_SQL, [user_id, game_id]);
    await db.none(INSERT_PROPERTY_INV_SQL, [user_id, game_id]);

    // Update games table with new player_count
    await db.none("UPDATE games SET player_count=$1 WHERE id=$2", [
        player_count,
        game_id,
    ]);
};


// Gets the list of all games that are joinable
const GAMES_LIST_SQL = `SELECT * FROM games WHERE joinable=true;`;
const listGames = async () => db.any(GAMES_LIST_SQL);

const listMyGames = async (user_id: number) => {
    const MY_GAMES_LIST_SQL = `SELECT * FROM games WHERE id IN (SELECT game_id FROM game_users WHERE user_id=$1);`;
    return db.any(MY_GAMES_LIST_SQL, [user_id]);
};


// Gets the list of all the players in the current game being played and sort them by play_order
const PLAYERS_LIST_SQL = `SELECT user_id FROM game_users WHERE game_id=$1 ORDER BY play_order ASC;`;
const listPlayers = async (game_id: number) => db.any(PLAYERS_LIST_SQL, [game_id]);


// Create and return the game state
const state = async (game_id: number) => {
    // Dealing with the game_users table

    //properties, game_users, inventory, properties_inventory

    const properties = await db.many(
        `
    SELECT *
    FROM property_info
    WHERE game_id = $1
    `, [game_id]
    );

    const game_users = await db.many(
        `
     SELECT *
     FROM game_users
     WHERE game_id = $1
     ORDER BY play_order
     `,
        [game_id]
    );

    const inventories = await db.many(
        `
    SELECT *
    FROM inventory
    WHERE game_id = $1
    `,
        [game_id]
    );

    const property_inventories = await db.many(
    `
    SELECT *
    FROM property_inventory
    WHERE game_id = $1
    `,
        [game_id]
    );

    return {
        properties,
        game_id,
        game_users,
        inventories,
        property_inventories,
    };
};

const getBoardSpaces = async () => {
    const boardSpaces = await db.many(
        `
    SELECT *
    FROM board_spaces
    ORDER BY board_position
    `,
        []
    );

    return boardSpaces;
}


export default {
    create,
    join,
    listGames,
    listMyGames,
    listPlayers,
    state,
    getBoardSpaces
};