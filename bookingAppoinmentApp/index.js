function handleFormSubmit(event) {
  event.preventDefault();
  const userDetails = {
    username: event.target.username.value,
    email: event.target.email.value,
    phone: event.target.phone.value,
  };
  axios
    .post("http://localhost:3000/users", userDetails)
    .then((response) => {
      //console.log(response.data);
      displayUserOnScreen(response.data);
    })
    .catch((error) => console.log(error));

  // Clearing the input fields
  document.getElementById("username").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/users")
    .then((response) => {
      //console.log(response);
      for (let i = 0; i < response.data.length; i++) {
        displayUserOnScreen(response.data[i]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

function displayUserOnScreen(userDetails) {
  const userItem = document.createElement("li");
  userItem.setAttribute("id", userDetails.id);
  userItem.appendChild(
    document.createTextNode(
      `${userDetails.username} - ${userDetails.email} - ${userDetails.phone}`
    )
  );

  const deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("Delete"));
  userItem.appendChild(deleteBtn);

  const editBtn = document.createElement("button");
  editBtn.appendChild(document.createTextNode("Edit"));
  userItem.appendChild(editBtn);

  const userList = document.querySelector("ul");
  userList.appendChild(userItem);

  deleteBtn.addEventListener("click", async function (event) {
    try {
      const userId = event.target.parentElement.id;
      await deleteUserFromApi(userId);
      userList.removeChild(event.target.parentElement);
    } catch (err) {
      console.log(err);
    }
  });

  editBtn.addEventListener("click", function (event) {
    const userId = event.target.parentElement.id;
    deleteUserFromApi(userId);
    userList.removeChild(event.target.parentElement);

    document.getElementById("username").value = userDetails.username;
    document.getElementById("email").value = userDetails.email;
    document.getElementById("phone").value = userDetails.phone;
  });

  function deleteUserFromApi(userId) {
    return axios.delete(`http://localhost:3000/users/${userId}`);
  }
}
