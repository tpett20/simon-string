/* ~~~~ Constants ~~~~ */
const blankStyle = ["col-2", "col-sm-1", "border", "border-secondary", "rounded", "mb-2"]
const enteredStyle = ["col-2", "col-sm-1", "text-primary-emphasis", "bg-primary-subtle", "border", "border-primary-subtle", "rounded", "mb-2"]

/* ~~~~ Variables ~~~~ */
let string
let userEntry
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
const numberKeysSection = document.querySelector("#number-keys")

/* ~~~~ Event Listeners ~~~~ */
document.addEventListener("keydown", handleNumberEntry)
numberKeysSection.addEventListener("click", handleNumberEntry)

/* ~~~~ Functions ~~~~ */
init()

function init() {
    string = ""
    userEntry = []
    score = 0
    message = "Enter the Whole String"
    removeStringBoxes()
    startNewRound()
    render()
}

function removeStringBoxes() {
    const boxLen = stringBoxSection.children.length
    for (let i = 0; i < boxLen; i++) {
        stringBoxSection.removeChild(stringBoxSection.firstElementChild)
    }
}

function startNewRound() {
    newChar = getRandomChar()
    idx = 0
    string += newChar
    resetUserEntry()
    addStringBox()
    score = string.length - 1
}


function getRandomChar() {
    let num = Math.floor(Math.random() * 10)
    return num.toString()
}

function resetUserEntry() {
    userEntry.push("")
    userEntry.fill("_")
}

function addStringBox() {
    const box = document.createElement("div")
    stringBoxSection.appendChild(box)
}

function render() {
    renderStringBoxes()
    renderMessage()
    renderScore()
}

function renderStringBoxes() {
    const boxes = stringBoxSection.children
    for (let i = 0; i < boxes.length; i++) {
        const box = boxes[i]
        const value = userEntry[i]
        box.innerText = value
        box.className = ""
        if (value === "_") {
            box.classList.add(...blankStyle)
            if (i === boxes.length - 1) {
                box.classList.add("text-secondary")
                box.innerText = newChar
            }
        } else {
            box.classList.add(...enteredStyle)
        }
    }
}

function renderMessage() {
    msgEl.innerText = message
}

function renderScore() {
    scoreEl.innerText = score
}

function handleNumberEntry(evt) {
    if (evt.key) {
        key = evt.key
    } else if (evt.target.tagName === "BUTTON") {
        key = evt.target.innerText
    } else {
        return
    }
    const code = key.charCodeAt()
    if (key === "Backspace" && idx > 0) {
        updateUserEntry("_", --idx)
    } else if (code >= 48 && code <= 57) {
        updateUserEntry(key, idx++)
    }
    if (idx === string.length) {
        handleSubmit()
    }
    render()
}

function updateUserEntry(value, index) {
    userEntry[index] = value
}

function handleSubmit() {
    const responseIsCorrect = checkSubmission()
    if (responseIsCorrect === true) {
        setTimeout(() => {
            startNewRound()
            render()
        }, 500)
    } else {
        gameOver()
    }
}

function checkSubmission() {
    const submission = userEntry.join("")
    return submission === string
}

function gameOver() {
    message = `GAME OVER! String: ${string}`
    // Show the Game Over message for 5 seconds, then restart the game
    setTimeout(init, 5000)
    render()
}