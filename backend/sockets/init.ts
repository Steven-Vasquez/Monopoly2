import http from "http";
import { Server } from "socket.io";
import { Express } from "express";

// Create a new interface that extends the http.Server interface to include the io property to be used elsewhere (to access io in backend, for example)
interface SocketServer extends http.Server { 
  io: Server;
}

const initSockets = (app: Express, sessionMiddleware: any): SocketServer => {
  const server = http.createServer(app) as SocketServer; // Cast server to SocketServer
  const io = new Server(server);

  io.engine.use(sessionMiddleware);

  io.on("connection", (socket) => {
    console.log("Connection");

    socket.on("join", (game_id: string) => {
      console.log(socket.id + " is joining room: " + game_id);
      socket.join(game_id);
      console.log("All socket rooms connected:");
      console.log(io.sockets.adapter.rooms);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected: " + socket.id);
      // TODO: Handle any necessary cleanup or logic when a socket disconnects
    });

    // TODO: Add other event listeners and logic for handling real-time updates
  });

  server.io = io; // Set the io property on the server instance (because TypeScript doesn't know about the io property on the server instance)

  return server;
};

export default initSockets;
