const apiUrl = 'https://type.fit/api/quotes';

const newQuoteBtn = document.querySelector('.new-quote');
const authorField = document.querySelector('.author');
const quoteField = document.querySelector('.quote');

let apiquotes = [];
let quote = '';

// Show New Quote 
function newQuote () {
    const randomIndex = Math.floor(Math.random()*apiquotes.length);
     quoteField.innerHTML = apiquotes[randomIndex].text;
     authorField.innerHTML = apiquotes[randomIndex].author;
} 

async function getQuote() {

    try {
        const response = await fetch(apiUrl)
        apiquotes = await response.json();
        newQuote();
    } catch (error) {
        alert(error);
    }
}

 newQuoteBtn.addEventListener('click', () => {
     newQuote();
    })
    getQuote();
    