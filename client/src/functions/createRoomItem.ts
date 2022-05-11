import { IOSocket } from "../main";
import renderRoomPage from "../render/renderRoomPage";

function createRoomItem(
  socket: IOSocket,
  room: string,
  id: string,
  rooms: string[],
  joinedRoom?: string
) {
  let roomListItem = document.createElement("li");
  roomListItem.id = id;
  roomListItem.innerHTML = `${room}`;
  roomListItem.addEventListener("click", () => {
    if (joinedRoom) {
      socket.emit("leave", joinedRoom);
      renderRoomPage(socket, rooms);
    }
    socket.emit("join", room);
  });

  return roomListItem;
}

export default createRoomItem;
