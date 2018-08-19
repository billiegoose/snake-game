#!/usr/bin/env node
const diffy = require('diffy')({fullscreen: true})
const keypress = require('keypress')
const init = require('./init.js')
const update = require('./update.js')
const render = require('./render.js')

function settings () {
  return {
    numSnakes: 2,
    height: diffy.height,
    width: Math.floor(diffy.width / 2)
  }
}

let game = init.game(settings())
let grid = ''

keypress(process.stdin);

const stop = setInterval(() => {
  game.height = diffy.height
  game.width = Math.floor(diffy.width / 2)
  game = update(game, 'clock')
  grid = render(game)
  diffy.render()
}, 100)

process.stdin.on('keypress', (ch, key) => {  
  if (key && key.ctrl && key.name == 'c') {
    clearInterval(stop)
    process.stdin.pause();
    return
  }
  if (key) {
    game = update(game, key.name)
  } else {
    game = update(game, ch)
  }
})

process.stdin.setRawMode(true);
// process.stdin.resume();

diffy.render(function () {
  return grid
})
