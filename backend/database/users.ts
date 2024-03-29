import connection from "./connection.ts";

const db = connection;

// Create a new user
const create = (username: String, email: String, password: String) =>
  db.one(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id",
    [username, email, password]
  );

// Find a user by their username
const findByUsername = (username: String) =>
  db.oneOrNone("SELECT * FROM users WHERE username=$1", [username]);

// Find a user by their email address
const findByEmail = (email: String) =>
  db.oneOrNone("SELECT * FROM users WHERE email=$1", [email]);

// Find a user by their id
const getUsername = (user_id: String) =>
  db.oneOrNone("SELECT username FROM users WHERE id=$1", [user_id]);

const findUserInGame = (game_id: String, user_id: String) =>
  db.any("SELECT * FROM game_users WHERE game_id=$1 AND user_id=$2", [game_id, user_id]);

export default {
  create,
  findByUsername,
  findByEmail,
  getUsername,
  findUserInGame
};