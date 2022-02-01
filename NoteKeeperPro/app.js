"use strict";

let inputTitle = document.querySelector(".inputTitle");
let inputText = document.querySelector(".inputText");
let addNote = document.querySelector(".addNote");
let content = document.querySelector(".content");
let toggleAside = document.querySelector(".toggle-aside");
let aside = document.querySelector(".aside");
let header = document.querySelector(".header");
let inputBox = document.querySelector(".input-box");
let editNotes = document.querySelector(".edit-notes");
let edit = document.querySelector(".edit");

let notes = [
    {
        title: "Example Note",
        text: "You can create and delete your own notes now!",
    },
];

const refreshContent = () => {
    console.log(notes);
    content.innerHTML = "";
    notes.forEach(note => {
        const noteCard = document.createElement("li");
        noteCard.classList.add("note");
        noteCard.innerHTML = `<h2>${note.title}</h2>
        <p>${note.text}</p>
        <img src="./img/minus.png" alt="" class="removeNote icon" />`;
        content.appendChild(noteCard);
    });
    const removes = document.querySelectorAll(".removeNote");
    removes.forEach(remove => {
        remove.addEventListener("click", event => {
            console.log(
                event.currentTarget.parentElement.children[0].textContent
            );
            notes = notes.filter(note => {
                return (
                    note.title !==
                    event.currentTarget.parentElement.children[0].textContent
                );
            });
            refreshContent();
        });
    });
};

const buildEditPage = item => {
    inputBox.classList.add("hidden");
    content.classList.add("hidden");
    edit.classList.remove("hidden");
    edit.innerHTML = `<input
                type="text"
                name=""
                class="inputTitle input"
                id=""
                value="${item.title}"
            />

            <textarea
                class="inputText input"
                name=""
                id=""
                cols="30"
                rows="10"
                value=""
            ></textarea>
            <div>
            <button class="btn btn-save">Save</button>
            <button class="btn btn-reset">Reset</button>
            </div>
    `;
    document.querySelector(".inputText").textContent = item.text;
    document.querySelector(".btn-save").addEventListener("click", event => {
        item.title = document.querySelector(".inputTitle").value;
        item.text = document.querySelector(".inputText").value;
        console.log({ item });
        console.log(notes);
        renderMainPage();
    });
    document.querySelector(".btn-reset").addEventListener("click", event => {
        document.querySelector(".inputTitle").value = item.title;
        document.querySelector(".inputText").value = item.text;
    });
};

const renderMainPage = () => {
    document.body.innerHTML = `        <header class="header">
            <img src="./img/Hamburger.png" class="icon toggle-aside" alt="" />
            <h1>NoteK33per Pro</h1>
        </header>
        <aside class="aside hidden">
            <h4>Menu</h4>
            <ul class="edit-notes"></ul>
        </aside>
        <div class="edit hidden"></div>
        <div class="input-box">
            <input
                type="text"
                name=""
                class="inputTitle input"
                id=""
                placeholder="Title..."
            />

            <textarea
                class="inputText input"
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="Text..."
            ></textarea>
            <img src="./img/plus.png" alt="" class="addNote icon" />
        </div>
        <ul class="content"></ul>
        <script src="app.js"></script>`;
    refreshVariables();
    refreshContent();
};

const refreshVariables = () => {
    inputTitle = document.querySelector(".inputTitle");
    inputText = document.querySelector(".inputText");
    addNote = document.querySelector(".addNote");
    content = document.querySelector(".content");
    toggleAside = document.querySelector(".toggle-aside");
    aside = document.querySelector(".aside");
    header = document.querySelector(".header");
    inputBox = document.querySelector(".input-box");
    editNotes = document.querySelector(".edit-notes");
    edit = document.querySelector(".edit");
    addNote.addEventListener("click", event => {
        if (inputTitle.value !== "") {
            notes.push({
                title: inputTitle.value,
                text: inputText.value,
            });
            inputTitle.value = "";
            inputText.value = "";
            refreshContent();
        }
    });
    toggleAside.addEventListener("click", () => {
        editNotes.innerHTML = "";
        aside.classList.toggle("hidden");
        if (!aside.classList.contains("hidden")) {
            content.style.marginLeft = "300px";
            header.style.marginLeft = "300px";
            inputBox.style.transform = "translate(150px)";
            let notesN = document.querySelectorAll(".note");
            notesN.forEach(note => {
                const noteCard = document.createElement("li");
                noteCard.innerHTML = `${note.firstChild.textContent}`;
                editNotes.appendChild(noteCard);
                noteCard.addEventListener("click", event => {
                    let search = event.currentTarget.textContent;
                    notes.forEach(note => {
                        if (note.title === search) {
                            buildEditPage(note);
                        }
                    });
                });
            });
        } else {
            content.style.marginLeft = "initial";
            header.style.marginLeft = "initial";
            inputBox.style.transform = "translate(0)";
        }
    });
};

refreshVariables();
refreshContent();
