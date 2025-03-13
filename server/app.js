if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
  
  const express = require("express");
  const app = express();
  
  const { createServer } = require("node:http");
  // const { Server } = require("socket.io");
  const socket = require("./socket");
  const server = createServer(app);
  
  // const io = new Server(server, {
  //   cors: {
  //     origin: "*",
  //   },
  // });
  const io = socket.init(server);
  
  const port = 3000;
  
  const cors = require("cors");
  const errorHandler = require("./middlewares/errorHandler");
  const { Controller } = require("./controllers/controller");
  const { User, Game, UserGame } = require("./models");
  
  const router = require("./routers/index");
  
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  
  app.use(router);
  
  app.use(errorHandler);
  
  // Socket.IO connection handling
  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);
  
    socket.on("joinWaitingRoom", async (gameId) => {
      socket.join(`waiting-${gameId}`);
      const players = await UserGame.findAll({
        where: { GameId: gameId },
        include: [{ model: User, attributes: ["username"] }],
      });
      io.to(`waiting-${gameId}`).emit("playerListUpdate", { players });
    });
  
    socket.on("joinGameRoom", (gameId) => {
      socket.join(`game-${gameId}`);
    });
  
    socket.on("startGame", async (gameId) => {
      try {
        const game = await Game.findByPk(gameId);
        if (game && game.status === "waiting") {
          const result = await Controller.startGame({ query: { gameId } });
          io.to(`waiting-${gameId}`).emit("gameStart", result);
        }
      } catch (error) {
        console.error("Error starting game:", error);
      }
    });
  
    socket.on("playerAction", async ({ gameId, userId, imageId }) => {
      try {
        const result = await Controller.action({
          body: { gameId, userId, imageId },
        });
        io.to(`game-${gameId}`).emit("gameStateUpdate", result);
      } catch (error) {
        console.error("Error processing player action:", error);
        socket.emit("actionError", {
          message: error.message || "Wrong match!",
        });
      }
    });
  
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
  
  server.listen(port, () => {
    console.log(`Listening to port http://localhost:${port}/`);
  });
  
  module.exports = { app, io };
  