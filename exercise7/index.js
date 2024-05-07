// Add input element inside form, before button, to take fruit description
const form = document.querySelector("form");
const input = document.createElement("input");
input.id = "description";
input.type = "text";
const addBtn = document.getElementById("add-btn");
form.insertBefore(input, form.lastElementChild);

const filter = document.getElementById("filter");

filter.addEventListener("keyup", function (event) {
  //console.log(event.target.value);
  const textEntered = event.target.value.toLowerCase();
  const fruitItems = document.getElementsByClassName("fruit");
  for (let i = 0; i < fruitItems.length; i++) {
    const currentFruitText = fruitItems[i].firstChild.textContent.toLowerCase();
    if (currentFruitText.indexOf(textEntered) === -1) {
      fruitItems[i].style.display = "none";
    } else {
      fruitItems[i].style.display = "flex";
    }
  }
});
