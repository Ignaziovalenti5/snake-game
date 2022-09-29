const snakeBoard = document.querySelector('#canvas-board')
const instruction = document.querySelector('#instruction')
let scoreBoard = document.querySelector('#score')
let lastScoreBoard = document.querySelector('#best-score')

const ctx = snakeBoard.getContext('2d')

let score = 0
let bestScore = 0

let boardW = snakeBoard.clientWidth
let boardH = snakeBoard.clientHeight
let snake = []
let food = []
let partDim = 20
let direction

let start = false
let timeRun = 70


function snakeInit() {
    snake = []
    score = 0
    scoreBoard.innerHTML = score
    direction = 'right'
    let startPos = 40

    ctx.clearRect(0, 0, boardW, boardH)
    ctx.fillStyle = '#257525'

    for (let i = 0; i < 8; i++) {
        ctx.fillRect(startPos + (i * partDim), startPos, partDim, partDim)
        snake.push({ x: startPos + (i * partDim), y: startPos, w: partDim, h: partDim })
    }

    randomFood()
}
snakeInit()


function randomFood() {
    food = []

    let randomX = Math.floor(Math.random() * (boardW / partDim)) * partDim
    let randomY = Math.floor(Math.random() * (boardH / partDim)) * partDim

    for (let part of snake) {
        if (randomX == part.x && randomY == part.y) {
            randomX = Math.floor(Math.random() * (boardW / partDim)) * partDim
            randomY = Math.floor(Math.random() * (boardH / partDim)) * partDim
        }
    }

    ctx.fillStyle = '#ee8105'
    ctx.fillRect(randomX, randomY, partDim, partDim)
    food.push({ x: randomX, y: randomY, w: partDim, h: partDim })
    ctx.fillStyle = '#257525'
}


window.addEventListener('keydown', (e) => {

    switch (e.key) {

        case 'ArrowUp':
            if (direction != 'down') {
                direction = 'up'
            }
            break;

        case 'ArrowDown':
            if (direction != 'up') {
                direction = 'down'
            }
            break;

        case 'ArrowLeft':
            if (direction != 'right') {
                direction = 'left'
            }
            break;

        case 'ArrowRight':
            
            if (!start) {
                int = setInterval(() => { moveSnake(direction) }, timeRun);
                start = true
                instruction.style.display = 'none'
            }

            if (direction != 'left') {
                direction = 'right'
            }
            break;

        default:
            break;
    }

})


function moveSnake(direction) {
    let snakeHead = snake[snake.length - 1]
    let snakeTail = snake[0]

    switch (direction) {
        case 'up':
            ctx.fillRect(snakeHead.x, snakeHead.y - partDim, partDim, partDim)
            snake.push({ x: snakeHead.x, y: snakeHead.y - partDim, w: partDim, h: partDim })

            if (snakeHead.x == food[0].x && snakeHead.y - partDim == food[0].y) {
                score++
                scoreBoard.innerText = score
                randomFood()
            } else {
                ctx.clearRect(snakeTail.x, snakeTail.y, snakeTail.w, snakeTail.h)
                snake.shift()
            }
            
            break;
        case 'down':
            ctx.fillRect(snakeHead.x, snakeHead.y + partDim, partDim, partDim)
            snake.push({ x: snakeHead.x, y: snakeHead.y + partDim, w: partDim, h: partDim })

            if (snakeHead.x == food[0].x && snakeHead.y + partDim == food[0].y) {
                score++
                scoreBoard.innerText = score
                randomFood()
            } else {
                ctx.clearRect(snakeTail.x, snakeTail.y, snakeTail.w, snakeTail.h)
                snake.shift()
            }
            break;
        case 'left':
            ctx.fillRect(snakeHead.x - partDim, snakeHead.y, partDim, partDim)
            snake.push({ x: snakeHead.x - partDim, y: snakeHead.y, w: partDim, h: partDim })

            if (snakeHead.x - partDim == food[0].x && snakeHead.y == food[0].y) {
                score++
                scoreBoard.innerText = score
                randomFood()
            } else {
                ctx.clearRect(snakeTail.x, snakeTail.y, snakeTail.w, snakeTail.h)
                snake.shift()
            }
            break;
        case 'right':
            ctx.fillRect(snakeHead.x + partDim, snakeHead.y, partDim, partDim)
            snake.push({ x: snakeHead.x + partDim, y: snakeHead.y, w: partDim, h: partDim })

            if (snakeHead.x + partDim == food[0].x && snakeHead.y == food[0].y) {
                score++
                scoreBoard.innerText = score
                randomFood()
            } else {
                ctx.clearRect(snakeTail.x, snakeTail.y, snakeTail.w, snakeTail.h)
                snake.shift()
            }
            break;

        default:
            break;
    }

    if (snakeHead.x < 0 || snakeHead.x + partDim > boardW || snakeHead.y < 0 || snakeHead.y + partDim > boardH) {
        collapse()
    }

    for(let i = 0; i < snake.length-2; i++){
        if (snakeHead.x == snake[i].x && snakeHead.y == snake[i].y) {
            collapse()
        }
    }

}


function collapse() {
    clearInterval(int)

    if (score > bestScore) {
        bestScore = score
        lastScoreBoard.innerHTML = bestScore
    }

    start = false
    instruction.style.display = 'block'
    snakeInit()
}





