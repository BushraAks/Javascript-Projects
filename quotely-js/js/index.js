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


// printing all cards with quote details from the quote array
const cards = document.querySelector('.cards');

quotes.forEach((quote)=>{
    let card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('glassmorphism');
    card.innerHTML = 
        `
        <img src="${quote.img}" alt="Image">
        <div>
            <p class="content">"${quote.content}"</p>
            <h5 class="writer">${quote.writer} ~</h5>
        </div>
        `
    cards.appendChild(card);
})


const addQuoteButton = document.querySelector('.add-quote');
const addQuoteForm = document.querySelector('.add-quote-form');

//  Adding listener for add quote button

const imgFile = document.querySelector('#img-file').value;
const writer = document.querySelector('#writer').value;
const content = document.querySelector('#content').value;

addQuoteButton.addEventListener('click', ()=>{
    console.log('clicked')
    addQuoteForm.style.visibility = 'visible';
    quotes.push(new Quote(imgFile, writer, content))
})

// adding listener for add/ sumbit button

const submitBtn = document.querySelector('#submit-btn');
submitBtn.addEventListener('click', ()=>{
    //
    let card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('glassmorphism');
    card.innerHTML = 
        `
        <img src="${imgFile}" alt="Image">
        <div>
            <p class="content">"${content}"</p>
            <h5 class="writer">${writer} ~</h5>
        </div>
        `
    cards.appendChild(card);
    //
    addQuoteForm.style.visibility = 'hidden';
})

// listener for closing add quote form
const faX = document.querySelector('.fa-x');
faX.addEventListener('click', ()=>{
    addQuoteForm.style.visibility = 'hidden'
})


// appending 