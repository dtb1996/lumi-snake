//board
var blockSize = 25
var rows = 21
var cols = 21
var board
var context //drawing object

//score
var scoreText
var score

//audio base64 data
const snd1 = new Audio("data:audio/mpeg;base64,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")
const snd2 = new Audio("data:audio/mpeg;base64,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1BCwEXRTRZ9YordVhlo8Yyey9M9Cwps7xjQ2H0Hnts3YZf3KrSwDXuXKdcr+4WWsQPATUIcFQzf2p2VW6XKIsNrfW7R6grKkqcm9fmzSVq3PIzJCm62sOymrZuSmzyVRqNb3a+m+7RZWePtIq07jMz16GdPXB1u/1fcqjk/WgzHWWVWzjurGcqbLeO7tFhU+ao+z3y3v//////uwZO2ABLJi1v1mAAgrYHm+pIAAJZXpQfmtAAEfFud/BoAA//////7vaq/X7vD5r/WCrDolW44UnQkY6ZJMER6px2uBAACpROsIIJWXBoa3InBHlKUVDYJL/pmS3/EW+xB/It6//NcO+8/Oq8pUP2O7owCpnhoXCVjxpwX9KUxBTUUzLjEwMFVVVVVVVVVVVVVVVVAhn7AACEIXIUhchCJmP9gIgwEdWBgIYDTxKdEuJf//o//uTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xBk7w/xGBJEzwRgAAAAD/DgAAEAAAGkAAAAIAAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==")

//snake head
var snakeStartX = blockSize * Math.floor(cols / 2)// 5 //snake starts at (5, 5)
var snakeStartY = blockSize * Math.floor(rows / 2)//5

snakeColor = "#32CD32"
maxAlpha = 100
alphaLostPerUpdateCycle = 1

class Snake {
    constructor() {
        this.x = snakeStartX
        this.y = snakeStartY
        this.velocityX = 0
        this.velocityY = 0
        this.color = snakeColor
        this.alpha = maxAlpha
        this.body = []
    }

    pushBody(x, y) {
        this.body.push([x, y])
    }

    updateBodyPosition() {
        for (let i = this.body.length - 1; i > 0; i--) {
            this.body[i] = this.body[i - 1]
        }
        if (this.body.length) {
            this.body[0] = [snake.x, snake.y]
        }
    }
}

//food
var foodX
var foodY

//game-related
var interval
var updateTimer
var gameOverAiTimer
var gameOver = false
var acceptInput = true
var audioMuted = false

const states = {
    MainMenu: "main_menu",
    Playing: "playing",
    Paused: "paused",
    GameOver: "game_over"
}

var currentState = states.MainMenu

var snake

window.onload = function() {
    board = document.getElementById("board")
    board.height = rows * blockSize
    board.width = cols * blockSize
    context = board.getContext("2d") //used for drawing on the board
    
    document.addEventListener("keyup", getKeyUp)
    document.addEventListener("click", onClick, false)

    //draw background
    context.fillStyle = "black"
    context.fillRect(0, 0, board.width, board.height)

    startGame()
}

function update() {
    //draw background
    context.fillStyle = "black"
    context.fillRect(0, 0, board.width, board.height)

    //update snake opacity
    snake.alpha -= alphaLostPerUpdateCycle

    //check if snake head is overlapping food
    if (snake.x == foodX && snake.y == foodY) {
        if (currentState == states.Playing) {
            beep("snd1")
        }
        score += 1
        scoreText.innerHTML = score
        snake.alpha = maxAlpha
        snake.pushBody(foodX, foodY)
        placeFood()
    }

    //draw food
    context.fillStyle = "red"
    context.fillRect(foodX, foodY, blockSize, blockSize)

    if (currentState == states.MainMenu) {
        setAiSnakeVelocity()
    }

    //update position and draw snake
    if (!gameOver) {
        snake.updateBodyPosition()
        snake.x += snake.velocityX * blockSize
        snake.y += snake.velocityY * blockSize
    }

    //set snake color from current alpha
    context.fillStyle = "rgb(0," + getRgbAlphaValue(snake.alpha) + ",0,1.0)"

    //draw snake head
    context.fillRect(snake.x, snake.y, blockSize, blockSize)

    //draw snake body
    for (let i = 0; i < snake.body.length; i++) {
        context.fillRect(snake.body[i][0], snake.body[i][1], blockSize, blockSize)
    }

    acceptInput = true

    if (gameOver) {
        stopUpdateTimer()
        return
    }

    //game over conditions
    if (snake.x < 0 || snake.x > cols * blockSize - 1 || snake.y < 0 || snake.y > rows * blockSize - 1) {
        snake.alpha = maxAlpha
        if (!gameOver && currentState == states.MainMenu) {
            startAiGameOverTimer()
        }
        gameOver = true
        if (currentState == states.Playing) {
            beep("snd2")
        }
    }

    if (isOverlappingSnakeBody(snake.x, snake.y)) {
        snake.alpha = maxAlpha
        if (!gameOver && currentState == states.MainMenu) {
            startAiGameOverTimer()
        }
        gameOver = true
        if (currentState == states.Playing) {
            beep("snd2")
        }
    }
}

