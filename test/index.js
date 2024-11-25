function handleFormSubmit(event) {
  event.preventDefault();
  const userDetails = {
    Title: event.target.Title.value,
    Password: event.target.Password.value,
  };
  axios
    .post(
      "https://crudcrud.com/api/fcf81cb535d84bf3bf42e1ccaf302c87/newPassword",
      userDetails
    )
    .then((response) => {
      displayUserOnScreen(response.data);
      countPass();
    })
    .catch((error) => console.log(error));

  // Clearing the input fields
  document.getElementById("Title").value = "";
  document.getElementById("Password").value = "";
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(
      "https://crudcrud.com/api/fcf81cb535d84bf3bf42e1ccaf302c87/newPassword"
    )
    .then((response) => {
      //countPass();
      console.log(response);
      for (let i = 0; i < response.data.length; i++) {
        displayUserOnScreen(response.data[i]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  countPass();
});

function displayUserOnScreen(userDetails) {
  const userItem = document.createElement("li");
  userItem.appendChild(
    document.createTextNode(`${userDetails.Title} - ${userDetails.Password} `)
  );

  const deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("Delete"));
  userItem.appendChild(deleteBtn);

  const editBtn = document.createElement("button");
  editBtn.appendChild(document.createTextNode("Edit"));
  userItem.appendChild(editBtn);

  const userList = document.querySelector("ul");
  userList.appendChild(userItem);

  deleteBtn.addEventListener("click", function (event) {
    deleteUserFromApi(userDetails);
    userList.removeChild(event.target.parentElement);
  });

  editBtn.addEventListener("click", function (event) {
    deleteUserFromApi(userDetails);
    userList.removeChild(event.target.parentElement);
    document.getElementById("Title").value = userDetails.Title;
    document.getElementById("Password").value = userDetails.Password;
  });
}

// search
const search = document.getElementById("Search");
const title = document.getElementsByTagName("li");
console.log(title);
search.addEventListener("keyup", function (event) {
  const textEntered = search.value.toLowerCase();
  //console.log(textEntered);
  for (let i = 0; i < title.length; i++) {
    const currentTitleText = title[i].firstChild.textContent.toLowerCase();
    //console.log(currentTitleText);
    if (currentTitleText.includes(textEntered)) {
      title[i].style.display = "flex";
    } else {
      title[i].style.display = "none";
    }
  }
});

function deleteUserFromApi(userDetails) {
  axios
    .delete(
      `https://crudcrud.com/api/fcf81cb535d84bf3bf42e1ccaf302c87/newPassword/${userDetails._id}`
    )
    .then((response) => {
      countPass();
    })
    .catch((err) => {
      console.log(err);
    });
}

function countPass() {
  let passCount = document.getElementById("countPassword");
  axios
    .get(
      "https://crudcrud.com/api/fcf81cb535d84bf3bf42e1ccaf302c87/newPassword"
    )
    .then((response) => {
      passCount.textContent = response.data.length;
    })
    .catch((err) => {
      console.log(err);
    });
}
