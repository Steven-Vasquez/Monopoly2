import express from 'express';
import cors from 'cors'; // Import the cors middleware
import bcrypt from 'bcrypt';

import Users from "../../database/users.ts";

const app = express();


app.use(cors({
  origin: ["http://localhost:3000"], // Allow only the react app (the provided URL) to make requests to the API
  methods: ["GET", "POST"], // Methods we want to allow
  credentials: true, // Allow cookies to be enabled and stored in the browser
})); // Add the cors middleware to our application

// Salt rounds used to generate salt for hashing passwords
const SALT_ROUNDS = 10;


// API endpoint that checks if a user is in a game
app.get("/checkInGame/:id", (req: any, res: any) => {
  const { id: game_id } = req.params;
  const { id: user_id } = req.session.user;
  
  Users.findUserInGame(game_id, user_id)
  .then((result: any[]) => {
    if (result.length > 0) {
      // There is a match, user is in the game
      console.log("User is in the game");
      res.send({ inGame: true });
    } else {
      // No match, user is not in the game
      console.log("User is not in the game");
      res.send({ inGame: false });
    }
  })
  .catch(error => {
    console.error("Error checking user in game:", error);
  });
});


// API endpoint that checks if a user is logged in
app.get("/checkLogin", (req: any, res: any) => {
  if (req.session.user) { // There is a user session active
    res.send({ loggedIn: true, user: req.session.user });
  } else { // There is no user session active
    res.send({ loggedIn: false });
  }
});


// Creating a new user and encrypting their password
app.post("/register", async (request: any, response: any) => {
  console.log("Registration request received."); // Add this log statement

  const { username, email, password } = request.body;

  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(password, salt);


  const user = await Users.findByEmail(email);
  if (user && user.email == email) {
    response.send({ message: `Email "${email}" is already in use.` })
  }
  else if (user && user.username == username) {
    response.send({ message: `Username "${username}" is already in use.` })
  }
  try {
    const { id } = await Users.create(username, email, hash);
    
    request.session.user = {
      id,
      username,
      email,
    };

    response.json({ message: "Registration successful", success: true });
  } catch (error) {
    console.log({ error });
    response.status(400).json({ error: "An error occurred during registration." });
  }
});


// Checking to see if provided username and password are valid
app.post("/login", async (request: any, response: any) => {
  const { email, password } = request.body;

  try {
    const { id, username, password: hash } = await Users.findByEmail(email);
    const isValidUser = await bcrypt.compare(password, hash.trim());

    if (isValidUser) {
      const foundUser = { id, username, email };
      request.session.user = foundUser

      //await request.session.save(); // Save the session after setting user data
      response.send(foundUser)
    } else {
      response.send({ message: "Invalid Username/Password." })

    }
  } catch (error) {
    console.log({ error });
    response.status(400).json({ error: "An error occurred during login." });

  }
});

// Logout route
app.get("/logout", (request: any, response: any) => {
  request.session.destroy((error: any) => {
    if (error) {
      console.error(error);
      response.status(500).json({ success: false, error: "Failed to logout" });
    } else {
      response.clearCookie("sid"); // Clear the session cookie, sid is default name for session id
      response.json({ success: true, message: "Logout successful" });
    }
  });
});

export default app;