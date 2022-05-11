import { Server, Socket } from "socket.io";
import { getRooms } from "./roomStore";

export default (io: Server, socket: Socket) => {
  socket.on("join", (room) => {
    socket.emit("joined", room);
    socket.join(room);
  });

  socket.on("leave", (room) => {
    socket.leave(room);
  });

  socket.on("message", (message, to) => {
    if (!socket.data.nickname) {
      return socket.emit("_error", "Missing nickname on socket..");
    }

    io.to(to).emit("message", message, {
      id: socket.id,
      nickname: socket.data.nickname,
    });
  });

  socket.on("isTyping", (nickname, to) => {
    socket.to(to).emit("isTyping", nickname, to);
  });

  socket.on("isNotTyping", (to) => {
    socket.to(to).emit("isNotTyping", to);
  });
};
