import { emojis } from "./emoji.js";

const ulElement = document.querySelector('.list-items'); // ul
const addButton = document.querySelector('.add-button'); // button 
const addInput = document.querySelector('.add-input'); // input

// adding click listener for add button
addButton.addEventListener('click', () => {
    const item = addInput.value; // the value taken frominput;
    if (item == '') {
        return;
    } else {
        const li = document.createElement('li');
        li.classList.add('todo-li');
        li.innerHTML =
            `
            <h3 id="list-item">${item}</h3> 
            <i class="fa fa-trash"></i>
        `
        crossOut();
        addTrash();
        ulElement.insertAdjacentElement('afterbegin', li)
        addTrash();
        crossOut();

        addInput.value = ''; // initializing the input value to nothing
    }

})

// adding enter key listener for input
addInput.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
        addButton.click();
    }
})

// adding listeners for list items for crossing out
function crossOut() {
    const arrayElements = document.querySelectorAll('#list-item'); // [h3, h3, h3];
    console.log(arrayElements);
    arrayElements.forEach((el) => {
        el.addEventListener('click', (event) => {
            const target = event.target;

            if (target.classList.contains('cross-out')) {
                target.classList.remove('cross-out');
            } else {
                target.classList.add('cross-out');
            }
        })
    })
}


// adding listener for trash items
function addTrash() {
    const trashes = document.querySelectorAll('.fa-trash')
    trashes.forEach((el) => {
        el.addEventListener('click', (event) => {
            const target = event.target;
            target.parentElement.remove();
        })
    })
}


// emoji selector array appending
const emojiUlElement = document.querySelector('.emojis-list');
emojis.forEach((emoji) => {
    const emojisLi = document.createElement('li');
    emojisLi.innerHTML =

        `
        <h3 class='emoji-element'>${emoji}</h3> 
     `

    emojiUlElement.appendChild(emojisLi);
})

// listener for emojis
const emojiElement = document.querySelectorAll('.emoji-element');
emojiElement.forEach((emoji) => {
    emoji.addEventListener('click', (event) => {
        addInput.value += event.target.textContent;
    })
})
