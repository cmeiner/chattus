import renderLargeRoomList from "./renderLargeRoomList";

function renderRoomPage(socket: any, rooms: string[]) {
  document.body.innerHTML = "";

  let container = document.createElement("div");
  container.id = "container";

  let errorMessage = document.createElement("h4");
  errorMessage.id = "errorMessage";
  errorMessage.innerText = " ";

  let roomInputHeader = document.createElement("h3");
  roomInputHeader.id = "roomInputHeader";
  roomInputHeader.innerText = "Create new room";

  let roomForm = document.createElement("form");
  roomForm.id = "roomForm";

  let roomInput = document.createElement("input");
  roomInput.id = "nameInput";
  roomInput.autocomplete = "off";

  let roomInputButton = document.createElement("button");
  roomInputButton.id = "nameInputButton";
  roomInputButton.innerText = "Enter";
  roomForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const room = roomInput.value;
    if (!room.length) {
      errorMessage.innerHTML = "Please enter a room name!";
      setTimeout(() => {
        errorMessage.innerHTML = " ";
      }, 2000);
      return;
    }
    socket.emit("join", room);
  });

  container.append(roomInputHeader, roomForm);
  roomForm.append(roomInput, errorMessage, roomInputButton);
  document.body.append(container);
  renderLargeRoomList(socket, rooms);
}

export default renderRoomPage;
