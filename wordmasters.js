document.addEventListener('keydown', letterPressed)

let currentButtonId = 1;
let currentWord = "";

function letterPressed(event) {
    let text = event.key;
    if (text === 'Backspace') {
        currentButtonId--;
        currentWord = currentWord.slice(0, -1)
        text = "";
        replaceButtonText(currentButtonId, text)
    } else if (!isLetter(event.key)) {
        event.preventDefault();
        text = "";
    } else {
        currentWord = currentWord.concat(text)
        replaceButtonText(currentButtonId, text)
        currentButtonId++;
    }
    console.log(currentWord)

}
function replaceButtonText(buttonId, text) {
    if (document.getElementById) {
        var button = document.getElementById(buttonId);
        if (button) {
            if (button.childNodes[0]) {
                button.childNodes[0].nodeValue = text;
            }
            else if (button.value) {
                button.value = text;
            }
            else //if (button.innerHTML)
            {
                button.innerHTML = text;
            }
        }
    }
}

async function getWordOfTheDay() {
    const response = await fetch("https://words.dev-apis.com/word-of-the-day")
    const body = await response.json()
    return body.word
    // return { word: body.word, puzzleNumber: body.puzzleNumber }
}

let wordOfTheDay;
 getWordOfTheDay().then(word => {
    wordOfTheDay = word
    console.log(wordOfTheDay)
 })

async function validateWord(word) {
    const data = {"word": word}
    const response = await fetch("https://words.dev-apis.com/validate-word", {
        body: JSON.stringify(data)
    }) 
    
}

//only allows letters to be inputted
function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
}

console.log(isLetter("a")); // true
console.log(isLetter("abc")); // false, not a single character
console.log(isLetter("1")); // false, not a number

