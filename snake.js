//board
var blockSize = 25
var rows = 30
var cols = 30
var board
var context //drawing object

//snake head
var snakeX = blockSize * 5 //snake starts at (5, 5)
var snakeY = blockSize * 5

var velocityX = 0
var velocityY = 0

snakeColor = "#32CD32"
snakeAlpha = 100
alphaLostPerUpdateCycle = 1

var snakeBody = []

//food
var foodX
var foodY

var interval
var updateTimer
var gameOver = false
var acceptInput = true

window.onload = function() {
    board = document.getElementById("board")
    board.height = rows * blockSize
    board.width = cols * blockSize
    context = board.getContext("2d") //used for drawing on the board

    placeFood()
    
    document.addEventListener("keyup", getKeyUp)
    
    startUpdateTimer() //update 10 times per second
}

function update() {
    console.log("update") //TODO: remove log
    // if (gameOver) {
    //     return
    // }

    //draw background
    context.fillStyle = "black"
    context.fillRect(0, 0, board.width, board.height)

    //update snake opacity
    snakeAlpha -= alphaLostPerUpdateCycle

    //check if snake head is overlapping food
    if (snakeX == foodX && snakeY == foodY) {
        snakeAlpha = 100
        snakeBody.push([foodX, foodY])
        placeFood()
    }

    //draw food
    context.fillStyle = "red"
    context.fillRect(foodX, foodY, blockSize, blockSize)

    if (!gameOver) {
        for (let i = snakeBody.length - 1; i > 0; i--) {
            snakeBody[i] = snakeBody[i - 1]
        }
        if (snakeBody.length) {
            snakeBody[0] = [snakeX, snakeY]
        }
    }

    //create string from snake color and current opacity
    const snakeColorStr = snakeAlpha <= 0 ? "transparent" : snakeColor + convertAlphaToHex(snakeAlpha)
    context.fillStyle = "rgb(0," + getRgbAlphaValue(snakeAlpha) + ",0, 1.0)" //snakeColorStr

    //update position and draw snake
    if (!gameOver) {
        snakeX += velocityX * blockSize
        snakeY += velocityY * blockSize
    }
    context.fillRect(snakeX, snakeY, blockSize, blockSize)

    //draw snake body
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize)
    }

    acceptInput = true

    //game over conditions
    if (snakeX < 0 || snakeX > cols * blockSize - 1 || snakeY < 0 || snakeY > rows * blockSize - 1) {
        snakeAlpha = 100
        gameOver = true
    }

    if (isOverlappingSnakeBody(snakeX, snakeY)) {
        snakeAlpha = 100
        gameOver = true
    }
}

function getKeyUp(e) {
    if (e.code == "KeyP" || e.code == "Escape") {
        if (updateTimer == null) {
            startUpdateTimer()
        } else {
            stopUpdateTimer()
        }
    }

    if (!acceptInput) {
        return
    }

    if ((e.code == "ArrowUp" || e.code == "KeyW") && velocityY != 1) {
        velocityX = 0
        velocityY = -1
        acceptInput = false
    } else if ((e.code == "ArrowDown" || e.code == "KeyS") && velocityY != -1) {
        velocityX = 0
        velocityY = 1
        acceptInput = false
    } else if ((e.code == "ArrowLeft" || e.code == "KeyA") && velocityX != 1) {
        velocityX = -1
        velocityY = 0
        acceptInput = false
    } else if ((e.code == "ArrowRight" || e.code == "KeyD") && velocityX != -1) {
        velocityX = 1
        velocityY = 0
        acceptInput = false
    }
}

function placeFood() {
    do {
        //0-1 * cols -> (0-19.9999) -> 0-19 * 25
        foodX = Math.floor(Math.random() * cols) * blockSize
        foodY = Math.floor(Math.random() * rows) * blockSize
    } while (isOverlappingSnakeBody(foodX, foodY))
}

function isOverlappingSnakeBody(x, y) {
    for (let i = 0; i < snakeBody.length; i++) {
        if (x == snakeBody[i][0] && y == snakeBody[i][1]) {
            return true
        }
    }

    return false
}

function startUpdateTimer() {
    if (updateTimer == null) {
        updateTimer = setInterval(update, 1000 / 10)
    }
}

function stopUpdateTimer() {
    clearInterval(updateTimer)
    updateTimer = null
}

function convertAlphaToHex(alphaDecimal) {
    // Convert alphaDecimal to a value between 0 and 1
    const alpha = alphaDecimal / 100
  
    // Calculate the equivalent alpha value in the range of 0 to 255
    const alphaInt = Math.round(alpha * 255)
  
    // Convert alphaInt to hexadecimal string
    const alphaHex = alphaInt.toString(16).toUpperCase()
  
    // Pad the hexadecimal value with leading zero if needed
    const paddedAlphaHex = alphaHex.padStart(2, '0')
  
    return paddedAlphaHex
}

function getRgbAlphaValue(alphaDecimal) {
    const alpha = alphaDecimal / 100
    const alphaInt = Math.round(alpha * 255)
    // return "rgb(0," + alphaInt + ",0, 1.0)"
    return alphaInt
}
