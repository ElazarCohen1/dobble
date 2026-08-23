import gameRoutes from "./routes/gameRoutes.js";
import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const app = express();

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
    },
});

app.use(cors());
app.use(express.json());

app.use("/game", gameRoutes);


io.on("connection", (socket) => {
  socket.on("joinGame", ({ gameId, playerId }) => {
    socket.join(gameId);
  });

});

app.set("io", io);

httpServer.listen(3000, () => {
    console.log("server is running on port 3000");
});