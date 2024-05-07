const ul = document.querySelector("ul");
const form = document.querySelector("form");

function handleFormSubmit(event) {
  event.preventDefault();

  const username = event.target.username.value;
  const email = event.target.email.value;
  const phone = event.target.phone.value;

  let uDetails = {
    username: username,
    email: email,
    phone: phone,
  };

  localStorage.setItem(email, JSON.stringify(uDetails));

  const li = document.createElement("li");
  li.innerHTML = `${
    username + " " + email + " " + phone
  } <button class='delete-btn'>X</button> <button class='edit-btn' class="btn btn-primary" >Edit</button>`;
  ul.appendChild(li);
  const body = document.querySelector("body");
  body.appendChild(ul);
  form.reset();
}

ul.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-btn")) {
    //console.log(event.target.parentElement.textContent);
    localStorage.removeItem(
      event.target.parentElement.textContent.split(" ")[1]
    );
    ul.removeChild(event.target.parentElement);
    //console.log(event.target.parentElement.textContent);
  } else if (event.target.classList.contains("edit-btn")) {
    localStorage.removeItem(
      event.target.parentElement.textContent.split(" ")[1]
    );
    ul.removeChild(event.target.parentElement);

    form.username.value = event.target.parentElement.textContent.split(" ")[0];
    form.email.value = event.target.parentElement.textContent.split(" ")[1];
    form.phone.value = event.target.parentElement.textContent.split(" ")[2];
  }
});
