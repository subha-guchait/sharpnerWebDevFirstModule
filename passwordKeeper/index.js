function handleFormSubmit(event) {
  event.preventDefault();
  const userDetails = {
    Title: event.target.Title.value,
    Password: event.target.Password.value,
  };
  axios
    .post(
      "https://crudcrud.com/api/cc091b29e5e243c2a63f47a236ddc0c1/newPassword",
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
      "https://crudcrud.com/api/cc091b29e5e243c2a63f47a236ddc0c1/newPassword"
    )
    .then((response) => {
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
    document.createTextNode(`${userDetails.Title} - ${userDetails.Password}`)
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
    countPass();
  });

  editBtn.addEventListener("click", function (event) {
    deleteUserFromApi(userDetails);
    userList.removeChild(event.target.parentElement);
    countPass();
    document.getElementById("Title").value = userDetails.Title;
    document.getElementById("Password").value = userDetails.Password;
  });
}
// search
const search = document.getElementById("Search");
const title = document.querySelectorAll("li");

search.addEventListener("keyup", function (event) {
  //   console.log("a");

  const textEntered = search.value.toLowerCase();
  //   console.log(textEntered);
  console.log(title);
  for (let i = 0; i < title.length; i++) {
    const currentTitleText = title[i].textContent.toLowerCase();
    // console.log(currentTitleText);
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
      `https://crudcrud.com/api/cc091b29e5e243c2a63f47a236ddc0c1/newPassword/${userDetails._id}`
    )
    .then((response) => {
      console.log("sucessfully deleted");
    })
    .catch((err) => {
      console.log(err);
    });
}

function countPass() {
  let passCount = document.getElementById("countPassword");
  axios
    .get(
      "https://crudcrud.com/api/cc091b29e5e243c2a63f47a236ddc0c1/newPassword"
    )
    .then((response) => {
      passCount.textContent = response.data.length;
    })
    .catch((err) => {
      console.log(err);
    });
}
