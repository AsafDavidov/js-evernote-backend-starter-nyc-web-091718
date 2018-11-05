const notesDiv = document.getElementById('notes-preview');
const fullNotesDiv = document.getElementById('notes-full')
const noteForm = document.getElementById('new-note-form')
allNotes = []
function gotFetchToWork(){
  fetch("http://localhost:3000/api/v1/notes")
  .then((response)=>response.json())
  .then((json)=>{
    Array.from(json).forEach((note) => {
      notesDiv.innerHTML += objToPage(note)
      allNotes.push(note);
    });
  });
  notesDiv.addEventListener('click',(event) => extendPreview(event.target))
}

function objToPage(note){
  return `<div id = "${note.id}" class = "note-container"> <h1> ${note.title}</h1> <p>${note.body.split("\\n").join("<br>").slice(0,50)}...</p></div>`
}

function extendPreview(paragraph){
  if (!!paragraph){
    const clickObj = allNotes.find((elem)=>elem.id == paragraph.parentElement.id);
    fullNotesDiv.innerHTML = `<h1>${clickObj.title}</h1><p>${clickObj.body.split("\\n").join("<br>")}</p>`
  }
}

noteForm.addEventListener('submit',(event)=>{
  event.preventDefault()
  let newTitle = document.getElementById('new-note-title')
  let newBody = document.getElementById('new-note-body')
  let data = {title: newTitle.value, body: newBody.value, user: {id: 1, name: "asafdavidov"} }
  fetch("http://localhost:3000/api/v1/notes", {
    method: "POST",
    headers: {
            "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(data)
  })
  .then((response)=>response.json())
  .then((json)=>{
    allNotes.push(json)
    notesDiv.innerHTML += objToPage(json)
  })
});

gotFetchToWork()
