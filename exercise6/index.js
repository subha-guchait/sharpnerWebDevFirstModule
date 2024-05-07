const fruit = document.querySelectorAll(".fruit");

fruit.forEach((frut) => {
  const editBtn = document.createElement("button");
  //const editBtnTxt = document.createTextNode("Edit");
  //editBtn.appendChild(editBtnTxt);
  editBtn.textContent = "Edit";
  frut.appendChild(editBtn);
  editBtn.className = "edit-btn";
});

const form = document.querySelector("form");
const fruits = document.querySelector(".fruits");
//const addBtn = document.getElementById("add-btn");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  //select the input element
  const fruitToAdd = document.getElementById("fruit-to-add");

  //create li
  const newLi = document.createElement("li");
  newLi.className = "fruit";
  newLi.innerHTML =
    fruitToAdd.value +
    '<button class = "delete-btn">x</button> <button class = "edit-btn">Edit</button>';

  //adding li as the last element of unordered list
  fruits.appendChild(newLi);
});

//delete
fruits.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-btn")) {
    fruits.removeChild(event.target.parentElement);
    //console.log(event.target.parentElement);
  }
});