function getKeyUp(e) {
    if (e.code == "KeyR" && currentState == states.Playing) {
        exitToMenu()
        startGame()
    }

    if ((e.code == "Enter" || e.code == "Space")) {
        if (currentState == states.MainMenu) {
            currentState = states.Playing
            startGame()
        } else if (currentState == states.Playing) {
            currentState = states.MainMenu
            exitToMenu()
        }
    }

    if (e.code == "KeyP" || e.code == "Escape") {
        if (updateTimer == null) {
            startUpdateTimer()
        } else {
            stopUpdateTimer()
            acceptInput = false
        }
    }

    if (e.code == "KeyM") {
        audioMuted = !audioMuted
    }

    if (!acceptInput || !snake) {
        return
    }

    if ((e.code == "ArrowUp" || e.code == "KeyW") && snake.velocityY != 1) {
        snake.velocityX = 0
        snake.velocityY = -1
        acceptInput = false
    } else if ((e.code == "ArrowDown" || e.code == "KeyS") && snake.velocityY != -1) {
        snake.velocityX = 0
        snake.velocityY = 1
        acceptInput = false
    } else if ((e.code == "ArrowLeft" || e.code == "KeyA") && snake.velocityX != 1) {
        snake.velocityX = -1
        snake.velocityY = 0
        acceptInput = false
    } else if ((e.code == "ArrowRight" || e.code == "KeyD") && snake.velocityX != -1) {
        snake.velocityX = 1
        snake.velocityY = 0
        acceptInput = false
    }
}

function onClick(e) {
    var rect = board.getBoundingClientRect()
    var mouseX = e.clientX - rect.left
    var mouseY = e.clientY - rect.top

    if (mouseX >= 0 && mouseX <= board.width && mouseY >= 0 && mouseY <= board.height) {
        console.log("click within canvas boundaries")
        if (currentState == states.MainMenu) {
            currentState = states.Playing
            startGame()
        } else if (currentState == states.Playing) {
            currentState = states.MainMenu
            exitToMenu()
        }
    } else {
        console.log("click outside boundaries")
    }
}

function startGame() {

    score = 0
    scoreText = document.getElementById("score")
    scoreText.innerHTML = score

    snake = new Snake()
    // snakeBody = []

    placeFood()

    gameOver = false
    acceptInput = true
    
    startUpdateTimer() //update 10 times per second
}

function exitToMenu() {
    stopUpdateTimer()
    snake = null

    //draw background
    context.fillStyle = "black"
    context.fillRect(0, 0, board.width, board.height)

    startGame()
}

function placeFood() {
    do {
        //0-1 * cols -> (0-19.9999) -> 0-19 * 25
        foodX = Math.floor(Math.random() * cols) * blockSize
        foodY = Math.floor(Math.random() * rows) * blockSize
    } while (isOverlappingSnakeBody(foodX, foodY))
}

function isOverlappingSnakeBody(x, y) {
    var snakeBody2 = snake.body
    for (let i = 0; i < snakeBody2.length; i++) {
        if (x == snakeBody2[i][0] && y == snakeBody2[i][1]) {
            return true
        }
    }

    return false
}

function startUpdateTimer() {
    if (updateTimer == null) {
        updateTimer = setInterval(update, 1000 / 10/*/ 10*/)
    }
}

function stopUpdateTimer() {
    clearInterval(updateTimer)
    updateTimer = null
}

function startAiGameOverTimer() {
    if (gameOverAiTimer == null) {
        gameOverAiTimer = setTimeout(onAiGameOverTimerTimeout, 2000)
    }
}

function onAiGameOverTimerTimeout() {
    if (currentState == states.MainMenu) {
        startGame()
    }
}

function setAiSnakeVelocity() {
    var prioritzeX = Math.abs(snake.x - foodX) < Math.abs(snake.y - foodY)
        
    if (prioritzeX) {
        if (snake.x !== foodX) {
            snake.velocityX = snake.x < foodX && snake.velocityX !== -1 ? 1  :
                        snake.x > foodX && snake.velocityX !== 1  ? -1 : 0
            snake.velocityY = snake.velocityX === 0 ? (snake.y > board.height / 2 ? -1 : 1) : 0
        } else {
            snake.velocityY = snake.y < foodY && snake.velocityY !== -1 ?  1 :
                        snake.y > foodY && snake.velocityY !== 1  ? -1 : 0
            snake.velocityX = snake.velocityY === 0 ? (snake.x < board.width / 2 ? 1 : -1) : 0
        }
    } else {
        if (snake.y !== foodY) {
            snake.velocityY = snake.y < foodY && snake.velocityY !== -1 ?  1 :
                        snake.y > foodY && snake.velocityY !== 1  ? -1 : 0
            snake.velocityX = snake.velocityY === 0 ? (snake.x < board.width / 2 ? 1 : -1) : 0
        } else {
            snake.velocityX = snake.x < foodX && snake.velocityX !== -1 ? 1  :
                        snake.x > foodX && snake.velocityX !== 1  ? -1 : 0
            snake.velocityY = snake.velocityX === 0 ? (snake.y > board.height / 2 ? -1 : 1) : 0
        }
    }
}

function getRgbAlphaValue(alphaDecimal) {
    const alpha = alphaDecimal / 100
    const alphaInt = Math.round(alpha * 255)
    return alphaInt
}

function beep(audioClip) {
    if (audioMuted) {
        return
    }
    switch (audioClip) {
        case "snd1":
            snd1.play()
            break
        case "snd2":
            snd2.play()
            break
        default:
            break
    }
}