/* ~~~~ Variables ~~~~ */
let string
let stringDisplay
let idx
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
document.addEventListener("keydown", handleKeyPress)
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
    idx = 0
    string += newChar
    refreshStringDisplay()
    score = string.length - 1
}

function getRandomChar() {
    let num = Math.floor(Math.random() * 10)
    return num.toString()
}

function refreshStringDisplay() {
    stringDisplay = new Array(string.length - 1).fill("_")
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

function handleKeyPress(evt) {
    const key = evt.key
    const code = key.charCodeAt()
    if (key === "Backspace") {
        updateStringDisplay("_", --idx)
    } else if (code >= 48 && code <= 57) {
        updateStringDisplay(key, idx++)
    }
    render()
}

function updateStringDisplay(value, index) {
    stringDisplay[index] = value
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