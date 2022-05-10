import { IOSocket } from "../main";

function createRoomItem(
  socket: IOSocket,
  room: string,
  className: string,
  joinedRoom?: string
) {
  let roomLink = document.createElement("li");
  roomLink.className = className;
  roomLink.innerHTML = `${room}`;
  roomLink.addEventListener("click", () => {
    if (joinedRoom) {
      socket.emit("leave", joinedRoom);
    }
    socket.emit("join", room);
  });

  return roomLink;
}

export default createRoomItem;
