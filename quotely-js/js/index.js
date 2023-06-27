import { imgs, writers, contents } from "./quote-details.js";
import Quote from "./quote.js";

const 
    addQuoteButton = document.querySelector('.add-quote'),
    quoteForm = document.querySelector('.add-quote-form'),
    hideTabForm = document.querySelector('.fa-x'),
    submitBtn = document.querySelector('#submit-btn'),
    cards = document.querySelector('.cards'),
    body = document.querySelector('body'),
    modes = document.querySelector('.modes'),
    imgFile = document.querySelector('#img'),  // image input
    content = document.querySelector('#content'),  // content input 
    writer = document.querySelector('#writer'); // writer input



//! Adding quote to card and appending cards to website
const appendCards = ({img, content, writer}) => {
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


//-------- Storing and appending all default quotes to the webpage

const defaultQuotes = [] // default quotes array
for (let i = 0; i < contents.length; i++) {
    defaultQuotes[i] = new Quote(imgs[i], writers[i], contents[i])
}
defaultQuotes.forEach(appendCards);

//-------- End of default quotes


//! Array to store all quotes
const quotes = JSON.parse(localStorage.getItem('quotes')) || [];


//! Creating new quotes and adding to array
const addQuote = (img, content, writer) => {
    const newQuote = new Quote(img, content, writer);
    quotes.push(newQuote);
    localStorage.setItem('quotes', JSON.stringify(quotes));

    return {img, content, writer};
}

// displaying cards
quotes.forEach(appendCards)


//! Open quote Form
addQuoteButton.addEventListener('click', () => {
    quoteForm.style.visibility = 'visible';
})


//!Close quote Form
hideTabForm.addEventListener('click', () => {
    quoteForm.style.visibility = 'hidden'
})



//! adding listener for add button
submitBtn.addEventListener('click', () => {
    // this is an incorect way of storing images
    const file = imgFile.files[0];
    const imgName = file.name;

    const newQuote = addQuote(
        imgName,
        content.value, 
        writer.value);

    appendCards(newQuote);

    imgFile.value = '';
    content.value = '';
    writer.value = '';

    quoteForm.style.visibility = 'hidden';

});


//! when submiting form
quoteForm.addEventListener('submit', (event) => {
    event.preventDefault();
})



modes.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList[0] == 'light-mode'){
        body.classList.remove('dark-mode');
        body.classList.remove('night-mode');
        body.classList.add('light-mode');
    }
    else if (target.classList[0] == 'night-mode'){
        body.classList.remove('light-mode');
        body.classList.remove('dark-mode');
        body.classList.add('night-mode');
    }
    else if (target.classList[0] == 'dark-mode'){
        body.classList.remove('night-mode');
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
    }
})

