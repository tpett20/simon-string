/* ~~~~ Constants ~~~~ */
const blankStyle = ["col-2", "col-sm-1", "border", "border-secondary", "rounded", "mb-2"]
const enteredStyle = ["col-2", "col-sm-1", "text-primary-emphasis", "bg-primary-subtle", "border", "border-primary-subtle", "rounded", "mb-2"]
const correctStyle = ["col-2", "col-sm-1", "text-success-emphasis", "bg-success-subtle", "border", "border-success-subtle", "rounded", "mb-2"]
const incorrectStyle = ["col-2", "col-sm-1", "text-danger-emphasis", "bg-danger-subtle", "border", "border-danger-subtle", "rounded", "mb-2"]
const revealStyle = ["col-2", "col-sm-1", "text-warning-emphasis", "bg-warning-subtle", "border", "border-warning-subtle", "rounded", "mb-2"]

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
    runCheckingAnimation()
    const animationTime = (string.length + 1) * 500
    const responseIsCorrect = checkSubmission()
    if (responseIsCorrect === true) {
        setTimeout(() => {
            startNewRound()
            render()
        }, animationTime)
    } else {
        setTimeout(() => {
            convertWrongAnswers()
        }, animationTime + 500)
        setTimeout(() => {
            init()
            render()
        }, animationTime + 2000)
    }
}

function checkSubmission() {
    const submission = userEntry.join("")
    return submission === string
}

function runCheckingAnimation() {
    const boxes = stringBoxSection.children
    for (let i = 0; i < string.length; i++) {
        const box = boxes[i]
        const userChar = userEntry[i]
        const correctChar = string[i]
        const charIsCorrect = (userChar === correctChar) ? true : false
        setTimeout(showBoxCorrectStatus, 500 + i * 500, box, charIsCorrect)
    }
}

function showBoxCorrectStatus(bx, isCorrect) {
    bx.className = ""
    if (isCorrect) {
        bx.classList.add(...correctStyle)
    } else {
        bx.classList.add(...incorrectStyle)
    }
}

function convertWrongAnswers() {
    const boxes = stringBoxSection.children
    const wrongBoxData = []
    for (let i = 0; i < string.length; i++) {
        const box = boxes[i]
        const userChar = userEntry[i]
        const correctChar = string[i]
        const charIsCorrect = (userChar === correctChar) ? true : false
        if (!charIsCorrect) {
            wrongBoxData.push([box, correctChar])
        }
    }
    showCorrectedAnswers(wrongBoxData)
}

function showCorrectedAnswers(boxData) {
    for (const item of boxData) {
        const box = item[0]
        const char = item[1]
        box.innerText = char
        box.className = ""
        box.classList.add(...revealStyle)
    }
}

// function gameOver(waitTime) {
//     setTimeout(init, waitTime)
//     render()
// }