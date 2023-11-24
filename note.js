document.addEventListener("DOMContentLoaded", () => {
    const startTypeButton = document.querySelector('.creat_note_btn');
    const noteList = document.querySelector(".notes_list");

    loadItems();

    startTypeButton.addEventListener("click", () => {
        const inputBox = document.createElement("p");
        const deletImg = document.createElement("img");
        inputBox.className = "input_box";
        deletImg.className = "delet_button";
        inputBox.contentEditable = true;
        deletImg.src = "images/delete_FILL0_wght400_GRAD0_opsz24.svg";

        // Append inputBox and deletImg separately to noteList
        noteList.appendChild(inputBox);
        noteList.appendChild(deletImg);

        deletImg.addEventListener("click", () => {
            inputBox.remove(); // Remove the inputBox when deletion button is clicked
            deletImg.remove();
            saveNotes();
        });

        saveNotes();
    });

    function saveNotes() {
        const notes = noteList.innerHTML;
        localStorage.setItem("notes", notes);
    }

    function loadItems() {
        const savedNotes = localStorage.getItem("notes");
        if (savedNotes) {
            noteList.innerHTML = savedNotes;
        }
    }

    // Event delegation for handling clicks on noteList
    noteList.addEventListener("click", (e) => {
        if (e.target.className === "delet_button") {
            e.target.previousElementSibling.remove(); // Remove inputBox when deletion button is clicked
            e.target.remove(); // Remove the deletion button
            saveNotes(); // Save notes after deletion
        }
    });

    // Event listener for saving notes on input (keyup) within paragraphs
    noteList.addEventListener("input", () => {
        saveNotes();
    });
});
