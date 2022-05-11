import type { IOSocket } from "../main";
import createRoomItem from "../functions/createRoomItem";

function renderLargeRoomList(socket: IOSocket, rooms: string[]) {
  let largeRoomListContainer = document.createElement("div");
  largeRoomListContainer.id = "largeRoomListContainer";

  let joinRoomTitle = document.createElement("h3");
  joinRoomTitle.id = "joinRoomTitle";

  let largeRoomList = document.createElement("ul");
  largeRoomList.id = "largeRoomList";

  if (rooms.length >= 1) {
    joinRoomTitle.innerText = "Join an existing room";
    for (let room of rooms) {
      let listItem = createRoomItem(socket, room, "roomListItem", rooms);
      largeRoomList.append(listItem);
    }
  }

  let roomListContainer = document.getElementById("largeRoomListContainer");

  if (roomListContainer) {
    roomListContainer.innerHTML = ``;
    roomListContainer.append(largeRoomList);
  } else {
    largeRoomListContainer.append(joinRoomTitle, largeRoomList);
    let container = document.getElementById("container");
    container?.prepend(largeRoomListContainer);
  }
}

export default renderLargeRoomList;
