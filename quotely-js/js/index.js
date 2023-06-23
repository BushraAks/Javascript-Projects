import { imgs, writers, contents } from "./quote-details.js";


class Quote {
    constructor(img, writer, content){
        this.img = img;
        this.writer = writer;
        this.content = content;
    }
}

// array to store all quote objects
let quotes = [];

// adding 9 quotes to the array from the arrays in quote-details
for(let i=0; i<9; i++){
    quotes[i] = new Quote(imgs[i], writers[i], contents[i])
}


// function for adding quote to card

const cards = document.querySelector('.cards');

function appendCards(img, content, writer){
    const card = document.createElement('div');

    card.classList.add('card');
    card.classList.add('glassmorphism');

    console.log(img, writer, content);
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

quotes.forEach((quote)=>{
    appendCards(quote.img, quote.content, quote.writer);
})


const addQuoteButton = document.querySelector('.add-quote');
const addQuoteForm = document.querySelector('.add-quote-form');

//  Adding listener for add quote button



addQuoteButton.addEventListener('click', ()=>{
    console.log('clicked')
    addQuoteForm.style.visibility = 'visible';
})


// listener for closing add quote form
const faX = document.querySelector('.fa-x');
faX.addEventListener('click', ()=>{
    addQuoteForm.style.visibility = 'hidden'
})


// adding listener for add/ sumbit button

const submitBtn = document.querySelector('#submit-btn');

submitBtn.addEventListener('click', ()=>{
    console.log('submit');
    const imgFile = document.querySelector('#img-file').value;
    console.log(imgFile);
    const writer = document.querySelector('#writer').value;
    const content = document.querySelector('#content').value;
    quotes.push(new Quote(imgFile, writer, content));

    appendCards(imgFile, content, writer)
    addQuoteForm.style.visibility = 'hidden';
})


