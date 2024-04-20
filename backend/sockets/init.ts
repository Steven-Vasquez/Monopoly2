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
      //console.log(socket.id + " is joining room: " + game_id);
      socket.join(game_id);


      //console.log("All socket rooms connected:");
      //console.log(io.sockets.adapter.rooms);
    });


    /**************  Voice chat rooms **************/
    socket.on("joinVoice", (game_id: string) => {
      const roomName = "voiceChat:" + game_id;
      try{
        //console.log("User " + socket.id + " is joining socket room: " + roomName);
        socket.join(roomName); // ex: voiceChat:1
      } catch (error) {
        //console.log("Error joining room: " + roomName);
        //console.log(error);
      }
      //console.log("User " + socket.id + " is joining voice chat room: " + game_id);

      // Broadcast to voice chat room that a user has joined
      io.to("voiceChat:" + game_id).emit("userJoinedVoiceChat", socket.id);
    });
  
    // A test function to see if users are still connected to the same socket room
    socket.on("test", (game_id: string) => {
      //console.log("test emitting to room: " + game_id);
      //console.log(io.sockets.adapter.rooms.get("voiceChat:" + game_id));
      //console.log("All socket rooms connected:");
      //console.log(io.sockets.adapter.rooms);
      io.to("voiceChat:"+ game_id).emit("testReceived", "success");
    });

    // When a user joins, send an offer to all other connected clients
    socket.on("newParticipant", (id: number, offer: RTCSessionDescriptionInit, game_id: string) => {
      //console.log("a new participant is joining");
      //console.log("id: " + id);
      //console.log("offer: ");
      //console.log(offer);
      //console.log("game_id: " + game_id);
      // Broadcast the new participant information to all connected clients
      
      const roomName = "voiceChat:" + game_id;
      io.to(roomName).emit("offer", {
        from: id,
        offer: offer,
      });
    });

    socket.on("sendingAnswer", (to: number, from: number, answer: RTCSessionDescription, game_id: string) => {
      const roomName = "voiceChat:" + game_id;
      //console.log("Sending answer to: " + to);
      //console.log("From: " + from);
      //console.log("Answer: ");
      //console.log(answer);
      //console.log("game_id: " + game_id);
      // Broadcast the answer to all connected clients
      io.to(roomName).emit("answer", {
        to: to,
        from: from,
        answer: answer,
      });
    });
    

    socket.on("leaveVoice", (game_id: string) => {
      //console.log("User " + socket.id + " is leaving voice chat room: " + game_id);
      socket.leave("voiceChat:" + game_id); // ex: voiceChat:1

      // Broadcast to voice chat room that a user has left
      io.to("voiceChat:" + game_id).emit("userLeftVoiceChat", socket.id);
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
