function renderRoomPage(socket : any) {
    document.body.innerHTML = ""
    
    let container = document.createElement("div")
    container.classList.add("inputNameContainer")
    container.id = 'container'
  
    let roomListUL = document.createElement('ul')
    roomListUL.id = 'roomListUL'
    
    let roomInputHeader = document.createElement("h3")
    roomInputHeader.innerText = "Ange ditt rum"
  
    let roomForm = document.createElement('form')
    roomForm.id = 'roomForm'
  
    let roomInput = document.createElement("input")
  
    let roomInputButton = document.createElement("button")
    roomInputButton.innerText = "Gå med"
    roomForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const room = roomInput.value
      if(!room.length) {
        console.log("Ogiltigt namn på rum...")
        return
      }
      socket.emit("join", room) 
    })

    container.append(roomListUL, roomInputHeader, roomForm)
    roomForm.append(roomInput, roomInputButton)
    document.body.append(container)
  }

  export default renderRoomPage