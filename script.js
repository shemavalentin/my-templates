
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Getting Quotes from API

let apiQuotes = [];

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true
}

// Hide loading

function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Show new Quotes

function newQuote() { 
    showLoadingSpinner();
    // pick a random quote from apiQuote array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    //Check if the author field is blank and replace it with 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }

    //Check Quote length to determine styling

    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }   
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}

// Get Quotes From API
 
async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();

    } catch (error) {
        // catch errors  
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;

    window.open(twitterUrl, '_blank');
}
//event listenner
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// on load

getQuotes()

// loading();