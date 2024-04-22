/* ~~~~ Variables ~~~~ */
let string
let stringDisplay
let newChar
let score
let message

/* ~~~~ DOM Elements ~~~~ */
const stringDisplayEl = document.querySelector("#string-display")
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
    stringDisplay = []
    score = 0
    message = "Type the Whole String Below"
    startNewRound()
    render()
}

function startNewRound() {
    newChar = getRandomChar()
    string += newChar
    updateStringDisplay()
    score = string.length - 1
}

function getRandomChar() {
    let num = Math.floor(Math.random() * 10)
    return num.toString()
}

function updateStringDisplay() {
    if (stringDisplay.length) {
        stringDisplay[stringDisplay.length - 1] = "_"
    }
    stringDisplay.push(newChar)
}

function render() {
    renderStringDisplay()
    renderMessage()
    renderScore()
}

function renderStringDisplay() {
    stringDisplayEl.innerText = stringDisplay.join(" ")
}

function renderMessage() {
    msgEl.innerText = message
}

function renderScore() {
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