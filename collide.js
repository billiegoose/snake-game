module.exports = {
  wallCheck (head, game) {
    return (head.x < 1 || head.x > game.width - 2 || head.y < 1 || head.y > game.height - 2)
  },
  tailCheck (head, tail) {
    for (let point of tail) {
      if (head.x === point.x && head.y === point.y) {
        return true
      }
    }
    return false
  },
  cookieCheck (head, cookie) {
    return head.x === cookie.x && head.y === cookie.y
  }
}
