import { imgs, writers, contents } from "./quote-details.js";
import Quote from "./quote.js";


// constants
const addQuoteButton = document.querySelector('.add-quote'),
    addQuoteForm = document.querySelector('.add-quote-form'),
    hideTabForm = document.querySelector('.fa-x'),
    submitBtn = document.querySelector('#submit-btn'),
    cards = document.querySelector('.cards'),
    lightMode = document.querySelector('.light-mode'),
    nightMode = document.querySelector('.night-mode'),
    darkMode = document.querySelector('.dark-mode'),
    body = document.querySelector('body'),
    mode = document.querySelectorAll('.mode')


// modes (light, night, dark)
lightMode.addEventListener('click', ()=>{
    body.classList.remove('dark-mode');
    body.classList.remove('night-mode');
    body.classList.add('light-mode');
})

nightMode.addEventListener('click', ()=>{
    body.classList.remove('light-mode');
    body.classList.remove('dark-mode');
    body.classList.add('night-mode');
})

darkMode.addEventListener('click', ()=>{
    body.classList.remove('night-mode');
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
})


//! Array to store all quotes
const quotes = [];


//! Adding quote to card
const appendCards = (img, content, writer, order) => {
    const card = document.createElement('div');

    card.classList.add('card');
    card.classList.add('glassmorphism');

    card.innerHTML =
        `
        <img src="${img}" alt="Image">
        <div>
            <p class="content">"${content}"</p>
            <h5 class="writer">${writer} ~</h5>
        </div>
        `
    if (order == 'asc') {cards.appendChild(card);}
    else if (order == 'desc') {cards.insertAdjacentElement('afterbegin', card);}    
}


//! Adding quotes to the array from the img, writers and contents arrays in quote-details
// + function for displaying cards

function displayCards() {
    // the for loop is in this function temporarily
    for (let i = 0; i < contents.length; i++) {
        quotes[i] = new Quote(imgs[i], writers[i], contents[i])
    }
    quotes.forEach(quote => appendCards(quote.img, quote.content, quote.writer, 'asc'))
}

displayCards()


//! Open quote Form
addQuoteButton.addEventListener('click', () => {
    addQuoteForm.style.visibility = 'visible';
})


//!Close quote Form
hideTabForm.addEventListener('click', () => {
    addQuoteForm.style.visibility = 'hidden'
})


//! adding listener for add button
submitBtn.addEventListener('click', () => {
    const imgFile = document.querySelector('#img-file');  // image input
    const writer = document.querySelector('#writer');  // writer input 
    const content = document.querySelector('#content'); // content input
    // storeInLocalStorage(imgFile, writer, content)
    storeInLocalStorage(imgFile, writer, content);
    addQuoteForm.style.visibility = 'hidden'; // Hide the form after submitting 
});


// local storeage for single image file
function storeInLocalStorage(img, writer, content){
    const reader = new FileReader()  // we use this FileReader instance to convert the file to a data url

    reader.addEventListener('load', ()=>{
        localStorage.setItem('uploaded-image', reader.result);//'uploaded-image':key, reader.result:image data url
    })

    reader.readAsDataURL(img.files[0])
    const recentImageDataUrl = localStorage.getItem('uploaded-image')

    quotes.push(new Quote(recentImageDataUrl, writer.value, content.value)); 
    appendCards(recentImageDataUrl, content.value, writer.value, 'desc');
}