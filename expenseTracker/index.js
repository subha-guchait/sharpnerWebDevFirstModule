const form = document.querySelector("form");
const ul = document.querySelector("ul");

const amount = document.getElementById("amount");
const descrip = document.getElementById("descrip");
const catagory = document.getElementById("catagory");

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  // console.log("submit clicked");

  const li = document.createElement("li");
  li.innerHTML = `${
    amount.value + "-" + descrip.value + "-" + catagory.value
  } <button class='delete-btn'>Delete</button> <button class='edit-btn'>Edit</button>`;
  ul.appendChild(li);

  const body = document.querySelector("body");
  body.appendChild(ul);
  form.reset();

  const dltBtn = document.querySelector(".delete-btn");
  dltBtn.addEventListener("click", deleteExpense);

  const edtBtn = document.querySelector(".edit-btn");
  edtBtn.addEventListener("click", editExpense);
}

function deleteExpense(event) {
  ul.removeChild(event.target.parentElement);
}

function editExpense(event) {
  ul.removeChild(event.target.parentElement);

  //console.log("edit clicked");

  amount.value = event.target.parentElement.textContent.split("-")[0];
  descrip.value = event.target.parentElement.textContent.split("-")[1];
  catagory.value = event.target.parentElement.textContent.split("-")[2];
}
