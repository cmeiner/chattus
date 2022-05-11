function renderStartPage(socket: any) {
  document.body.innerHTML = "";

  let startPageContainer = document.createElement("div");
  startPageContainer.id = "startPageContainer";

  let title = document.createElement("h1");
  title.innerText = "Welcome to Wizcord! 🧙‍♂️";
  title.id = "wizcordTitle";

  let errorMessage = document.createElement("h4");
  errorMessage.id = "errorMessage";
  errorMessage.innerText = " ";

  let container = document.createElement("div");
  container.id = "inputNameContainer";

  let nameInputHeader = document.createElement("h3");
  nameInputHeader.id = "nameInputHeader";
  nameInputHeader.innerText = "Enter your nickname";

  let nameForm = document.createElement("form");
  nameForm.id = "nameForm";

  let nameInput = document.createElement("input");
  nameInput.id = "nameInput";
  nameInput.autocomplete = "off";

  let nameInputButton = document.createElement("button");
  nameInputButton.id = "nameInputButton";
  nameInputButton.innerText = "Enter";

  nameForm.addEventListener("submit", (e) => {
    e.preventDefault();
    socket.auth = { nickname: nameInput.value };
    socket.connect();
  });

  startPageContainer.append(title, container);
  container.append(nameInputHeader, nameForm);
  nameForm.append(nameInput, errorMessage, nameInputButton);
  document.body.append(startPageContainer);
}

export default renderStartPage;
