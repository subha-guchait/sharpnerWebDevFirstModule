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

  const ul = document.querySelector("ul");
  const li = document.createElement("li");
  li.innerHTML = `${username + " " + email + " " + phone}`;
  ul.appendChild(li);
  const body = document.querySelector("body");
  body.appendChild(ul);
}
