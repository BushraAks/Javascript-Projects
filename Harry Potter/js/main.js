import { show, hide } from './utils.js';

const cardsContainer = document.querySelector('.cards');
const detailsCard = document.querySelector('.details-card');

const url = `https://hp-api.onrender.com/api/characters`;
const options = {
    method: 'GET'
};
// displaying all cards
fetch(url, options)
.then(response => response.json())
.then(response => {
    console.log(response);
    response.forEach((character) => {
        console.log(`character: ${character}`)
        if (character.image){
            let card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = 
            `
                <img src="${character.image}">
                <div>${character.name}</div>
                <div class="char-id">${character.id}</div>
            `
            cardsContainer.appendChild(card);
        }
    })
})
.catch((err) => {
    console.log(err);
});


// card click event listener
cardsContainer.addEventListener('click', (event) => {
    let card = event.target.parentElement;
    let charId = card.children[2].textContent;

    fetch(url, options)
    .then(response => response.json())
    .then(response => {
        console.log(response);
        const index = response.findIndex(obj => obj.id === charId);
        const character = response[index];

        detailsCard.innerHTML = 
        `
            <img src="${character.image}" alt="${character.name}">
            <i class="fa-light fa-x"></i>
            <div class="details">
                <div class="name"> <span class="title">Name: </span> ${character.name}</div>
                <div class="name"> <span class="title">Species: </span> ${character.species}</div>
                <div class="name"> <span class="title">Gender: </span> ${character.gender}</div>
                <div class="name"> <span class="title">Eye Color: </span> ${character.eyeColour}</div>
                <div class="name"> <span class="title">Hair Color: </span> ${character.hairColour}</div>
                <div class="name"> <span class="title">House: </span> ${character.house}</div>
                <div class="name"> <span class="title">Ancestry: </span> ${character.ancestry}</div>
            </div>
        `

        // closing details card listener
        const closeTab = document.querySelector('.fa-x');
        closeTab.addEventListener('click', () => {
            hide(detailsCard)
            document.body.style.overflow = 'auto';
        });
    })

    show(detailsCard);
    document.body.style.overflow = 'hidden';

});
