import renderRoomPage from "./renderRoomPage";

function renderMessagePage(socket: any, joinedRoom: string, user: string) {
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
    renderRoomPage(socket);
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
      // window.setInterval(function () {
      chatList.scrollTop = chatList.scrollHeight;
      // }, 10);
    } else {
      console.log("Du får inte skicka tomma meddelanden!");
    }
  });

  let isTyping = false;

  chatForm.addEventListener("keydown", (event) => {
    socket.emit("typing", `${user}`);
    isTyping = true;
  });

  let userIsTypingDiv = document.createElement("div");
  userIsTypingDiv.id = "userIsTypingDiv";
  chatForm.append(userIsTypingDiv);

  chatForm.addEventListener("submit", (event) => {
    isTyping = false;
    userIsTypingDiv.innerText = "";
  });
  socket.on("typing", (nickname: string) => {
    if (nickname !== user && isTyping) {
      userIsTypingDiv.innerText = `${nickname} is typing...`;
    }

    // setTimeout(() => {
    //   userIsTypingDiv.innerText = ""
    // },1000)
    // if (isTyping) {
    //   console.log(`${nickname} skriver`);
    //   userIsTypingDiv.innerText = `${nickname} is typing`;
    //   isTyping = false;
    //   console.log(isTyping)
    // } else {
    //   console.log('hehe')
    //   userIsTypingDiv.innerHTML = ""
    // }
  });

  let sendButton = document.createElement("button");
  sendButton.innerText = "Send";

  roomContainer.prepend(wizcordLogo, leaveButton);
  chatForm.append(chatInput, sendButton);
  chatContainer.append(roomNameHeader, chatForm, chatList);
  document.body.append(roomContainer, chatContainer);
}

export default renderMessagePage;
