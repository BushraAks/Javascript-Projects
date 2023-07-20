const cards = document.querySelector('.cards');

for (let i = 0; i <= 42; i++) {
    const url = `https://rickandmortyapi.com/api/character/?page=${i}`;

    fetch(url)
    .then(response => response.json())
    .then(response => {
        const results = response.results;
        console.log(response);
        console.log(results);

        results.forEach((character) => {
            console.log(`Character: ${character}`);

            if (character.image){
                let card = document.createElement('div');
                card.classList.add('card');
                card.innerHTML = 
                `
                    <img src="${character.image}" alt="${character.name}">
                    <div>${character.name}</div>
                `
                cards.appendChild(card);
            }
        })
    })
    .catch((err) => {
        console.log(err);
    })
}
