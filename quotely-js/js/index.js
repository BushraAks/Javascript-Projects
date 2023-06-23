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
const appendCards = (img, content, writer) => {
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
    cards.appendChild(card);
}

//? A bit shorter (one linear)
quotes.forEach(quote => appendCards(quote.img, quote.content, quote.writer))

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
    console.log('submit');
    const imgFile = document.querySelector('#img-file').value;
    console.log(imgFile);
    const writer = document.querySelector('#writer').value;
    const content = document.querySelector('#content').value;
    quotes.push(new Quote(imgFile, writer, content));

    appendCards(imgFile, content, writer)
    addQuoteForm.style.visibility = 'hidden';
});


/*
storing images just by using JS in client-side it's not possible.
you have to use a server-side technology like: nodeJS, django or php.

-----------------------------

butt there's still solution: u can store it inside localStorage! What do you think?
let's try why not? even for me it's new, dealing with images and storing on client-side;

-----------------------------

the only solution without backend and localStorage is: u need to download images and store them
in 'images' folder, then instead choosing file you need to enter the path of image that's all. 

For example: 
    image: "images/img20.jpg"
    wirter: "Someone"
    Quote: "BlaBla"
*/

