import http from "http";
import { Server } from "socket.io";
import { Express } from "express";

// Create a new interface that extends the http.Server interface to include the io property to be used elsewhere (to access io in backend, for example)
interface SocketServer extends http.Server {
  io: Server;
}

const initSockets = (app: Express, sessionMiddleware: any): SocketServer => {
  const server = http.createServer(app) as SocketServer; // Cast server to SocketServer

  // Use the cors middleware to allow WebSocket connections
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",  // Change this to your frontend URL
      methods: ["GET", "POST"]
    }
  });

  io.engine.use(sessionMiddleware);

  io.on("connection", (socket) => {
    console.log("Connection", socket.id);

    /**************  Game/Lobby/Chat rooms **************/
    // When a user joins a game lobby/game room
    socket.on("join", (game_id: string) => {
      console.log(socket.id + " is joining room: " + game_id);
      socket.join(game_id);
      console.log("All socket rooms connected:");
      console.log(io.sockets.adapter.rooms);
    });


    /**************  Voice chat rooms **************/

    socket.on("joinVoiceChat", (game_id: string, data: any) => {

      socket.join("voiceChat:" + game_id); // ex: voiceChat:1

      // Cleanup when user leaves voice chat by disconnecting
      socket.on("disconnect", () => {
        socket.broadcast.to("voiceChat:" + game_id).emit("userLeftVoiceChat", socket.id);
      });

      // Send signal to other user that someone is joining voice chat
      socket.broadcast.to("voiceChat:" + game_id).emit("offer", { signal: data.signalData, from: data.from, name: data.name });

      // Send signal from users to receive the offer
      socket.on("answer", (data: any) => {
        socket.to(data.to).emit("callAccepted", data.signal);
      });
    });
    /**********************************************/

    socket.on("disconnect", () => {
      console.log("Socket disconnected: " + socket.id);
      // TODO: Handle any necessary cleanup or logic when a socket disconnects
    });

    // TODO: Add other event listeners and logic for handling real-time updates
  });


  server.io = io; // Set the io property on the server instance (because TypeScript doesn't know about the io property on the server instance)
  app.set("io", io);

  return server;
};

export default initSockets;
