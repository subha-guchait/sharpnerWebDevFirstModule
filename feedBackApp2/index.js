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

async function addFeedback(event) {
  event.preventDefault();
  const feedback = {
    name: nameInput.value,
    rating: ratingInput.value,
  };

  try {
    const response = await axios.post(
      "https://crudcrud.com/api/3a6f1b3ab6af4eeab35b9c5501781ce4/feedbackData",
      feedback
    );
    displayRating(response.data);
    ratingCount();
  } catch (error) {
    console.log(error);
  }
  nameInput.value = "";
  ratingInput.value = "";
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axios.get(
      "https://crudcrud.com/api/3a6f1b3ab6af4eeab35b9c5501781ce4/feedbackData"
    );

    for (let i = 0; i < response.data.length; i++) {
      displayRating(response.data[i]);
    }

    ratingCount();
  } catch (error) {
    console.log(error);
  }
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

  async function deleteFeedbackFromApi(feedbackId) {
    try {
      await axios.delete(
        `https://crudcrud.com/api/3a6f1b3ab6af4eeab35b9c5501781ce4/feedbackData/${feedbackId}`
      );
      ratingCount();
    } catch (err) {
      console.log(err);
    }
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
      "https://crudcrud.com/api/3a6f1b3ab6af4eeab35b9c5501781ce4/feedbackData"
    )
    .then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        //console.log(response.data[i].rating);
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
