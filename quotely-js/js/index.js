import { imgs, writers, contents } from "./quote-details.js";
import Quote from "./quote.js";

const addQuoteButton = document.querySelector('.add-quote'),
    addQuoteForm = document.querySelector('.add-quote-form'),
    hideTabForm = document.querySelector('.fa-x'),
    submitBtn = document.querySelector('#submit-btn'),
    cards = document.querySelector('.cards');

//! Array to store all quotes
const quotes = [];

//! Adding quotes to the array from the arrays in quote-details
for (let i = 0; i < contents.length; i++) {
    quotes[i] = new Quote(imgs[i], writers[i], contents[i])
}

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

//? A bit shorter (one linear)
quotes.forEach(quote => appendCards(quote.img, quote.content, quote.writer, 'asc'))

//! Open quote Form
addQuoteButton.addEventListener('click', () => {
    addQuoteForm.style.visibility = 'visible';
})

//!Close quote Form
hideTabForm.addEventListener('click', () => {
    addQuoteForm.style.visibility = 'hidden'
})


// add to local storage

function addImgToLocalStorage(){

}


//! adding listener for add button

submitBtn.addEventListener('click', () => {
    const imgFile = document.querySelector('#img-file');
    const writer = document.querySelector('#writer');
    const content = document.querySelector('#content');

    const reader = new FileReader()
    reader.addEventListener('load', ()=>{
        localStorage.setItem('uploaded-image', reader.result);
    })
    reader.readAsDataURL(imgFile.files[0])
    const recentImageDataUrl = localStorage.getItem('uploaded-image')

    quotes.push(new Quote(recentImageDataUrl, writer.value, content.value)); 
    appendCards(recentImageDataUrl, content.value, writer.value, 'desc');
    addQuoteForm.style.visibility = 'hidden';
    
});

