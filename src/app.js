// Editing Student Record logic
function editStudent(event){
    // creating variables for hidden block and its id
    const hiddenBlock=event.target.parentNode.parentNode;
    const originalHiddenBlock=hiddenBlock.cloneNode(true);
    const id=hiddenBlock.querySelector('.id').innerHTML.trim();

    // creating two arrays and iterating them for creating input elements for editing
    const oldElementNames=["name", "id", "email", "contact"];
    const oldElementTypes=["text", "number", "email", "number"];
    for(let i=0; i<4; i++){
        const oldElement=hiddenBlock.querySelector(`.${oldElementNames[i]}`);
        const inputElement=document.createElement('input');
        inputElement.className='editInput';
        inputElement.type=`.${oldElementTypes[i]}`;
        inputElement.placeholder='Enter New Value';
        const oldValue=oldElement.textContent.trim();
        if (oldValue=="Not Given") {
            inputElement.value="";    
        }
        else{
            inputElement.value=oldValue;
        }
        inputElement.setAttribute('name', `${oldElementNames[i]}`);
        inputElement.setAttribute('required', `${oldElementNames[i]}`!='email');
        oldElement.replaceWith(inputElement);
        if(i===0){
            inputElement.focus();
        }
    }

    // modifying options block
    const optionsBlock=hiddenBlock.querySelector('.options');
    optionsBlock.classList.remove('col-start-5', 'col-span-6');
    optionsBlock.classList.add('col-span-10');
    optionsBlock.innerHTML=`<button class="submitButton saveButton">
    Save
    </button>
    <button class="submitButton cancelButton">
        Cancel
    </button>`
    optionsBlock.querySelector('.saveButton').addEventListener('click', save);
    optionsBlock.querySelector('.cancelButton').addEventListener('click', () => location.reload());
    hiddenBlock.parentNode.querySelector('.toggleButton').addEventListener('click', () => location.reload());
    function save(event){
        event.preventDefault();
        const formData=Object.fromEntries(event.target.parentNode.parentNode.querySelectorAll('input').values().toArray().map((input)=> [input.name,  input.value]));
        console.log(hiddenBlock);
        formData.createdAt=Date.now();
        if(id==formData.id){
            validateAndAdd(formData, 'noRemove');
        }
        else if(localStorage.getItem(formData.id)===null){
            validateAndAdd(formData, id);
        }
        else{
            alert("ERROR : Given Student Id already exists enter new one");
        }
    }
}

// logic for deleting student
function deleteStudent(event){
    const id=event.target.parentNode.parentNode.parentNode.id;
    console.log(id.substring(2));
    localStorage.removeItem(id.substring(2));
    location.reload();
}

// logic for hiding and showing details
function toggleDetails(event){
    event.target.classList.toggle('rotate-[180deg]');
    const id=event.target.parentNode.parentNode.id;
    const hiddenBlock=document.querySelector(`#${id}>.hiddenBlock`);
    hiddenBlock.classList.toggle('grid');
    hiddenBlock.classList.toggle('animate-show');
}

