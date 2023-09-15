const btnEl = document.getElementById("btn");
const appEl = document.getElementById('container');

function saveNote(notes) {
    localStorage.setItem("note-app", JSON.stringify(notes));    // save the notes to the localStorage by converting them to the string 
}

function updateNote(id, content) {
    const notes = getNotes();   // get all the notes from the localStorage
    const target = notes.filter((note) => note.id==id)[0];  // take the note where we write something and [0] means we want only one note
    target.content = content;   // it changes the content of the targeted note
    saveNote(notes);    // again save the notes to the localStorage
}

function deleteNote(id, element) { 
    const notes = getNotes().filter((note) => note.id != id)    // it saves all the notes from the localStorage except the note whcih we double clicked on
    saveNote(notes) // and then save the notes in the localStorage except that note
    appEl.removeChild(element)  // removes that note from the browser
}


function createNoteEl(id, content) {
    const element = document.createElement("textarea")  // creating a textarea element
    element.classList.add("note")   // assigning a class note to it 
    element.placeholder = "Empty Note"  
    element.value = content

    element.addEventListener("dblclick", () => {    // invoke when we double click on the note element
        const warning = confirm("Do you want to delete this note?") // give you an confirm message to delete a note or not

        if(warning) {   // if you press ok it will delete the note by calling a function callled deleteNote
            deleteNote(id, element)
        }
    })

    element.addEventListener("input", () => {   // whenevr we write something in the textarea it will update it in the localStorage as well as in the browser
        updateNote(id, element.value)
    })
    return element  // return the element which we created
}

getNotes().forEach((note) => {  // print all the notes available in the locatStorage even if we refresh the page
    const noteEl = createNoteEl(note.id, note.content);
    appEl.insertBefore(noteEl, btnEl);
});

function getNotes() {
    return JSON.parse(localStorage.getItem("note-app") || "[]");    // get all the notes available in the localStorage by converting them to an object of array
}


function addNote() {
    const notes = getNotes();   // to get all the notes present in the locat storage so that we can save all the notes rather than just replacing
    const noteObj = {   // for creating a different id for each note and a empty content string
        id: Math.floor(Math.random() * 100000), // creating a different id for each note
        content: "",    // and a content
    };

    const noteEl = createNoteEl(noteObj.id, noteObj.content);   // calling the function to create a note and store it in noteEl variable
    appEl.insertBefore(noteEl, btnEl);  // this built in function insert the noteEl before the btnEl 

    notes.push(noteObj);    // push the new object in the notes array at the last
    saveNote(notes);    // save the notes again and again whenever the click event is invoked
}

btnEl.addEventListener("click", addNote);       // to perform a click operation and call a addNote function