import Student from './student.js';

const studentForm = document.querySelector('#student-form'),
      nameInput = studentForm['name'],
      ageInput = studentForm['age'],
      rollInput = studentForm['roll'],
      studentDetails = document.querySelector('.student-details'),
      studentsObjects = JSON.parse(localStorage.getItem('students')) || [];


const addStudent = (name, age, roll) => {
    studentsObjects.push(new Student(name, age, roll));

    localStorage.setItem('students', JSON.stringify(studentsObjects));

    return {name, age, roll};
}

studentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const newStudent = addStudent(
        nameInput.value,
        ageInput.value,
        rollInput.value);   
    
    appendStudentDetails(newStudent);

    nameInput.value = '';
    ageInput.value = ''
    rollInput.value = ''
});


// listener for trash icons
const addTrash = () => {
    const trashes = document.querySelectorAll('.fa-trash');
    trashes.forEach((trash, inx) => {
        trash.addEventListener('click', (event) => {
            console.log(inx + 1);
            const target = event.target;
            target.parentElement.remove();
            studentsObjects.splice(inx, 1);
            localStorage.setItem('students', JSON.stringify(studentsObjects));
        })
    })
}


// for appending the stuents details section
const appendStudentDetails = ({name, age, roll}) => {
    const studentElem = document.createElement('div');
    studentElem.classList.add('student');

    studentElem.innerHTML = 
        `
        <div class="name"><span class="info-title">Name: </span> ${name} </div>
        <div class="age"><span class="info-title">Age: </span> ${age} </div>
        <div class="roll"><span class="info-title">Roll: </span> ${roll} </div>
        <i class="fa-solid fa-trash"></i>
        `
    studentDetails.appendChild(studentElem);
    addTrash();
}


// creating html element for each student
studentsObjects.forEach(appendStudentDetails);


