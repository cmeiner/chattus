import { Server } from "socket.io";

export function getRooms(io: Server) {
  const rooms = [];
  for (let [id, sockets] of io.sockets.adapter.rooms) {
    if (!io.sockets.sockets.has(id)) {
      rooms.push(id);
    }
  }
  return rooms;
}
