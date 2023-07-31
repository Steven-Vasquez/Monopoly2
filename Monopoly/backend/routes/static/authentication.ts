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

/*
// Sign up route
app.get("/register", (_req: any, response: any) => {
  response.render("register", { title: "Monopoly | Register" });
});
*/

// Creating a new user and encrypting their password
app.post("/register", async (request: any, response: any) => {
  console.log("Registration request received."); // Add this log statement

  const { username, email, password } = request.body;

  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(password, salt);

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

/*
// Login route
app.get("/login", (_req: any, response: any) => {
  response.render("login", { title: "Monopoly | Register" });
});
*/

// Checking to see if provided username and password are valid
app.post("/login", async (request: any, response: any) => {
  const { email, password } = request.body;

  try {
    const { id, username, password: hash } = await Users.findByEmail(email);
    const isValidUser = await bcrypt.compare(password, hash.trim());

    if (isValidUser) {
      console.log("User is valid");
      request.session.user = {
        id,
        username,
        email,
      };
      
      response.json({ message: "Login successful", success: true });
    } else {
      throw "User did not provide valid credentials";
    }
  } catch (error) {
    console.log({ error });
    response.status(400).json({ error: "An error occurred during registration." });

  }
});

// Logout route
app.get("/logout", (request: any, response: any) => {
  request.session.destroy((error: any) => {
    if (error) {
      console.error(error);
      response.status(500).json({ success: false, error: "Failed to logout" });
    } else {
      response.json({ success: true, message: "Logout successful" });
    }
  });
});


app.get("/checkLogin", (req: any, res: any) => {
  if (req.session.user) { // There is a user session active
    console.log("User passed login check");
    res.send({ loggedIn: true, user: req.session.user });
  } else { // There is no user session active
    console.log("User failed login check");
    res.send({ loggedIn: false });
  }
});


  export default app;