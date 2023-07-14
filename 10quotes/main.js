const cards = document.querySelector('.cards');

fetch('quotes.json').then(response => response.json()).then(data => {
    const quotes = data.quotes;

    quotes.forEach((quote) => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = 
                `
                    <img src="${quote.image}" alt="${quote.author}" />
                    <p class="quote">${quote.quote}</p>
                    <h2 class="author">${quote.author}</h2>
                `
        cards.insertAdjacentElement('afterbegin', card);
    })
})
.catch(error => {
    console.error('Error fetching quotes:', error);
  });