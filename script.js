/* ~~~~ Constants ~~~~ */
const baseStyle = ["col-2", "col-sm-1", "mx-1", "mb-2", "rounded", "border"]
const enteredStyle = ["text-primary-emphasis", "bg-primary-subtle", "border-primary-subtle"]
const correctStyle = ["text-success-emphasis", "bg-success-subtle", "border-success-subtle"]
const incorrectStyle = ["text-danger-emphasis", "bg-danger-subtle", "border-danger-subtle"]
const revealStyle = ["text-warning-emphasis", "bg-warning-subtle", "border-warning-subtle"]
const timeUnit = 350

/* ~~~~ Variables ~~~~ */
let string
let userEntry
let idx
let newChar
let score
let message
let btnsEnabled

/* ~~~~ DOM Elements ~~~~ */
const stringDisplayEl = document.querySelector("#string-display")
const stringBoxSection = document.querySelector("#string-boxes")
const lastCharEl = document.querySelector("#last-char")
const msgEl = document.querySelector("#message")
const scoreEl = document.querySelector("#score")
const numberKeysSection = document.querySelector("#number-keys")
const numberKeys = document.querySelectorAll(".num-btn")

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
    enableNumberKeys()
    btnsEnabled = true
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

function enableNumberKeys() {
    numberKeys.forEach(numKey => numKey.disabled = false)
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
            box.classList.add(...baseStyle, "border-secondary")
            if (i === boxes.length - 1) {
                box.classList.add("text-secondary")
                box.innerText = newChar
            }
        } else {
            box.classList.add(...baseStyle, ...enteredStyle)
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
    if (btnsEnabled === false) return
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
    disableNumberKeys()
    btnsEnabled = false
    const animationTime = string.length * timeUnit
    const responseIsCorrect = checkSubmission()
    if (responseIsCorrect === true) {
        setTimeout(() => {
            startNewRound()
            render()
        }, animationTime + timeUnit)
    } else {
        setTimeout(() => {
            convertWrongAnswers()
        }, animationTime + 2 * timeUnit)
        setTimeout(() => {
            init()
            render()
        }, animationTime + 5 * timeUnit)
    }
}

function checkSubmission() {
    const submission = userEntry.join("")
    return submission === string
}

function disableNumberKeys() {
    numberKeys.forEach(numKey => numKey.disabled = true)
}

function runCheckingAnimation() {
    const boxes = stringBoxSection.children
    for (let i = 0; i < string.length; i++) {
        const box = boxes[i]
        const userChar = userEntry[i]
        const correctChar = string[i]
        const charIsCorrect = (userChar === correctChar) ? true : false
        setTimeout(showBoxCorrectStatus, timeUnit + i * timeUnit, box, charIsCorrect)
    }
}

function showBoxCorrectStatus(bx, isCorrect) {
    bx.className = ""
    if (isCorrect) {
        bx.classList.add(...baseStyle, ...correctStyle)
    } else {
        bx.classList.add(...baseStyle, ...incorrectStyle)
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
        box.classList.add(...baseStyle, ...revealStyle)
    }
}