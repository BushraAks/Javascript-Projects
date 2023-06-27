import { imgs, writers, contents } from "./quote-details.js";
import { setMode, show as showForm, hide as hideForm } from './utils.js';
import Quote from "./quote.js";


const addQuoteButton = document.querySelector('.add-quote'),
    quoteForm = document.querySelector('.add-quote-form'),
    hideTabBtn = document.querySelector('.fa-x'),
    submitForm = document.querySelector('.add-quote-form > form'),
    cards = document.querySelector('.cards'),
    modes = document.querySelector('.modes'),
    imgFile = document.querySelector('#img'),
    content = document.querySelector('#content'),
    writer = document.querySelector('#writer');


//! Adding quote to card and appending cards to website
const appendCards = ({ img, content, writer }) => {
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
    cards.insertAdjacentElement('afterbegin', card);
}


//! Storing and appending all default quotes to the webpage
const defaultQuotes = [] // default quotes array
for (let i = 0; i < contents.length; i++) {
    defaultQuotes[i] = new Quote(imgs[i], writers[i], contents[i])
}
defaultQuotes.forEach(appendCards);


//! Array to store all quotes
const quotes = JSON.parse(localStorage.getItem('quotes')) || [];

//! displaying cards from localStorage, in case if we have;
quotes.forEach(appendCards);

//! Creating new quotes and adding to localStorage then creating new Card by calling appendCards();
const addQuote = (img, content, writer) => {
    //? first need to convert image to base64 then store it in localStorage;
    const reader = new FileReader();

    reader.addEventListener('load', () => {
        const newQuote = new Quote(reader.result, content, writer);
        quotes.push(newQuote);
        localStorage.setItem('quotes', JSON.stringify(quotes));

        appendCards(newQuote);
    }, false);

    reader.readAsDataURL(img);
}

//! Add from input to localStorage;
submitForm.addEventListener('submit', (event) => {
    event.preventDefault();

    addQuote(imgFile.files[0], content.value, writer.value);

    submitForm.reset(); // this function will clear all input fields (better than blabla.value = '' for each input)
    hideForm(quoteForm, 'hidden');
});


//? dont forget about DRY
modes.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('light-mode')) {
        setMode('light-mode')
    } else if (target.classList.contains('night-mode')) {
        setMode('night-mode')
    } else if (target.classList.contains('dark-mode')) {
        setMode('dark-mode')
    }
});

//! Open quote Form
addQuoteButton.addEventListener('click', () => showForm(quoteForm, 'visible'))

//! Close quote Form
hideTabBtn.addEventListener('click', () => hideForm(quoteForm, 'hidden'))

