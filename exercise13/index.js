const ul = document.querySelector("ul");

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
  } <button value='email' class='delete-btn'>X</button>`;
  ul.appendChild(li);
  const body = document.querySelector("body");
  body.appendChild(ul);
}

ul.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-btn")) {
    //console.log(event.target.parentElement.textContent);
    localStorage.removeItem(
      event.target.parentElement.textContent.split(" ")[1]
    );
    ul.removeChild(event.target.parentElement);
    //console.log(event.target.parentElement.textContent);
  }
});
