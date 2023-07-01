import { imgs, writers, contents } from "./quote-details.js";
import { setMode, show, hide } from './utils.js';
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
        <div class="img-menu">
            <img src="${img}" alt="Image">
            <div id="menu-icon"><i class="fa-solid fa-ellipsis-vertical"></i></div>
            <ul class="dropdown">
                <li class="li-light-mode"><i class="fa-solid fa-trash"></i> Delete</li>
                <li class="li-light-mode"><i class="fa-solid fa-pen"></i> Edit</li>
            </ul>
        </div>
        <div>
            <p class="content">"${content}"</p>
            <h5 class="writer" id="writer-txt">${writer} ~</h5>
        </div>
        `
    cards.insertAdjacentElement('afterbegin', card);
}

//! Storing and appending all default quotes to the webpage
const defaultQuotes = [] 
for (let i = 0; i < contents.length; i++) {
    defaultQuotes[i] = new Quote(imgs[i], contents[i], writers[i])
} 
defaultQuotes.forEach(appendCards);


//! Array to store all quotes
const quotes = JSON.parse(localStorage.getItem('quotes')) || [];

//! displaying cards from localStorage, in case if we have;
quotes.forEach(appendCards);

//! Creating new quotes and adding to localStorage then creating new Card by calling appendCards();
const addQuote = (img, content, writer) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
        const newQuote = new Quote(reader.result, content, writer);
        quotes.push(newQuote);
        localStorage.setItem('quotes', JSON.stringify(quotes));

        appendCards(newQuote);
    }, false);

    reader.readAsDataURL(img);
}

const menuHover = () => {
    const menus = document.querySelectorAll('#menu-icon');
    const dropdowns = document.querySelectorAll('.dropdown');

    for (let i = 0; i < menus.length; i++){
        menus[i].addEventListener('mouseover', () => {
            show(dropdowns[i]);
        })
        dropdowns[i].addEventListener('mouseover', () => {
            show(dropdowns[i])
        })
        menus[i].addEventListener('mouseout', () => {
            hide(dropdowns[i]);
        })
        dropdowns[i].addEventListener('mouseout', () => {
            hide(dropdowns[i])
        })
    }
}

//! Add from input to localStorage;
submitForm.addEventListener('submit', (event) => {
    event.preventDefault();

    addQuote(imgFile.files[0], content.value, writer.value);
    menuHover();

    submitForm.reset(); // this function will clear all input fields 
    hide(quoteForm);
});

export const writersTxt = document.querySelectorAll('#writer-txt');


modes.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('light-mode')) {
        setMode('light-mode');
    } else if (target.classList.contains('night-mode')) {
        setMode('night-mode');
    } else if (target.classList.contains('dark-mode')) {
        setMode('dark-mode');
    }
});

//! Open quote Form
addQuoteButton.addEventListener('click', () => show(quoteForm))

//! Close quote Form
hideTabBtn.addEventListener('click', () => hide(quoteForm))

menuHover();

export const lis = document.querySelectorAll('li');

