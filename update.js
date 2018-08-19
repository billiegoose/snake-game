const init = require('./init.js')

module.exports = (game, action) => {
  if (action !== 'clock' && game.over) {
    return init()
  }
  switch (action) {
    case 'clock': {
      if (game.over) return game
      game.snake.tail.unshift({
        x: game.snake.head.x,
        y: game.snake.head.y
      })
      game.snake.tail = game.snake.tail.slice(0, game.snake.length)
      game.snake.head.x += game.snake.head.dx
      game.snake.head.y += game.snake.head.dy
      
      if (game.snake.head.x < 1 || game.snake.head.x > game.width - 2
        || game.snake.head.y < 1 || game.snake.head.y > game.height - 2) {
        game.over = true
        game.overMessage = 'You hit a wall'
        return game
      }
      for (let point of game.snake.tail) {
        if (game.snake.head.x === point.x && game.snake.head.y === point.y) {
          game.over = true
          game.overMessage = 'You hit yourself'
          return game
        }
      }
      if (game.snake.head.x === game.cookie.x && game.snake.head.y === game.cookie.y) {
        game.snake.length += 1
        game.cookie.x = 1 + Math.floor(Math.random() * (game.width - 2))
        game.cookie.y = 1 + Math.floor(Math.random() * (game.height - 2))
      }
      return game;
    }
    case 'down': {
      if (game.snake.head.dx !== 0) {
        game.snake.head.dx = 0
        game.snake.head.dy = 1
      }
      return game;
    }
    case 'right': {
      if (game.snake.head.dy !== 0) {
        game.snake.head.dx = 1
        game.snake.head.dy = 0
      }
      return game;
    }
    case 'up': {
      if (game.snake.head.dx !== 0) {
        game.snake.head.dx = 0
        game.snake.head.dy = -1
      }
      return game;
    }
    case 'left': {
      if (game.snake.head.dy !== 0) {
        game.snake.head.dx = -1
        game.snake.head.dy = 0
      }
      return game;
    }
  }
}
