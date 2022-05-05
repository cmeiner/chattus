import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "../../types";
import renderMessagePage from "./render/renderMessagePage";
import renderRoomPage from "./render/renderRoomPage";
import renderStartPage from "./render/renderStartPage";
import "./style.css";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io({"autoConnect": false});

let nickname: string;
let joinedRoom: string;

window.addEventListener("load", () => {
  renderStartPage(socket)
})


socket.on("connect_error", (err) => {
  if(err.message == "Invalid nickname") {
    console.log("Du angav ett ogiltigt användarnamn, var god försök igen...")
  }
})

socket.on("_error", (errorMessage) => {
  console.log(errorMessage)
})

socket.on("roomList", (rooms) => { 

  if (rooms.length >= 1) {
    let container = document.getElementById('container')
    let roomListDivHeader = document.createElement("h3")
  roomListDivHeader.innerText = "Gå med i befintligt rum"
  container?.prepend(roomListDivHeader)

  for (let room of rooms) {
    let roomLink = document.createElement('li')
    roomLink.id = "roomLink"
    roomLink.innerHTML = `${room}`
    roomLink.addEventListener("click", () => {
      socket.emit("join", room)
    })
    document.getElementById('chatListUl')?.append(roomLink)
    document.getElementById('roomListUL')?.append(roomLink)
    }
    
  }
  console.log(rooms)
})

socket.on("joined", (room) => {
  console.log("Joined room: ", room)
  joinedRoom = room
  renderMessagePage(socket, joinedRoom)
})

socket.on("message", (message, from) => {
  console.log(message, from.nickname)

  const chatItem = document.createElement("li")
  chatItem.textContent = from.nickname + ": " + message

  const messageList = document.getElementById("messages")

  if(messageList) {
    messageList.append(chatItem)
  }

  window.scrollTo(0, document.body.scrollHeight)
})

socket.on("connected", (nickname) => {
  console.log("Connected: ", nickname)
  nickname = nickname
  renderRoomPage(socket)
})

// socket.on("connect", () => {
//   console.log("Inbyggd event för connect (här skickas ingen data med)")
// })


// socket.on("disconnect", (reason, description) => {
//   console.log("Inbyggd event för disconnect (här skickas anledning och beskrivning med)")
// })