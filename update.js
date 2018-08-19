const init = require('./init.js')
const collide = require('./collide.js')

function moveSnake(snake, game) {
  snake.tail.unshift({
    x: snake.head.x,
    y: snake.head.y
  })
  snake.tail = snake.tail.slice(0, snake.length)
  snake.head.x += snake.head.dx
  snake.head.y += snake.head.dy
}

function collideSnake(snake, game) {
  if (collide.wallCheck(snake.head, game)) {
    snake.dead = true
    game.overMessage += `${snake.name} hit a wall. `
    return game
  }
  if (collide.cookieCheck(snake.head, game.cookie)) {
    snake.length += 1
    game.cookie = init.cookie(game)
  }
  for (let other of game.snake) {
    if (collide.tailCheck(snake.head, other.tail)) {
      snake.dead = true
      if (snake.name === other.name) {
        game.overMessage += `${snake.name} hit ${snake.pronouns.object}. `
      } else {
        game.overMessage += `${snake.name} hit ${other.name}. `
      }
    }
    if (snake.name !== other.name) {
      if (collide.headCheck(snake.head, other.head)) {
        snake.dead = true
        game.overMessage += `${snake.name} hit ${other.name}. `
      }
    }
  }
}

function up (snake) {
  if (snake.head.dx !== 0) {
    snake.head.dx = 0
    snake.head.dy = -1
  }
}

function left (snake) {
  if (snake.head.dy !== 0) {
    snake.head.dx = -1
    snake.head.dy = 0
  }
}

function down (snake) {
  if (snake.head.dx !== 0) {
    snake.head.dx = 0
    snake.head.dy = 1
  }
}

function right (snake) {
  if (snake.head.dy !== 0) {
    snake.head.dx = 1
    snake.head.dy = 0
  }
}

module.exports = (game, action) => {
  if (action !== 'clock' && game.over) {
    if (action === '1') {
      game.numSnakes = 1
    } else if (action === '2') {
      game.numSnakes = 2
    }
    return init.game(game)
  }
  switch (action) {
    case 'clock': {
      if (game.over) return game
      for (let snake of game.snake) {
        moveSnake(snake, game)
      }
      for (let snake of game.snake) {
        collideSnake(snake, game)
      }
      for (let snake of game.snake) {
        if (snake.dead) {
          game.over = true
        }
      }
      return game;
    }
    case 'w':
    case 'up': {
      up(game.snake[0])
      return game;
    }
    case 'a':
    case 'left': {
      left(game.snake[0])
      return game;
    }
    case 's':
    case 'down': {
      down(game.snake[0])
      return game;
    }
    case 'd':
    case 'right': {
      right(game.snake[0])
      return game;
    }
    case 'i': {
      up(game.snake[1])
      return game;
    }
    case 'j': {
      left(game.snake[1])
      return game;
    }
    case 'k': {
      down(game.snake[1])
      return game;
    }
    case 'l': {
      right(game.snake[1])
      return game;
    }
    default: {
      return game;
    }
  }
}
