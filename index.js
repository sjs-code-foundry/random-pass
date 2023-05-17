// Constants
const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

const symbols = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"]

// Functions
let darkMode = true // Initial setting
let bodyColor = document.getElementsByTagName('body')[0]
let bgColor = document.getElementById('background')
let titleColor = document.getElementById('title')
let subColor = document.getElementById('subtitle')
let ldColor = document.getElementById('light-dark')
let oaColor = document.getElementById('options-area')
let passOne = document.getElementById('gen1')
let passTwo = document.getElementById('gen2')
let passLength = document.getElementById('pass-length')
let limitLabel = document.getElementById('limit-label')


const paletteLight = ["#ECFDF5","#2B283A","#6B7280"] // [background,title text,subtitle text]
const paletteDark = ["#1F2937","#FFFFFF","#D5D4D8"]

function lightDark() {
    darkMode = !darkMode
    if (darkMode === true) {
        bodyColor.style.backgroundColor = paletteDark[0]
        bodyColor.style.color = paletteDark[1]
        bgColor.style.backgroundColor = paletteDark[0]
        titleColor.style.color = paletteDark[1]
        subColor.style.color = paletteDark[2]
        oaColor.style.color = paletteDark[2]
        ldColor.style.backgroundColor = paletteLight[0]
        limitLabel.style.color = paletteDark[2]
    } else {
        bodyColor.style.backgroundColor = paletteLight[0]
        bodyColor.style.color = paletteLight[1]
        bgColor.style.backgroundColor = paletteLight[0]
        titleColor.style.color = paletteLight[1]
        subColor.style.color = paletteLight[2]
        oaColor.style.color = paletteLight[2]
        ldColor.style.backgroundColor = paletteDark[0]
        limitLabel.style.color = paletteLight[2]
    }
}

function randChar(charList,passLen) {
    let passGen = ""

    function randNum() {
        let rNum = Math.floor(Math.random() * (charList.length))
        return rNum
    }

    for (let i = 0; i < passLen; i++) {
        passGen += charList[randNum()]
    }

    return passGen
}

function generatePass() {
    let incNum = document.querySelector("#inc-numbers").checked
    let incSym = document.querySelector("#inc-symbols").checked
    let chars = characters

    if (incNum === true && incSym === false) {
        chars = chars.concat(numbers)
    } else if (incNum === false && incSym === true) {
        chars = chars.concat(symbols)
    } else if (incNum && incSym) {
        chars = chars.concat(numbers, symbols)
    }

    let password = randChar(chars,passLengthCheck())
    return password
}

function passUpdate() {
    passOne.textContent = generatePass()
    passTwo.textContent = generatePass()
}

function passLengthCheck() {
    let pLength = 0
    let pValue = parseInt(passLength.value) // Convert to integers to fix if statements.
    let pMax = parseInt(passLength.max)
    let pMin = parseInt(passLength.min)
    let alertText = "Please set length from " + pMin + "-" + pMax + " characters"

    if (pValue > pMax) {
        pLength = pMax
        alert(alertText)
    } else if (pValue < pMin) {
        pLength = pMin
        alert(alertText)
    } else {
        pLength = pValue
    }
    passLength.value = pLength
    return pLength
}

function copyToClipboard(field) {
    if (field === 0) {
        navigator.clipboard.writeText(passOne.textContent) // Doesn't work in Scrimba, but works in browser.
        alert("1st Password copied to clipboard: " + passOne.textContent)
    } else {
        navigator.clipboard.writeText(passTwo.textContent)
        alert("2nd Password copied to clipboard: " + passTwo.textContent)
    }
}

function setLimitLabel() {
    let pMax = parseInt(passLength.max)
    let pMin = parseInt(passLength.min)
    limitLabel.textContent = "(" + pMin + "-" + pMax + ")"
}

setLimitLabel() // Automatically adjust label to HTML defined limits.
