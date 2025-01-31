function deleteStudent(event){
    const id=event.target.parentNode.parentNode.parentNode.id;
    console.log(id.substring(2));
    localStorage.removeItem(id.substring(2));
    location.reload();
}
function toggleDetails(event){
    event.target.classList.toggle('rotate-[180deg]');
    const id=event.target.parentNode.parentNode.id;
    const hiddenBlock=document.querySelector(`#${id}>.hiddenBlock`);
    hiddenBlock.classList.toggle('grid');
    hiddenBlock.classList.toggle('animate-show');
}
function displayStudents(){
    const display=document.getElementById("display");
    const students=[];
    for(let i of Object.keys(localStorage)){
        students.unshift(JSON.parse(localStorage.getItem(i)));
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
                        <p class="col-span-2 text-start flex items-center overflow-hidden text-blue-800 font-bold font-poppins">
                            Name
                        </p>
                        <p class="col-span-1 text-start flex items-center overflow-hidden font-mono text-gray-700">
                            :
                        </p>
                        <p class="col-span-5 text-start flex items-center overflow-scroll font-mono text-gray-700">
                            ${student.name}
                        </p>
                        <p class="col-span-2 text-start flex items-center overflow-hidden text-blue-800 font-bold font-poppins">
                            Id
                        </p>
                        <p class="col-span-1 text-start flex items-center overflow-hidden font-mono text-gray-700">
                            :
                        </p>
                        <p class="col-span-5 text-start flex items-center overflow-scroll font-mono text-gray-700">
                            ${student.id}
                        </p>
                        <p class="col-span-2 text-start flex items-center overflow-hidden text-blue-800 font-bold font-poppins">
                            Email
                        </p>
                        <p class="col-span-1 text-start flex items-center overflow-hidden font-mono text-gray-700">
                            :
                        </p>
                        <p class="col-span-5 text-start flex items-center overflow-scroll font-mono text-gray-700">
                            ${student.email}
                        </p>
                        <p class="col-span-2 text-start flex items-center overflow-hidden text-blue-800 font-bold font-poppins">
                            Contact
                        </p>
                        <p class="col-span-1 text-start flex items-center overflow-hidden font-mono text-gray-700">
                            :
                        </p>
                        <p class="col-span-5 text-start flex items-center overflow-scroll font-mono text-gray-700">
                            ${student.contact}
                        </p>
                        <div class="col-start-5 col-span-4 row-span-4 flex justify-around items-center">
                            <img src="/public/images/editIcon.png" alt="homeIcon" class="h-[80%] rounded-full shadow-xl homeIcon">
                            <img src="/public/images/deleteIcon.png" alt="deleteIcon" class="h-[80%] rounded-full shadow-xl deleteIcon">
                        </div>
                    </div>
                </article>`
            display.innerHTML+=studentRow;
        }
    );

}
function validateAndAdd(formData){
    const errorMessages=[];
    if(/^[a-z A-Z\s]{3,}$/.test(formData.name)===false){
        errorMessages.push("INVALID STUDENT NAME : Name should contain only alphabets with at least 3 characters");
    }
    if(formData.contact.length!=10){
        errorMessages.push("INVALID CONTACT NUMBER : Contact number must have 10 digits");
    }
    if(errorMessages.length!=0){
        alert(
            errorMessages.join('\n\n')
        );
        errorMessages.splice(0, errorMessages.length);
    }
    else{
        if(formData.id in localStorage){
            alert(`ERROR : Given Student Id ${formData.id} already exists`);
        }
        else{
            localStorage.setItem(formData.id, JSON.stringify(formData));
            alert("Student Added Successfully");
            document.getElementById("form").reset();
            location.reload();
        }
    }
}
function submitEvent(event){
    event.preventDefault();
    const formData=Object.fromEntries(document.querySelectorAll(".formElement>input").values().toArray().map((input)=> [input.name, input.value]));
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

// Handling Delete Botton Events
const deleteButtons=document.querySelectorAll('.deleteIcon');
deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener('click', deleteStudent);
});



