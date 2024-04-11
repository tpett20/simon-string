/* ~~~~ Variables ~~~~ */
let string
let newChar
let score
let message

/* ~~~~ DOM Elements ~~~~ */
const newCharEl = document.querySelector("#new-char")
const msgEl = document.querySelector("#message")
const scoreEl = document.querySelector("#score")
const textField = document.querySelector("#text-field")
const submitBtn = document.querySelector("#submit-btn")

/* ~~~~ Event Listeners ~~~~ */
submitBtn.addEventListener('click', handleSubmit)

/* ~~~~ Functions ~~~~ */
init()

function init() {
    string = ""
    score = 0
    message = "Type the Whole String Below"
    startNewRound()
    render()
}

function startNewRound() {
    newChar = getRandomChar()
    string += newChar
    score = string.length - 1
}

function getRandomChar() {
    let num = Math.floor(Math.random() * 10)
    return num.toString()
}

function render() {
    newCharEl.innerText = newChar
    msgEl.innerText = message
    scoreEl.innerText = score
}

function handleSubmit(evt) {
    // prevent the page from automatically refreshing
    evt.preventDefault()
    const responseIsCorrect = checkSubmission()
    if (responseIsCorrect === true) {
        startNewRound()
    } else {
        gameOver()
    }
    // reset text field
    textField.value = ""
    render()
}

function checkSubmission() {
    const submission = textField.value
    return submission === string
}

function gameOver() {
    message = `GAME OVER! String: ${string}`
    // Show the Game Over message for 5 seconds, then restart the game
    setTimeout(init, 5000)
}