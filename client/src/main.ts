import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "../../types";
import "./css/messagePage.css";
import "./css/roomPage.css";
import "./css/startPage.css";
import "./css/style.css";
import renderMessagePage from "./render/renderMessagePage";
import renderSmallRoomList from "./render/renderSmallRoomList";
import renderLargeRoomList from "./render/renderLargeRoomList";
import renderRoomPage from "./render/renderRoomPage";
import renderStartPage from "./render/renderStartPage";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io({
  autoConnect: false,
});

export type IOSocket = typeof socket;

let nickname: string;
let joinedRoom: string;
let chatRooms: string[];

window.addEventListener("load", () => {
  renderStartPage(socket);
});

socket.on("connect_error", (err) => {
  let errorMessage: any = document.getElementById("errorMessage");
  if (err.message == "Invalid nickname") {
    errorMessage.innerHTML = "Username has to be atleast 2 characters";

    setTimeout(() => {
      errorMessage.innerHTML = " ";
    }, 2000);
  }
});

socket.on("_error", (errorMessage) => {
  console.log(errorMessage);
});

let roomListDiv = document.createElement("div");
roomListDiv.id = "roomListDiv";

socket.on("roomList", (rooms) => {
  chatRooms = rooms;
  renderLargeRoomList(socket, rooms);
  renderSmallRoomList(socket, rooms, joinedRoom);
});

socket.on("joined", (room) => {
  joinedRoom = room;
  renderMessagePage(socket, joinedRoom, nickname, chatRooms);
});

socket.on("message", (message, from) => {
  const chatItem = document.createElement("li");
  chatItem.textContent = from.nickname + ": " + message;

  const messageList = document.getElementById("messages");

  if (messageList) {
    messageList.append(chatItem);
  }

  window.scrollTo(0, document.body.scrollHeight);
  let chatList = document.getElementById("messages")!;

  chatList.scrollTop = chatList.scrollHeight;
});

socket.on("connected", (userName) => {
  nickname = userName;
  renderRoomPage(socket, chatRooms);
});
