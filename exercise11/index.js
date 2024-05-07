function handleFormSubmit(event) {
  event.preventDefault();
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");

  let uDetails = {
    username: username.value,
    email: email.value,
    phone: phone.value,
  };

  localStorage.setItem("User Details", JSON.stringify(uDetails));
}
