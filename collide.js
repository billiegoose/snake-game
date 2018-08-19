function wallCheck (head, game) {
  return (head.x < 1 || head.x > game.width - 2 || head.y < 1 || head.y > game.height - 2)
}

function headCheck (head, point) {
  return head.x === point.x && head.y === point.y
}

function tailCheck (head, tail) {
  for (let point of tail) {
    if (headCheck(head, point)) {
      return true
    }
  }
  return false
}

function cookieCheck (head, cookie) {
  return head.x === cookie.x && head.y === cookie.y
}

module.exports = {
  wallCheck,
  headCheck,
  tailCheck,
  cookieCheck
}
