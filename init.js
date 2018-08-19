const chalk = require('chalk')

function cookie (game) {
  return {    
    x: 1 + Math.floor(Math.random() * (game.width - 2)),
    y: 1 + Math.floor(Math.random() * (game.height - 2))
  }
}

function snakes (game) {
  if (game.numSnakes === 1) {
    return [
      {
        color: chalk.bgRed,
        name: 'You',
        pronouns: {
          object: 'yourself'
        },
        dead: false,
        head: {
          x: Math.floor((game.width - 2) / 2),
          y: Math.floor((game.height - 2) / 2),
          dx: 0,
          dy: -1
        },
        length: 3,
        tail: [],
        actionQueue: [],
        score: 0
      }
    ]
  }
  if (game.numSnakes === 2) {
    return [
      {
        color: chalk.bgRed,
        name: 'Red',
        pronouns: {
          object: 'itself'
        },
        dead: false,
        head: {
          x: 1,
          y: Math.floor((game.height - 2) / 2),
          dx: 1,
          dy: 0
        },
        length: 3,
        tail: [],
        actionQueue: [],
        score: game.snake && game.snake[0].score || 0
      },
      {
        color: chalk.bgBlue,
        name: 'Blue',
        pronouns: {
          object: 'itself'
        },
        dead: false,
        head: {
          x: game.width - 2,
          y: Math.floor((game.height - 2) / 2),
          dx: -1,
          dy: 0
        },
        length: 3,
        tail: [],
        actionQueue: [],
        score: game.snake && game.snake[1].score || 0
      }
    ]
  }
}

function game (game) {
  return {
    over: false,
    numSnakes: game.numSnakes,
    width: game.width,
    height: game.height,
    overMessage: '',
    cookie: cookie(game),
    snake: snakes(game)
  }
}

module.exports = {
  game,
  cookie 
}
