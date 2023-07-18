const url = 'https://quotes15.p.rapidapi.com/quotes/random/';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3bd7554df9msh886f5c34be68a17p1c559djsnb06f8227656d',
		'X-RapidAPI-Host': 'quotes15.p.rapidapi.com'
	}
};

const quoteContainer = document.querySelector('.quote-container');
const generateBtn = document.querySelector('#generate-btn');

generateQuote()

generateBtn.addEventListener('click', generateQuote);

function generateQuote() {
    fetch(url, options)
    .then(response => response.json())
    .then(response => {
        console.log(response);
        quoteContainer.innerHTML = 
        `
            <p id="quote">"${response.content}"</p>
            <h2 id="author">${response.originator?.name} ~</h2>
        `
    })
    .catch((err) => {
        console.log(err);
        quoteContainer.innerHTML = 
        `
            <p id="quote">"Quote not found"</p>
            <h2 id="author">Author not found ~</h2>
        `
    })
}
