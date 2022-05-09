function renderRoomList(
  socket: any,
  rooms: string[],
  div: any,
  joinedRoom: any
) {
  div.innerHTML = "";
  let chatListUl = document.createElement("ul");
  chatListUl.id = "chatListUl";
  chatListUl.innerHTML = "";

  let roomContainer = document.getElementById("roomContainer");
  roomContainer?.append(chatListUl);

  let roomH3 = document.createElement("h3");
  roomH3.id = "roomH3";
  roomH3.innerText = "NoRooms";
  div.append(roomH3);
  console.log("Roomlistan");
  if (rooms.length >= 1) {
    roomH3.innerText = "Join a room";
    let roomListUL = document.createElement("ul");
    roomListUL.id = "roomListUL";
    div.append(roomListUL);
    console.log("finns rum");
    let container = document.getElementById("container");
    container?.prepend(div);

    for (let room of rooms) {
      let chatLink = document.createElement("li");
      chatLink.id = "chatLink";
      chatLink.innerHTML = `${room}`;
      chatLink.addEventListener("click", () => {
        socket.emit("leave", joinedRoom);
        socket.emit("join", room);
      });
      let roomLink = document.createElement("li");
      roomLink.id = "roomLink";
      roomLink.innerHTML = `${room}`;
      roomLink.addEventListener("click", () => {
        socket.emit("join", room);
      });

      document.getElementById("chatListUl")?.append(chatLink);
      document.getElementById("roomListUL")?.append(roomLink);
    }

    let orText = document.createElement("h3");
    orText;
  }
  console.log(rooms);
}

export default renderRoomList;
