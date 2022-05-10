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
  if (err.message == "Invalid nickname") {
    console.log("Du angav ett ogiltigt användarnamn, var god försök igen...");
  }
});

socket.on("_error", (errorMessage) => {
  console.log(errorMessage);
});

let roomListDiv = document.createElement("div");
roomListDiv.id = "roomListDiv";

socket.on("roomList", (rooms) => {
  chatRooms = rooms;
  console.log(rooms);
  renderLargeRoomList(socket, rooms);
});

socket.on("joined", (room) => {
  console.log("Joined room: ", room);
  joinedRoom = room;
  renderMessagePage(socket, joinedRoom, nickname);
  renderSmallRoomList(socket, chatRooms, roomListDiv, joinedRoom);
});

socket.on("message", (message, from) => {
  console.log(message, from.nickname);

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
  console.log(`Connected as user: ${userName}.`);
  nickname = userName;
  renderRoomPage(socket, chatRooms);
});
