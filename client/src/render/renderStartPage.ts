function renderStartPage(socket : any) {
    document.body.innerHTML = ""
  
    let container = document.createElement("div")
    container.classList.add("inputNameContainer")
  
    let nameInputHeader = document.createElement("h3")
    nameInputHeader.innerText = "Ange ditt namn"
  
    let nameForm = document.createElement('form')
    nameForm.id = 'nameForm'
  
    let nameInput = document.createElement("input")
  
    let nameInputButton = document.createElement("button")
    nameInputButton.innerText = "Spara"
    
    nameForm.addEventListener("submit", (e) => {
      e.preventDefault()
      socket.auth = { nickname: nameInput.value }
      socket.connect()
    })
  
    container.append(nameInputHeader, nameForm)
    nameForm.append(nameInput, nameInputButton)
    document.body.append(container)
  }

export default renderStartPage