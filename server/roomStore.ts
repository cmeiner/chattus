import { Server } from "socket.io";

// Här kan ni spara chat- & rumhistorik

export function getRooms(io: Server) {
  const rooms = [];
  // console.log(io.sockets.adapter.rooms)
  for (let [id, socket] of io.sockets.adapter.rooms) {
    if (!socket.has(id)) {
      if (socket.size > 0) {
        rooms.push(id);
        console.log(rooms);
      }
    }
  }
  return rooms;
}
