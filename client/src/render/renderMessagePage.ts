function renderMessagePage(socket : any, joinedRoom : string) {
    document.body.innerHTML = ""
  
    let roomContainer = document.createElement("div")
    roomContainer.id = "roomContainer"
  
    let leaveButton = document.createElement("button")
    leaveButton.id = "leaveButton"
    leaveButton.innerHTML = "Lämna rum"
  
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
  
    let sendButton = document.createElement("button")
    sendButton.innerText = "Skicka"
  
    roomContainer.append(leaveButton)
    chatForm.append(chatInput, sendButton)
    chatContainer.append(chatForm, chatList)
    document.body.append(roomContainer, chatContainer, )
  }

  export default renderMessagePage