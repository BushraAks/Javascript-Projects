import Student from './student.js';

const nameInput = document.querySelector('#name-input'),
      ageInput = document.querySelector('#age-input'),
      rollInput = document.querySelector('#roll-input'),
      addButton = document.querySelector('#add-btn'),
      studentDetails = document.querySelector('.student-details'),
      form = document.querySelector('form');

form.addEventListener('submit', (event) => event.preventDefault());


// for appending the stuents details section
const appendStudentDetails = function(name, age, roll) {
    const studentElem = document.createElement('div');
    studentElem.classList.add('student');

    studentElem.innerHTML = 
        `
        <div class="name"><span class="info-title">Name: </span> ${name} </div>
        <div class="age"><span class="info-title">Age: </span> ${age} </div>
        <div class="roll"><span class="info-title">Roll: </span> ${roll} </div>
        <i class="fa-solid fa-trash"></i>
        `
    addTrash();
    studentDetails.appendChild(studentElem);
    addTrash();
}


// appending with data from input
addButton.addEventListener('click', () => {
    console.log('clicked');
    appendStudentDetails(nameInput.value, ageInput.value, rollInput.value);
})


// listener for trash icons
function addTrash() {
    const trashes = document.querySelectorAll('.fa-trash');
    trashes.forEach((trash) => {
        trash.addEventListener('click', (event) => {
            const target = event.target;
            target.parentElement.remove();
        })
    })
}