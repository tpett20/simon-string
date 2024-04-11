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
    let num = Math.floor(Math.random() * 9)
    return num.toString()
}

function render() {
    newCharEl.innerText = newChar
    msgEl.innerText = message
    scoreEl.innerText = score
}

function handleSubmit(evt) {
    // check the player's submission
    // start a new round if it's correct
    // otherwise, it's game over
    // reset the text field
    // render the updated game state
}