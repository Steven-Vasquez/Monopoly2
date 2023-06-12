import express, { Express, Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import path from "path";
import morgan from "morgan";
import session from "express-session";
import cookieParser from "cookie-parser";
import pgSession from "connect-pg-simple";
import dotenv from "dotenv";

import db from "./database/connection.ts";

import authenticationRoutes from "./routes/static/authentication.ts";

dotenv.config();

const app: Express = express()
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files
app.use(express.static(path.join(__dirname, "backend", "static")));

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

// Define routes
app.use(authenticationRoutes); // Authentication routes

// Catch 404 and forward to error handler
app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(createHttpError(404));
});

// Start the server
const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})