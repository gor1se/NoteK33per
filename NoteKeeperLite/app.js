"use strict";

const inputTitle = document.querySelector(".inputTitle");
const inputText = document.querySelector(".inputText");
const addNote = document.querySelector(".addNote");
const content = document.querySelector(".content");

let notes = [
    {
        title: "Example Note",
        text: "You can create and delete your own notes now!",
    },
];

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

const refreshContent = () => {
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

refreshContent();
