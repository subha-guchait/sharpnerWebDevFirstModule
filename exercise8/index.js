// Add input element inside form, before button, to take fruit description
const form = document.querySelector("form");
const input = document.createElement("input");
input.id = "description";
input.type = "text";
const addBtn = document.getElementById("add-btn");
form.insertBefore(input, form.lastElementChild);
const ptag = document.querySelectorAll("p");
for (let i = 0; i < ptag.length; i++) {
  ptag[i].style.fontStyle = "italic";
}

//edit button
const fruit = document.querySelectorAll(".fruit");

fruit.forEach((frut) => {
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  frut.appendChild(editBtn);
  editBtn.className = "edit-btn";
});

const fruits = document.querySelector(".fruits");

//add function
form.addEventListener("submit", function (event) {
  event.preventDefault();
  //select the input element
  const fruitToAdd = document.getElementById("fruit-to-add");
  const descrip = document.getElementById("description");

  //create li
  const newLi = document.createElement("li");
  newLi.className = "fruit";
  newLi.innerHTML =
    fruitToAdd.value +
    `<p><em>${descrip.value}</em></p><button class = "delete-btn">x</button> <button class = "edit-btn">Edit</button>`;

  //adding li as the last element of unordered list
  fruits.appendChild(newLi);
});

//delete functionality
fruits.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-btn")) {
    fruits.removeChild(event.target.parentElement);
    //console.log(event.target.parentElement);
  }
});

//filter function
const filter = document.getElementById("filter");

const fruitItems = document.getElementsByClassName("fruit");

filter.addEventListener("keyup", function (event) {
  //console.log(event.target.value);
  const textEntered = filter.value.toLowerCase();

  for (let i = 0; i < fruitItems.length; i++) {
    const currentFruitText = fruitItems[i].firstChild.textContent.toLowerCase();
    const currentFruitDescriptionText =
      fruitItems[i].firstElementChild.textContent.toLowerCase();
    if (
      currentFruitText.indexOf(textEntered) === -1 &&
      currentFruitDescriptionText.indexOf(textEntered) === -1
    ) {
      fruitItems[i].style.display = "none";
    } else {
      fruitItems[i].style.display = "flex";
    }
  }
});
