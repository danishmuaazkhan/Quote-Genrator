const apiUrl = 'https://type.fit/api/quotes';

const quoteContainer = document.querySelector('#quote-container');
const newQuoteBtn = document.querySelector('.new-quote');
const authorText = document.querySelector('.author');
const quoteText = document.querySelector('.quote');
const twitterBtn = document.querySelector('.twitter-button');
const loader = document.querySelector('.loader');

let apiquotes = [];
let quote = '';

// Show New Quote 
function newQuote() {
    loading();

    // Pick a random quote from apiquotes array
    const quote = apiquotes[Math.floor(Math.random() * apiquotes.length)];

    // Check the quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    // Set the quote text and stop the loader
    quoteText.textContent = quote.text;
    stopLoading();

    // Check if the author field is blank and replace it with 'Unknown'
    const setAuthor = !quote.author ? 'Unknown' : quote.author;
    authorText.textContent = setAuthor;
}

async function getQuote() {
    loading();
    try {
        const response = await fetch(apiUrl);
        apiquotes = await response.json();
        newQuote();
    } catch (error) {
        alert(error);
    }
}

// Tweet Quote
function tweetQuote() {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} -${authorText.textContent}`;
    window.open(tweetUrl, '_blank');
}

// Show loading spinner and hide quote container
function loading() {
    loader.hidden = false;
    quoteContainer.style.display = 'none';
}

// Hide loading spinner and show quote container
function stopLoading() {
    loader.hidden = true;
    quoteContainer.style.display = 'flex';
}

// Event Listeners

// Generate new quote button
newQuoteBtn.addEventListener('click', newQuote);

// Tweet quote button
twitterBtn.addEventListener('click', tweetQuote);

// Initial quote fetch
getQuote();
