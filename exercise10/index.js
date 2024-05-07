const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const uName = document.getElementById("username");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");

  localStorage.setItem("username", uName.value);
  localStorage.setItem("Email", email.value);
  localStorage.setItem("Phone", phone.value);
  //console.log(1);
});
