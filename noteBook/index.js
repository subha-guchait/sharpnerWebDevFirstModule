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
      "https://crudcrud.com/api/784679fc840e4d55b2d10b3edd079311/notesData",
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
    .get("https://crudcrud.com/api/784679fc840e4d55b2d10b3edd079311/notesData")
    .then((response) => {
      //console.log(response);
      for (let i = 0; i < response.data.length; i++) {
        displayNote(response.data[i]);
      }
      document.getElementById("showing-notes").textContent =
        response.data.length;
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
    deleteNoteFromApi(notesId);
    displayNote.removeChild(event.target.parentElement);
  });
}

function deleteNoteFromApi(notesId) {
  axios
    .delete(
      `https://crudcrud.com/api/784679fc840e4d55b2d10b3edd079311/notesData/${notesId}`
    )
    .then((response) => {
      document.getElementById("showing-notes").textContent =
        response.data.length;
    })
    .catch((err) => {
      console.log(err);
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
