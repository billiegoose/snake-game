const chalk = require('chalk')

module.exports = drawGame

function drawGame (game) {
  let grid = drawBlank(game)
  grid = drawCookie(grid, game.cookie)
  for (let snake of game.snake) {
    grid = drawTail(grid, snake)
  }
  for (let snake of game.snake) {
    grid = drawHead(grid, snake)
  }
  grid = drawGameOverMessage(grid, game)
  grid = drawScore(grid, game)
  let str = gridToString(grid)
  return str
}

function cellToString (cell) {
  let str = `${cell.left || ' '}${cell.right || ' '}`
  if (cell.bg) {
    str = cell.bg(str)
  }
  if (cell.fg) {
    str = cell.fg(str)
  }
  return str
}

function gridToString (grid) {
  return grid.map(row => row.map(cellToString).join('')).join('\n')
}

function drawBlank ({height, width}) {
  let grid = []
  for (let col = 0; col < height; col++) {
    grid[col] = []
    for (let row = 0; row < width; row++) {
      grid[col][row] = {
        bg: null,
        left: '',
        right: ''
      }
    }
  }
  // Decorate edges
  for (let col = 0; col < height; col++) {
    grid[col][0].bg = chalk.bgCyan // = chalk.inverse.cyan('  ')
    grid[col][width - 1].bg = chalk.bgCyan //chalk.inverse.cyan('  ')
  }
  for (let row = 0; row < width; row++) {
    grid[0][row].bg = chalk.bgCyan // = chalk.inverse.cyan('  ')
    grid[height - 1][row].bg = chalk.bgCyan // = chalk.inverse.cyan('  ')
  }
  
  return grid
}

function drawGameOverMessage (grid, {height, width, over, overMessage}) {
  if (over) {
    let y = Math.floor(height / 2) - 1
    let x = Math.floor((width - overMessage.length/2) / 2)
    for (let i = 0; i < overMessage.length; i+=2) {
      grid[y][x + i/2].left = overMessage[i]
      grid[y][x + i/2].right = overMessage[i+1]
    }
  }
  return grid
}

function drawScore (grid, {height, width, snake, numSnakes}) {
  if (numSnakes === 1) {
    let y = 0
    let x = Math.floor(width / 2)
    let scoreString = `${snake[0].score}`.slice(0,2)
    grid[y][x].left = scoreString[1]
    grid[y][x].right = scoreString[0]
    grid[y][x].fg = chalk.red.bold
  } else if (numSnakes === 2) {
    let scoreString0 = `${snake[0].score}`.slice(0,2)
    let scoreString1 = `${snake[1].score}`.slice(0,2)
    let y = Math.floor(height / 2) - 1
    let x = 0
    grid[y][x].left = snake[0].score > 9 ? scoreString0[0] : ' '
    grid[y][x].right = snake[0].score > 9 ? scoreString0[1] : scoreString0[0]
    grid[y][x].fg = chalk.red
    grid[y][x].bg = chalk.bgBlack
    x = width - 1
    grid[y][x].left = snake[1].score > 9 ? scoreString1[0] : ' '
    grid[y][x].right = snake[1].score > 9 ? scoreString1[1] : scoreString1[0]
    grid[y][x].fg = chalk.blue.bold
    grid[y][x].bg = chalk.bgBlack
  }
  return grid
}

function drawTail (grid, snake) {
  for (let point of snake.tail) {
    grid[point.y][point.x].bg = snake.color // = chalk.inverse[snake.color]('  ')
  }
  return grid
}

function drawHead (grid, snake) {
  grid[snake.head.y][snake.head.x].bg = snake.color // = chalk.inverse[snake.color]('  ')
  return grid
}

function drawCookie (grid, cookie) {
  grid[cookie.y][cookie.x].bg = chalk.bgYellow // = chalk.inverse.yellow('  ')
  return grid
}
