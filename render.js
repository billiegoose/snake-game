const chalk = require('chalk')

module.exports = drawGame

function drawGame (game) {
  let grid = drawBlank(game)
  grid = drawCookie(grid, game)
  grid = drawSnake(grid, game)
  grid = drawGameOverMessage(grid, game)
  return grid
}

function drawBlank ({height, width}) {
  let grid = []
  for (let col = 0; col < height; col++) {
    grid[col] = []
    for (let row = 0; row < width; row++) {
      grid[col][row] = '  '
    }
  }
  // Decorate edges
  for (let col = 0; col < height; col++) {
    grid[col][0] = chalk.inverse.cyan('  ')
    grid[col][width - 1] = chalk.inverse.cyan('  ')
  }
  for (let row = 0; row < width; row++) {
    grid[0][row] = chalk.inverse.cyan('  ')
    grid[height - 1][row] = chalk.inverse.cyan('  ')
  }
  
  return grid
}

function drawGameOverMessage (grid, {height, width, over, overMessage}) {
  if (over) {
    let y = Math.floor(height / 2)
    let x = Math.floor((width - overMessage.length/2) / 2)
    for (let i = 0; i < overMessage.length; i+=2) {
      grid[y][x + i/2] = overMessage[i] + overMessage[i+1]
    }
  }
  return grid
}

function drawSnake (grid, {height, width, snake, over}) {
  for (let point of snake.tail) {
    grid[point.y][point.x] = chalk.inverse.red('  ')
  }
  grid[snake.head.y][snake.head.x] = chalk.inverse.red('  ')
  return grid
}

function drawCookie (grid, {cookie}) {
  grid[cookie.y][cookie.x] = chalk.inverse.yellow('  ')
  return grid
}
