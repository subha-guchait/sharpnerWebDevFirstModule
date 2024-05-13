const form = document.querySelector("form");

form.addEventListener("submit", addNote);

function addNote(event) {
  event.preventDefault();
  const titleInput = document.getElementById("title-input");
  const desInput = document.getElementById("desc-input");
  const notes = {
    title: titleInput.value,
    des: desInput.value,
  };

  //displaying notes and post req on api
  axios
    .post(
      "https://crudcrud.com/api/2e621ced46654461ad886d438601c7f7/notesData",
      notes
    )
    .then((response) => {
      displayNote(response.data);
    })
    .catch((err) => {
      console.log(err);
    });

  //clear input field
  titleInput.value = "";
  desInput.value = "";
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("https://crudcrud.com/api/2e621ced46654461ad886d438601c7f7/notesData")
    .then((response) => {
      //console.log(response);
      for (let i = 0; i < response.data.length; i++) {
        displayNote(response.data[i]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

function displayNote(notes) {
  const noteItem = document.createElement("div");
  noteItem.setAttribute("id", notes._id);
  noteItem.setAttribute("class", "note-card");
  noteItem.innerHTML = `<h3>${notes.title}</h3><p>${notes.des}<p/>`;

  const deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("Delete"));
  noteItem.appendChild(deleteBtn);

  const displayNote = document.getElementById("display-notes");
  displayNote.appendChild(noteItem);

  deleteBtn.addEventListener("click", function (event) {
    const notesId = event.target.parentElement.id;
    axios
      .delete(
        `https://crudcrud.com/api/2e621ced46654461ad886d438601c7f7/notesData/${notesId}`
      )
      .then((response) => {
        console.log("suceesfully deleted");
      })
      .catch((err) => {
        console.log(err);
      });

    displayNote.removeChild(event.target.parentElement);
  });
}

const filter = document.getElementById("filter");

filter.addEventListener("keyup", function (event) {
  const textEntered = filter.value.toLowerCase();
  const notes = document.querySelectorAll(".note-card");
  let count = 0;
  notes.forEach(function (note) {
    const title = note.firstElementChild.textContent.toLowerCase();
    if (title.includes(textEntered)) {
      note.style.display = "block";
      count++;
    } else {
      note.style.display = "none";
    }
  });

  document.getElementById("showing-notes").textContent = count;
});
