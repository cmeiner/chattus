import renderRoomPage from "./renderRoomPage"

function renderMessagePage(socket : any, joinedRoom : string, nickname : string) {
    document.body.innerHTML = ""
  
    let roomContainer = document.createElement("div")
    roomContainer.id = "roomContainer"
  
    let leaveButton = document.createElement("button")
    leaveButton.id = "leaveButton"
    leaveButton.innerHTML = "Lämna rum"
    leaveButton.addEventListener("click", () => {
      socket.emit("leave", joinedRoom)
      renderRoomPage(socket)
    })
  
    let chatListUl = document.createElement('ul')
    chatListUl.id = "chatListUl"
    roomContainer.append(chatListUl)
    
    let chatContainer = document.createElement("div")
    chatContainer.id = "chatContainer"
  
    let chatList = document.createElement("ul")
    chatList.id = "messages"
  
    let chatInput = document.createElement("input")
    chatInput.autocomplete = "off"
    chatInput.id = "input"
  
    let chatForm = document.createElement("form")
    chatForm.id = "form"
    chatForm.addEventListener("submit", (event) => {
      event.preventDefault()
      if(chatInput.value.length) {
        socket.emit("message", chatInput.value, joinedRoom)
        chatForm.reset()
      } else {
        console.log("Du får inte skicka tomma meddelanden!");
      }
    })
    chatForm.addEventListener("keyup", (event) => {
      console.log('hej')
      socket.emit("typing", `${nickname}` )

    })
  
    let sendButton = document.createElement("button")
    sendButton.innerText = "Skicka"
  
    roomContainer.append(leaveButton)
    chatForm.append(chatInput, sendButton)
    chatContainer.append(chatForm, chatList)
    document.body.append(roomContainer, chatContainer, )
  }

  export default renderMessagePage