// logic for displaying students when created.
function displayStudents(){
    const display=document.getElementById("display");
    const students=[];
    for(let i of Object.values(localStorage)){
        students.push(JSON.parse(i));
    }
    students.sort((a,b)=>b.createdAt-a.createdAt);
    if(students.length===0){
        const emptyDisplay=`<img src="/public/images/emptyIcon.png" alt="emptyIcon" class="opacity-20 h-[75%]">
                <p class="md:scrollbar-none text-2xl font-bold text-gray-400">No Data Available. Please Register Above</p>`;
        display.innerHTML+=emptyDisplay;
        return;
    }
    students.forEach((student) => {
        const studentRow=`<article id=id${student.id} class="studentBlock">
                    <div class="visibleBlock">
                        <p>${student.name}</p>
                        <button class="toggleButton">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down pointer-events-none">
                                <polyline points="6 9 12 15 18 9" class="pointer-events-none"></polyline>
                              </svg>                          
                        </button>
                    </div>
                    <div class="hiddenBlock">
                        <p class="md:scrollbar-none col-span-3 text-start flex items-center overflow-hidden text-blue-800 font-bold font-poppins">
                            Name
                        </p>
                        <p class="md:scrollbar-none col-span-1 text-start flex items-center overflow-hidden font-mono text-gray-700">
                            :
                        </p>
                        <p class="md:scrollbar-none col-span-6 text-start flex whitespace-nowrap items-center overflow-x-scroll font-mono text-gray-700 name">
                            ${student.name}
                        </p>
                        <p class="md:scrollbar-none col-span-3 text-start flex items-center overflow-hidden text-blue-800 font-bold font-poppins">
                            Id
                        </p>
                        <p class="md:scrollbar-none col-span-1 text-start flex items-center overflow-hidden font-mono text-gray-700">
                            :
                        </p>
                        <p class="md:scrollbar-none col-span-6 text-start flex whitespace-nowrap items-center overflow-x-scroll font-mono text-gray-700 id">
                            ${student.id}
                        </p>
                        <p class="md:scrollbar-none col-span-3 text-start flex items-center overflow-hidden text-blue-800 font-bold font-poppins">
                            Email
                        </p>
                        <p class="md:scrollbar-none col-span-1 text-start flex items-center overflow-hidden font-mono text-gray-700">
                            :
                        </p>
                        <p class="md:scrollbar-none col-span-6 text-start flex whitespace-nowrap items-center overflow-x-scroll font-mono text-gray-700 email">
                            ${student.email}
                        </p>
                        <p class="md:scrollbar-none col-span-3 text-start flex items-center overflow-hidden text-blue-800 font-bold font-poppins">
                            Contact
                        </p>
                        <p class="md:scrollbar-none col-span-1 text-start flex items-center overflow-hidden font-mono text-gray-700">
                            :
                        </p>
                        <p class="md:scrollbar-none col-span-6 text-start flex whitespace-nowrap items-center overflow-x-scroll font-mono text-gray-700 contact">
                            ${student.contact}
                        </p>
                        <div class="col-start-5 col-span-6 row-span-4 flex justify-around items-center options">
                            <img src="/public/images/editIcon.png" alt="editIcon" class="h-[80%] rounded-full shadow-xl cursor-pointer editIcon">
                            <img src="/public/images/deleteIcon.png" alt="deleteIcon" class="h-[80%] rounded-full shadow-xl cursor-pointer deleteIcon">
                        </div>
                    </div>
                </article>`
            display.innerHTML+=studentRow;
        }
    );
}

// logic for validating input details
function validateAndAdd(formData, type='submit'){
    const errorMessages=[];
    if(/^[a-z A-Z\s]{3,}$/.test(formData.name)===false){
        errorMessages.push("INVALID STUDENT NAME : Name should contain only alphabets with at least 3 characters");
    }
    if(formData.id.length<=0 || formData.id==0){
        errorMessages.push("INVALID ID : Id cannot be empty or 0.");
    }
    if(formData.contact.length!=10){
        errorMessages.push("INVALID CONTACT NUMBER : Contact number must have 10 digits");
    }
    if(formData.email==""){
        formData.email="Not Given";
    }
    if(errorMessages.length!=0){
        alert(
            errorMessages.join('\n\n')
        );
        errorMessages.splice(0, errorMessages.length);
    }
    else{
        if(type=='submit'){
            if(formData.id in localStorage){
                alert(`ERROR : Given Student Id ${formData.id} already exists`);
            }
            else{
                localStorage.setItem(formData.id, JSON.stringify(formData));
                location.reload();
            }
        }
        else{
            if(type!='noRemove'){
                localStorage.removeItem(type);
            }
            localStorage.setItem(formData.id, JSON.stringify(formData));
            location.reload();
        }
    }
}

// logic for handling submit event
function submitEvent(event){
    event.preventDefault();
    const formData=Object.fromEntries(document.querySelectorAll(".formElement>input").values().toArray().map((input)=> [input.name, input.value]));
    formData["createdAt"]=Date.now();
    validateAndAdd(formData);
}
// Displaying Students
displayStudents();

// Handling Form Submit Event
let form=document.getElementById("form");
form.addEventListener("submit", submitEvent);

// Handling Toggle Button Events
const toggleButtons=document.querySelectorAll('.toggleButton');
toggleButtons.forEach((toggleButton) => {
    toggleButton.addEventListener('click', toggleDetails);
});

// Handling Delete Button Events
const deleteButtons=document.querySelectorAll('.deleteIcon');
deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener('click', deleteStudent);
});

// Handling Edit Button Events
const editButtons=document.querySelectorAll('.editIcon');
editButtons.forEach((editButton) => {
    editButton.addEventListener('click', editStudent);
});


