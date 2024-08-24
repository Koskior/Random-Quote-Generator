// Get the button element
const btn = document.querySelector("#new-quote-button");
const copyBtn = document.querySelector("#copy-button");
const tweetBtn = document.querySelector("#tweet-button");
const speechBtn = document.querySelector("#speech-button");
const notification = document.querySelector("#copy-notification");


// Correct URL for fetching a random quote from Quotable
const url = "https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/random";

// Add a click event listener
btn.addEventListener('click', async function() {
  try {
      const response = await fetch(url);
      
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      // Parse the JSON data
      const data = await response.json();

      // ZenQuotes API returns an array with one object
      const quoteText = data[0].q;
      const quoteAuthor = data[0].a;

      // Display the quote and author in the HTML
      document.getElementById('quote-text').innerText = quoteText;
      document.getElementById('quote-author').innerText = `- ${quoteAuthor}`;
  } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
  }
});

// first try at Copy

// function myCopy() {
//   // Get the text field
//   var copyText = document.getElementById("myQuote");

//   // Select the text field
//   copyText.select();
//   copyText.setSelectionRange(0, 99999); // For mobile devices

//   // Copy the text inside the text field
//   navigator.clipboard.writeText(copyText.value);
  
//   // Alert the copied text
//   alert("Copied the text: " + copyText.value);
// }



// second try at Copy

// function myCopy(){

//   let text = document.getElementById('quote-text').innerHTML;
//   console.log('Content copied to clipboard');

//   const copyContent = async () => {
//     try {
//       console.log('Content copied to clipboard');

//       await navigator.clipboard.writeText(text);
//       console.log('Content copied to clipboard');
//     } catch (err) {
//       console.error('Failed to copy: ', err);
//     }
//   }
// }

// Add a click event listener for copying the quote
copyBtn.addEventListener('click', function() {
  // Get the quote text and author
  const quoteText = document.getElementById('quote-text').innerText;
  const quoteAuthor = document.getElementById('quote-author').innerText;

  // Concatenate the quote and author
  const fullQuote = `${quoteText} \n  ${quoteAuthor}`;
  console.log(fullQuote);

  // Copy the full quote to the clipboard
  navigator.clipboard.writeText(fullQuote).then(() => {
      // alert("Quote copied to clipboard!");
      // Show the notification
      notification.classList.add("show");

      // Hide the notification after 3 seconds
      setTimeout(() => {
          notification.classList.remove("show");
      }, 3000);
  }).catch(err => {
      console.error('Could not copy text: ', err);
  });
});

// Tweet the quote
tweetBtn.addEventListener('click', function() {
    const quoteText = document.getElementById('quote-text').innerText;
    const quoteAuthor = document.getElementById('quote-author').innerText;
    const fullQuote = `${quoteText} \n  ${quoteAuthor}`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(fullQuote)}`;
    window.open(tweetUrl, "_blank");
});


// Speak the quote aloud
speechBtn.addEventListener('click', function() {
  const quoteText = document.getElementById('quote-text').innerText;
  const quoteAuthor = document.getElementById('quote-author').innerText;
  const fullQuote = `${quoteText} \n  ${quoteAuthor}`;

  const speech = new SpeechSynthesisUtterance(fullQuote);
  speechSynthesis.speak(speech);
});