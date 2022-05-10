import { Server } from "socket.io";

// Här kan ni spara chat- & rumhistorik

export function getRooms(io: Server) {
  const rooms = [];
  // console.log(io.sockets.adapter.rooms)
  for (let [id, sockets] of io.sockets.adapter.rooms) {
    if (!io.sockets.sockets.has(id)) {
      rooms.push(id);
      console.log(rooms);
    }
  }
  return rooms;
}
