const form = document.querySelector("form");
const nameInput = document.getElementById("name");
const ratingInput = document.getElementById("rating");
const ratingList = document.querySelector("ul");
const oneStar = document.getElementById("oneStar");
const twoStar = document.getElementById("twoStar");
const threeStar = document.getElementById("threeStar");
const fourStar = document.getElementById("fourStar");
const fiveStar = document.getElementById("fiveStar");

form.addEventListener("submit", addFeedback);

function addFeedback(event) {
  event.preventDefault();
  const feedback = {
    name: nameInput.value,
    rating: ratingInput.value,
  };

  axios
    .post(
      "https://crudcrud.com/api/1c7e5f7dd6c749f5a22fc00483f98b40/feedbackData",
      feedback
    )
    .then((response) => {
      //console.log(response.data);
      displayRating(response.data);
      ratingCount();
    })
    .catch((error) => console.log(error));

  nameInput.value = "";
  ratingInput.value = "";
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(
      "https://crudcrud.com/api/1c7e5f7dd6c749f5a22fc00483f98b40/feedbackData"
    )
    .then((response) => {
      //console.log(response);
      for (let i = 0; i < response.data.length; i++) {
        displayRating(response.data[i]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  ratingCount();
});

function displayRating(feedback) {
  const li = document.createElement("li");
  li.setAttribute("id", feedback._id);
  li.innerHTML = `${feedback.name + " " + feedback.rating}`;

  const deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("Delete"));
  li.appendChild(deleteBtn);

  const editBtn = document.createElement("button");
  editBtn.appendChild(document.createTextNode("Edit"));
  li.appendChild(editBtn);

  ratingList.appendChild(li);

  //delete function
  deleteBtn.addEventListener("click", function (event) {
    const feedbackId = event.target.parentElement.id;
    deleteFeedbackFromApi(feedbackId);

    ratingList.removeChild(event.target.parentElement);
  });

  //edit function
  editBtn.addEventListener("click", function (event) {
    const feedbackId = event.target.parentElement.id;
    deleteFeedbackFromApi(feedbackId);
    ratingList.removeChild(event.target.parentElement);

    nameInput.value = feedback.name;
    ratingInput.value = feedback.rating;
  });

  function deleteFeedbackFromApi(feedbackId) {
    axios
      .delete(
        `https://crudcrud.com/api/1c7e5f7dd6c749f5a22fc00483f98b40/feedbackData/${feedbackId}`
      )
      .then((response) => {
        ratingCount();
        console.log("sucess");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function ratingCount() {
  let countFiveStar = 0;
  let countFourStar = 0;
  let countThreeStar = 0;
  let countTwoStar = 0;
  let countOneStar = 0;
  axios
    .get(
      "https://crudcrud.com/api/1c7e5f7dd6c749f5a22fc00483f98b40/feedbackData"
    )
    .then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        console.log(response.data[i].rating);
        if (response.data[i].rating == 5) {
          countFiveStar++;
        } else if (response.data[i].rating == 4) {
          countFourStar++;
        } else if (response.data[i].rating == 3) {
          countThreeStar++;
        } else if (response.data[i].rating == 2) {
          countTwoStar++;
        } else if (response.data[i].rating == 1) {
          countOneStar++;
        }
      }
      oneStar.textContent = countOneStar;
      twoStar.textContent = countTwoStar;
      threeStar.textContent = countThreeStar;
      fourStar.textContent = countFourStar;
      fiveStar.textContent = countFiveStar;
    });
}

// new Promise((resolve, reject) => {
//   resolve("");
// });

console.log(a);
let a = 10;
