import express, { Express, Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import path from "path";
import morgan from "morgan";
import session from "express-session";
import cookieParser from "cookie-parser";
import pgSession from "connect-pg-simple";
import dotenv from "dotenv";
import cors from "cors";

import db from "./database/connection.ts";

import addSessionLocals from "./middleware/addSessionLocals.ts";
import initSockets from "./sockets/init.ts";

import authenticationRoutes from "./routes/static/authentication.ts";
import apiGamesRoutes from "./routes/api/games.ts";

dotenv.config();

const app: Express = express()
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// Configure session
const pgSessionInstance = pgSession(session);
const sessionMiddleware = session({
  store: new pgSessionInstance({ pgPromise: db }),
  secret: process.env.SECRET || "",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
});
app.use(sessionMiddleware);

// Use the initSockets function to initialize a server to listen to regular HTTP requests and socket connections
const server = initSockets(app, sessionMiddleware);


// Serve static files
app.use(express.static(path.join(import.meta.url, "backend", "frontend")));

// Add session locals
app.use(addSessionLocals);

app.use(cors({
  origin: ["http://localhost:3000"], // Allow only the react app (the provided URL) to make requests to the API
  methods: ["GET", "POST"], // Methods we want to allow
  credentials: true, // Allow cookies to be enabled and stored in the browser
}));

// Define routes
app.use(authenticationRoutes); // Authentication routes
app.use("/api/games", apiGamesRoutes); // Game routes

// Catch 404 and forward to error handler
app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(createHttpError(404));
});

// Start the server
const port = process.env.PORT || 3001

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})