const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes;

function showNotes() {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
        notesContainer.innerHTML = savedNotes;
    }
}

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

function addEventListenersToNotes() {
    notes = document.querySelectorAll(".input-box");
    notes.forEach(nt => {
        nt.addEventListener("keyup", () => {
            updateStorage();
        });
    });
}

// Initial setup
showNotes();
addEventListenersToNotes();

createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "images/delete.png";
    notesContainer.appendChild(inputBox).appendChild(img);
    addEventListenersToNotes();
});

notesContainer.addEventListener("click", (e) => {
    if (e.target && e.target.tagName === 'IMG') {
        e.target.parentElement.remove();
        updateStorage();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});
