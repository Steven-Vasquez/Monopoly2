import express from 'express';
import bcrypt from 'bcrypt';
import Users from "../../database/users.ts";

const app = express();

// Salt rounds used to generate salt for hashing passwords
const SALT_ROUNDS = 10;

// Sign up route
app.get("/register", (_req: any, response: any) => {
  response.render("register", { title: "Monopoly | Register" });
});

// Creating a new user and encrypting their password
app.post("/register", async (request: any, response: any) => {
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

    response.redirect("/home");
  } catch (error) {
    console.log({ error });

    response.render("register", {
      title: "Monopoly | Register",
      username,
      email,
    });
  }
});

// Login route
app.get("/login", (_req: any, response: any) => {
  response.render("login", { title: "Monopoly | Register" });
});

// Checking to see if provided username and password are valid
app.post("/login", async (request: any, response: any) => {
  const { email, password } = request.body;

  try {
    const { id, username, password: hash } = await Users.findByEmail(email);
    const isValidUser = await bcrypt.compare(password, hash.trim());

    // console.log("password is ()" + password + "()");
    // console.log("hash is ()" + hash + "()");
    // console.log("isValidUser is " + isValidUser);

    // console.log("id is " + id);
    // console.log("username is " + username);

    if (isValidUser) {
      console.log("User is valid");
      request.session.user = {
        id,
        username,
        email,
      };

      console.log(request.session);
      response.redirect("/home");
    } else {
      throw "User did not provide valid credentials";
    }
  } catch (error) {
    console.log({ error });
    response.render("login", {
      title: "Monopoly | Log In",
      email,
      message: "Error!",
    });
  }
});

// Logout route
app.get("/logout", (request: any, response: any) => {
  request.session.destroy((error: any) => {
    console.log({ error });
  });

  response.redirect("/");
});

export default app;