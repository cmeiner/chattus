function renderRoomPage(socket: any) {
  document.body.innerHTML = "";

  let container = document.createElement("div");
  container.classList.add("inputRoomContainer");
  container.id = "container";

  // let roomListUL = document.createElement('ul')
  // roomListUL.id = 'roomListUL'

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
      console.log("Ogiltigt namn på rum...");
      return;
    }
    socket.emit("join", room);
  });

  container.append(roomInputHeader, roomForm);
  roomForm.append(roomInput, roomInputButton);
  document.body.append(container);
}

export default renderRoomPage;
