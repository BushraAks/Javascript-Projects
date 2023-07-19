const cards = document.querySelector('.cards');

for (let i = 0; i <= 42; i++) {
    const url = `https://rickandmortyapi.com/api/character/?page=${i}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3bd7554df9msh886f5c34be68a17p1c559djsnb06f8227656d',
            'X-RapidAPI-Host': 'brianiswu-cat-facts-v1.p.rapidapi.com'
        }
    };

    fetch(url, options)
    .then(response => response.json())
    .then(response => {
        const results = response.results;
        console.log(response);
        console.log(results);

        results.forEach((character) => {
            console.log(`Character: ${character}`)

            if (character.image){
                let card = document.createElement('div');
                card.classList.add('card');
                card.innerHTML = 
                `
                    <img src="${character.image}" alt="${character.name}">
                    <ul>
                        <li>${character.name}</li>
                        <li>${character.gender}</li>
                        <li>${character.species}</li>
                    </ul>
    
                `
                cards.appendChild(card);
            }
        })
    })
    .catch((err) => {
        console.log(err);
    })
}
