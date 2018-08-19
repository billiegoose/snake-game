#!/usr/bin/env node
const diffy = require('diffy')({fullscreen: true})
const keypress = require('keypress')
const render = require('./render.js')
const update = require('./update.js')

let game = require('./init.js')()
let grid = []

keypress(process.stdin);

const stop = setInterval(() => {
  game = update(game, 'clock')
  game.height = diffy.height
  game.width = Math.floor(diffy.width / 2)
  grid = render(game)
  diffy.render()
}, 250)

process.stdin.on('keypress', (ch, key) => {  
  if (key && key.ctrl && key.name == 'c') {
    clearInterval(stop)
    process.stdin.pause();
    return
  }
  game = update(game, key.name)
})

process.stdin.setRawMode(true);
// process.stdin.resume();

diffy.render(function () {
  return grid.map(row => row.join('')).join('\n')
})

diffy.render()
