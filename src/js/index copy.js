let submit = document.getElementById("submit");
const choice = document.getElementById("choice");
let textbox = document.querySelector(".textbox");
let listContainer = document.querySelector(".listContainer");
const p = document.getElementById("list");
let bookList = document.querySelector(".bookList");
let loader = document.getElementById("loader");
const message = document.querySelector(".message");
let overlay = document.querySelector(".overlay");

async function getBooks() {
  bookList.innerHTML = ""; // clean list

  if (choice.value !== "") loader.style.display = "block"; // loader

  // url for API

  let choiceValue = choice.value.toLowerCase();

  let url = `https://openlibrary.org/subjects/${choiceValue}.json`;
  let response = await fetch(url);
  let data = await response.json();
  console.log(data);

  // listContainer conditions

  if (choice.value && data.work_count > 0) {
    listContainer.style.display = "flex";
    textbox.style.display = "none";
    message.style.display = "none";
    let title = document.getElementById("title"); // title
    title.innerText =
      data.works.length + " books found for " + `\"${choiceValue}\"`;
  } else
    setTimeout(() => {
      choice.style.border = "3px solid red";
      loader.style.display = "none"; // if not results
    }, 1000);

  // creating elements

  function createElem(elem, name, append, text, url) {
    let element = document.createElement(elem);
    if (name) element.classList.add(name);
    if (text) element.innerText = text;
    if (append) append.appendChild(element);
    if (url) element.src = url;
    return element;
  }

  for (let i = 0; i < data.works.length; i++) {
    let singleBook = createElem("div", "singleBook", bookList);
    createElem("h2", null, singleBook, data.works[i].title);
    createElem("p", null, singleBook, data.works[i].authors[0].name);
    let bookLinkDiv = createElem("div", "bookLinkDiv", singleBook);
    let bookLink = createElem("button", "bookLink", bookLinkDiv);
    createElem("img", "bookIcon", bookLink, null, "src/img/book1.png");

    // get description

    let key = data.works[i].key;

    bookLink.addEventListener("click", async function () {
      let urlDescription = `https://openlibrary.org${key}.json`;
      let responseDescription = await fetch(urlDescription);
      let dataDescription = await responseDescription.json();
      console.log(dataDescription);

      // description conditions

      let description;
      let desDes = dataDescription.description;
      let desDesValue = dataDescription.description.value;

      if (desDesValue) description = dataDescription.description.value;
      else if (desDes) description = dataDescription.description;
      else description = "Sorry, this description is not available";

      // show overlay

      overlay.style.display = "block";

      // creating description div

      let descriptionDiv = createElem("div", "descriptionDiv", document.body);
      createElem("div", "descriptionText", descriptionDiv, description);

      descriptionDiv.style.display = "flex";

      // creating description close button

      let closeTwo = createElem("img", "closeButtonTwo", descriptionDiv);
      closeTwo.src = "src/img/remove.png";
      closeTwo.addEventListener("click", function () {
        descriptionDiv.remove();
        overlay.style.display = "none";
      });
    });
  }

  // creating listContainer close button

  let closeOne = createElem("img", "closeButtonOne", listContainer);

  closeOne.src = "src/img/remove.png";
  closeOne.addEventListener("click", function () {
    listContainer.style.display = "none";
    textbox.style.display = "flex";
    loader.style.display = "none";
    choice.style.border = "none";
    choice.value = "";
    message.style.display = "block";
    overlay.style.display = "none";

    let descriptionDiv = document.querySelector(".descriptionDiv");
    if (descriptionDiv) descriptionDiv.remove();
  });
}

// on click of submit

submit.addEventListener("click", getBooks);

// on click of enter

let input = document.getElementById("choice");

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter" && choice.value !== "") {
    submit.click();
    function showLoader() {
      setTimeout(() => {
        loader.style.display = "block";
      }, 1000);
    }
  }
});
