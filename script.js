const addButton = document.querySelector(".add-button");
const notesSection = document.querySelector(".notes-section");
const dots = document.querySelectorAll(".dot");
const dotContainer = document.querySelector(".dot-container");
const addButtonIcon = addButton.querySelector("i");

let noteCounter = 1;

dotContainer.style.display = "none";

// create note
function createNote(backgroundColor) {
  // remove no-notes text
  let noNotesText = notesSection.querySelector("p");
  if (noNotesText) {
    noNotesText.remove();
  }

  // apply grid
  if (!notesSection.classList.contains("has-notes")) {
    notesSection.classList.add("has-notes");
  }

  // new note
  const newNote = document.createElement("div");
  newNote.classList.add("note");
  newNote.style.backgroundColor = backgroundColor;
  newNote.contentEditable = "true";
  newNote.textContent = "This is a demo note.";

  // add note
  notesSection.appendChild(newNote);
}

// dot container
addButton.addEventListener("click", () => {
  if (
    dotContainer.style.display === "none" ||
    dotContainer.style.display === ""
  ) {
    // dot drop
    dotContainer.style.display = "flex";
    dotContainer.style.animation = "dotsFall 0.6s ease-out forwards";

    addButtonIcon.classList.remove("fa-plus");
    addButtonIcon.classList.add("fa-xmark");
    addButton.classList.add("x-rotate");
  } else {
    // dot rise
    dotContainer.style.animation = "dotsRise 0.6s ease-out forwards";

    setTimeout(() => {
      dotContainer.style.display = "none";
    }, 600);

    addButtonIcon.classList.remove("fa-xmark");
    addButtonIcon.classList.add("fa-plus");
    addButton.classList.remove("x-rotate");
  }
});

// get color
dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const dotColor = window.getComputedStyle(dot).backgroundColor;
    createNote(dotColor);
  });
});

// reset
const resetButton = document.querySelector(".buttons button.reset");
if (resetButton) {
  resetButton.addEventListener("click", () => {
    notesSection.innerHTML = "";
    notesSection.classList.remove("has-notes");

    // add no-notes text
    const noNotesText = document.createElement("p");
    noNotesText.textContent =
      "No notes available right now. Click on the '+' button to add one.";
    notesSection.appendChild(noNotesText);

    // reset counter
    noteCounter = 1;
  });
}

// search box
const searchBox = document.querySelector(".search-bar input");
searchBox.addEventListener("input", () => {
  const searchText = searchBox.value.toLowerCase();
  const notes = document.querySelectorAll(".note");

  notes.forEach((note) => {
    const noteText = note.textContent.toLowerCase();
    if (noteText.includes(searchText)) {
      note.style.display = "flex";
    } else {
      note.style.display = "none";
    }
  });
});
