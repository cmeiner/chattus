import type { IOSocket } from "../main";
import createRoomItem from "../functions/createRoomItem";

function renderSmallRoomList(
  socket: IOSocket,
  rooms: string[],
  joinedRoom: string
) {
  let smallRoomListContainer = document.createElement("div");
  smallRoomListContainer.id = "smallRoomListContainer";

  let smallRoomList = document.createElement("ul");
  smallRoomList.id = "smallRoomList";

  for (let room of rooms) {
    let listItem = createRoomItem(
      socket,
      room,
      "roomListItem",
      rooms,
      joinedRoom
    );
    smallRoomList.append(listItem);
  }

  let roomListContainer = document.getElementById("smallRoomListContainer");

  if (roomListContainer) {
    roomListContainer.innerHTML = ``;
    roomListContainer.append(smallRoomList);
  } else {
    smallRoomListContainer.append(smallRoomList);
    let roomContainer = document.getElementById("roomContainer");
    roomContainer?.append(smallRoomListContainer);
  }
}

export default renderSmallRoomList;
