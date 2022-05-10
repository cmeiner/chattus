import type { IOSocket } from "../main";
import createRoomItem from "../functions/createRoomItem";

async function renderSmallRoomList(
  socket: IOSocket,
  rooms: string[],
  div: HTMLDivElement,
  joinedRoom: string
) {
  div.innerHTML = "";
  let chatListUl = document.createElement("ul");
  chatListUl.id = "chatListUl";
  chatListUl.innerHTML = "";
  let chatRoomList = document.createElement("div");
  chatRoomList.id = "chatRoomList";

  let roomH3 = document.createElement("h3");
  roomH3.id = "roomH3";
  roomH3.innerText = "No rooms";
  div.append(roomH3);
  if (rooms.length >= 1) {
    roomH3.innerText = "Join a room";
    let roomListUL = document.createElement("ul");
    roomListUL.id = "roomListUL";
    div.append(roomListUL);
    let container = document.getElementById("container");
    container?.prepend(div);

    for (let room of rooms) {
      chatListUl.append(createRoomItem(socket, room, "chatLink", joinedRoom));
      roomListUL.append(createRoomItem(socket, room, "roomLink"));

      // setTimeout(() => {
      //   let rContainer = document.getElementById("roomContainer")!;
      //   chatRoomList.innerHTML = "";
      //   chatRoomList.append(chatLink);
      //   rContainer.append(chatRoomList);
      // }, 1000);
      // roomContainer.append(chatListUl);
    }

    let orText = document.createElement("h3");
    orText;
  } else {
    console.log("There are no rooms");
  }
  // console.log(rooms);
}

export default renderSmallRoomList;
