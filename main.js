const displayHistory = document.querySelector('.display-history')
const display = document.querySelector('.display-input')
const tempResult = document.querySelector('.display-result')
const clearAll = document.querySelector('.clear-all')
const numbers = document.querySelectorAll('.number')
const operations = document.querySelectorAll('.operation')
const equal = document.querySelector('.equal')
const clearLast = document.querySelector('.last-entity-clear')

let dis1Num = ""
let dis2Num = ""
let result = null
let lastOperation = ""
let haveDot = false

numbers.forEach((number) => {
    number.addEventListener("click", (e) => {
        // console.log(e.target.innerText)
        if(e.target.innerText === "." && !haveDot){
            console.log(e.target.innerText)
            haveDot = true
        } else if(e.target.innerText === "." && haveDot){
            // console.log('sudah ada' ,e.target.innerText)
            return
        }
        dis2Num += e.target.innerText
        display.innerText = dis2Num
    })
})

operations.forEach((operation) => {
    operation.addEventListener("click", (e) => {
         if(!dis2Num) return
         haveDot = false
         const operationName = e.target.innerText
         if(dis1Num && dis2Num && lastOperation) {
            console.log("gk di operasi")
            matchOperation()
         } else{
            result = parseFloat(dis2Num)
         }
         clearVar(operationName)
         lastOperation = operationName
    })
}) 

function clearVar(name =""){
    dis1Num += dis2Num + " " + name + " " 
    displayHistory.innerText = dis1Num
    display.innerText = "" 
    dis2Num = ""
    tempResult.innerText = result
}

function matchOperation() {
    if(lastOperation === "x"){
        result = parseFloat(result) * parseFloat(dis2Num)
    } else if(lastOperation === "+") {
        result = parseFloat(result) + parseFloat(dis2Num)
    } else if(lastOperation === "-") {
        result = parseFloat(result) - parseFloat(dis2Num)
    } else if(lastOperation === "/"){
        result = parseFloat(result) / parseFloat(dis2Num)
    } else if(lastOperation === "%") {
        result = parseFloat(result) % parseFloat(dis2Num)
    }
}

equal.addEventListener("click", () => {
    if(!dis2Num || !dis2Num) return
    haveDot = false
    matchOperation()
    clearVar()
    display.innerText = result
    tempResult.innerText = ""
    dis2Num = result
    dis1Num = ""
})

clearAll.addEventListener("click", () => {
    dis1Num = ""
    displayHistory.innerText = ""
    dis2Num = ""
    display.innerText = ""
    haveDot = false
    result = ""
    tempResult.innerText = ""
    lastOperation = ""
})

clearLast.addEventListener("click", () => {
    display.innerText = "";
    dis2Num = ""
})

window.addEventListener("keydown", (e) => {
    if(
        e.key === "1" ||
        e.key === "2" ||
        e.key === "3" ||
        e.key === "4" ||
        e.key === "5" ||
        e.key === "6" ||
        e.key === "7" ||
        e.key === "8" ||
        e.key === "9" ||
        e.key === "0"
    ) {
        clickButton(e.key)
    } else if(e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%"){
        clickOperation(e.key)
    } else if(e.key === "*") {
        clickOperation("x")
    } else if(e.key === "Enter" || e.key === "="){
        clickEqual()
    } else if(e.key === "Backspace") {
        clickClear()
    }
})

function clickButton(key) {
    numbers.forEach((button) => {
        if(button.innerText === key) {
            button.click()
        }
    })
}
 function clickOperation(key) {
    operations.forEach((operation) => {
        if (operation.innerText === key) {
            operation.click()
        }
    })
}

function clickEqual() {
    equal.click()
}

function clickClear() {
    clearAll.click()
}