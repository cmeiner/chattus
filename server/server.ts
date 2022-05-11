import { Server, Socket } from "socket.io";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerSocketData,
  ServerToClientEvents,
} from "../types";
import registerChatHandler from "./chatHandler";
import { getRooms } from "./roomStore";

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  ServerSocketData
>();

io.use((socket: Socket, next) => {
  const nickname: string = socket.handshake.auth.nickname;
  if (!nickname || nickname.length < 2) {
    return next(new Error("Invalid nickname"));
  }
  socket.data.nickname = nickname;
  next();
});

io.on("connection", (socket) => {
  if (socket.data.nickname) {
    socket.emit("roomList", getRooms(io));
    socket.emit("connected", socket.data.nickname);
  }

  registerChatHandler(io, socket);
});

io.of("/").adapter.on("create-room", (room) => {
  io.emit("roomList", getRooms(io));
});
io.of("/").adapter.on("delete-room", (room) => {
  io.emit("roomList", getRooms(io));
});

io.listen(4001);
