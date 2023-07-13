const apiUrl = 'https://type.fit/api/quotes';

const newQuoteBtn = document.querySelector('.new-quote');
const authorText = document.querySelector('.author');
const quoteText = document.querySelector('.quote');
const twitterBtn = document.querySelector('.twitter-button');

let apiquotes = [];
let quote = '';

// Show New Quote 
function newQuote() {

    // Pick a random quote from apiquote array
    const quote = apiquotes[Math.floor(Math.random() * apiquotes.length)];

    // Check the code lenght to determine styling
    if (quote.text.length > 120) quoteText.classList.add('long-quote');
    else quoteText.classList.remove('long-quote');

    quoteText.textContent = quote.text;

    //Check if Author field is blank and replace it with 'Unknown'.
    const setAuthor = !quote.author ? 'Unknown' : quote.author;
    authorText.textContent = setAuthor;

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

// Tweet Quote
function tweetQuote() {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} -${authorText.textContent}`;
    window.open(tweetUrl, '_blanck');
}

// Event Listeners

// New Quote Genreator
newQuoteBtn.addEventListener('click', () => {
    newQuote();
})
getQuote();

// Tweet Quote
twitterBtn.addEventListener('click', tweetQuote);
