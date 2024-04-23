/* ~~~~ Constants ~~~~ */
const blankStyle = ["col-2", "col-sm-1", "border", "border-secondary", "rounded"]
const enteredStyle = ["col-2", "col-sm-1", "text-primary-emphasis", "bg-primary-subtle", "border", "border-primary-subtle", "rounded"]

/* ~~~~ Variables ~~~~ */
let string
let stringDisplay
let idx
let newChar
let score
let message

/* ~~~~ DOM Elements ~~~~ */
const stringDisplayEl = document.querySelector("#string-display")
const stringBoxSection = document.querySelector("#string-boxes")
const lastCharEl = document.querySelector("#last-char")
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
    clearStringBoxes()
    addStringBox()
    refreshStringDisplay()
    score = string.length - 1
}


function getRandomChar() {
    let num = Math.floor(Math.random() * 10)
    return num.toString()
}

function clearStringBoxes() {
    const boxes = stringBoxSection.children
    for (const box of boxes) {
        box.innerText = "_"
        box.className = ""
        box.classList.add(...blankStyle)
    }
}

function addStringBox() {
    const box = document.createElement("div")
    box.innerText = newChar
    box.classList.add(...blankStyle)
    box.classList.add("text-secondary")
    stringBoxSection.appendChild(box)
}

function refreshStringDisplay() {
    stringDisplay = new Array(string.length - 1).fill("_")
}

function render() {
    // renderStringBoxes()
    renderStringDisplay()
    renderLastChar()
    renderMessage()
    renderScore()
}

function renderStringBoxes() {
    const boxes = stringBoxSection.children
    for (let i = 0; i < boxes.length - 1; i++) {
        const box = boxes[i]
        box.innerText = "_"
        box.className = ""
        box.classList.add(...blankStyle)
    }
}

function renderStringDisplay() {
    if (idx === 0) {
        lastCharEl.classList.remove("hidden")
    }
    stringDisplayEl.innerText = stringDisplay.join(" ")
    if (string.length > 1) {
        stringDisplayEl.innerText += " "
    }
}

function renderLastChar() {
    if (idx <= string.length - 1) {
        lastCharEl.innerText = newChar
    } else {
        lastCharEl.classList.add("hidden")
    }
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
    stringBoxSection.children.item(index).innerText = value
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