
const updateLSdate = () =>{
    const TextareData = document.querySelectorAll("textarea");
    const notes = [];
    console.log(TextareData);
    TextareData.forEach((note)=>{
        return notes.push(note.value);
    })
    console.log(notes);
    //send data into local storge
    localStorage.setItem("notes" , JSON.stringify(notes));
}

const AddNote = (text = '') =>{
    let backgroundText = document.getElementById('background');
    backgroundText.style.display = "none";
    const note = document.createElement('div');
    note.classList.add("note");
    const htmlData = `
        <div class="flex justify-end mx-2 mt-2">
        <div class="edit border rounded-full bg-green-600 h-7 w-7 hover:scale-[0.9] hover:cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 m-[1.5px] ml-[3px]" viewBox="0 0 20 20" fill="white">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
        </div>
        <div class="trash border rounded-full bg-red-600 h-7 w-7 hover:cursor-pointer hover:scale-[0.9]"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 m-[1.5px] ml-[3px]" viewBox="0 0 20 20" fill="white">
            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg></div>
        </div>
        <div>
            <div class = "main absolute ${text ? "" : "none"}">${text}</div>
            <textarea name="note" id="" cols="40" rows="5" class="p-2 ${text ? "none": ""}"></textarea>
        </div>
    `;
        note.insertAdjacentHTML("afterbegin" , htmlData);
        const editButton = note.querySelector(".edit");
        const delButton = note.querySelector(".trash");
        const mainDiv = note.querySelector(".main");
        const textarea = note.querySelector("textarea");


        //Delette a single note.......!1
        delButton.addEventListener("click" , ()=>{
            note.remove();
            updateLSdate();
        })

        //Toggle between classes
        editButton.addEventListener("click" , ()=>{
            mainDiv.classList.toggle("none");
            textarea.classList.toggle("none");
        })

        //sav data into local storge
        textarea.addEventListener('change' , (event)=>{
            const value = event.target.value;
            mainDiv.innerHTML = value;
            updateLSdate();
        })

        textarea.value = text;
        //It appendChild in document
        document.body.appendChild(note);
}



//Geting data from local stroge
const notes = JSON.parse(localStorage.getItem('notes'));
if (notes) {
    notes.forEach((note) => AddNote(note));
}