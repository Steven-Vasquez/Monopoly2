import db from "./connection.ts";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from "fs";


// Ensures the property_info table is populated. Otherwise, no game can be played properly
const checkPropertyInfo = async () => {
    console.log("Checking if property info is correct...");
    const rows = await db.any("SELECT * FROM property_info");

    const rowCount = rows.length;

    if (rowCount === 0) {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);

        const propertiesPath = __dirname + "/properties.json";

        console.log(propertiesPath);
        // Read the property data from the JSON file
        const properties = JSON.parse(fs.readFileSync(propertiesPath, 'utf-8'));
        // Insert the property data into the database
        for (const property of properties) {
            const query = {
                text: `INSERT INTO property_info
             (board_position, property_name, property_color, property_cost, mortgage_payout, unmortgage_cost, payout_base,
              house_cost_1, house_cost_2, house_cost_3, house_cost_4, hotel_cost,
              payout_house_1, payout_house_2, payout_house_3, payout_house_4, payout_hotel)
             VALUES
             ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)`,
                values: [
                    property.board_position,
                    property.property_name,
                    property.property_color,
                    property.property_cost,
                    property.mortgage_payout,
                    property.unmortgage_cost,
                    property.payout_base,
                    property.house_cost_1,
                    property.house_cost_2,
                    property.house_cost_3,
                    property.house_cost_4,
                    property.hotel_cost,
                    property.payout_house_1,
                    property.payout_house_2,
                    property.payout_house_3,
                    property.payout_house_4,
                    property.payout_hotel,
                ],
            };
            await db.query(query);
        }
    } else {
        console.log("property_info table is already populated");
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

        const chanceCardsPath = __dirname + "/chance_cards.json";

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

        const communityChestCardsPath = __dirname + "/community_chest_cards.json";
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
const createGameBoard = async (game_id: number) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const boardSpacesPath = __dirname + "/board_spaces.json";
    // Read the board space data from the JSON file
    const boardSpaces = JSON.parse(fs.readFileSync(boardSpacesPath, 'utf-8'));
    // Insert the board space data into the database
    for (const boardSpace of boardSpaces) {
        const query = {
            text: `INSERT INTO board_spaces
            (game_id, board_position, space_name, space_type)
            VALUES
            ($1, $2, $3, $4)`,
            values: [
                game_id,
                boardSpace.board_position,
                boardSpace.space_name,
                boardSpace.space_type,
            ],
        };
        await db.query(query);
    }
};

// Creates a new game
const create = async (creator_id: number, game_title: string, is_private: boolean, game_password: string) => {
    checkPropertyInfo(); // Checks if property_info table is populated. If not, populates it so users can play the game
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
    createGameBoard(id); // Creates the game board for this game (in the database in the board_spaces table)

    return { id, created_at }; // Returns the game id
};

// Gets the list of all games that are joinable
const GAMES_LIST_SQL = `SELECT * FROM games WHERE joinable=true;`;
const listGames = async (user_id: number) => db.any(GAMES_LIST_SQL, [user_id]);

export default { create, listGames };