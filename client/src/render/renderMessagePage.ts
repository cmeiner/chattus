import type { IOSocket } from "../main";
import renderRoomPage from "./renderRoomPage";
import renderSmallRoomList from "./renderSmallRoomList";

function renderMessagePage(
  socket: IOSocket,
  joinedRoom: string,
  user: string,
  rooms: string[]
) {
  document.body.innerHTML = "";

  let roomContainer = document.createElement("div");
  roomContainer.id = "roomContainer";

  let wizcordLogo = document.createElement("div");
  wizcordLogo.id = "wizcordLogo";
  wizcordLogo.innerText = "Wizcord 🧙‍♂️";

  let roomNameHeader = document.createElement("h3");
  roomNameHeader.id = "roomNameHeader";
  roomNameHeader.innerText = `Talking in ${joinedRoom}!`;

  let leaveButton = document.createElement("button");
  leaveButton.id = "leaveButton";
  leaveButton.innerHTML = "Leave room";
  leaveButton.addEventListener("click", () => {
    socket.emit("leave", joinedRoom);
    renderRoomPage(socket, rooms);
  });

  let chatContainer = document.createElement("div");
  chatContainer.id = "chatContainer";

  let chatList = document.createElement("ul");
  chatList.id = "messages";

  let chatInput = document.createElement("input");
  chatInput.autocomplete = "off";
  chatInput.id = "input";

  let chatForm = document.createElement("form");
  chatForm.id = "form";
  chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (chatInput.value.length) {
      socket.emit("message", chatInput.value, joinedRoom);
      chatForm.reset();
      chatList.scrollTop = chatList.scrollHeight;
    }
  });

  chatForm.addEventListener("keydown", () => {
    socket.emit("isTyping", user, joinedRoom);
  });

  let timer: any;

  chatForm.addEventListener("keyup", () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      socket.emit("isNotTyping", joinedRoom);
    }, 500);
  });

  chatForm.addEventListener("submit", () => {
    socket.emit("isNotTyping", joinedRoom);
  });

  let userIsTypingDiv = document.createElement("div");
  userIsTypingDiv.id = "userIsTypingDiv";
  chatForm.append(userIsTypingDiv);

  socket.on("isTyping", (nickname, room) => {
    userIsTypingDiv.innerText = `${nickname} is typing...`;
  });

  socket.on("isNotTyping", () => {
    userIsTypingDiv.innerText = "";
  });

  let sendButton = document.createElement("button");
  sendButton.innerText = "Send";

  roomContainer.prepend(wizcordLogo, leaveButton);
  chatForm.append(chatInput, sendButton);
  chatContainer.append(roomNameHeader, chatForm, chatList);
  document.body.append(roomContainer, chatContainer);
  renderSmallRoomList(socket, rooms, joinedRoom);
}

export default renderMessagePage;
