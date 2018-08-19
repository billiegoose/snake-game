module.exports = () => ({
  over: false,
  overMessage: '',
  cookie: {
    x: 2,
    y: 2
  },
  snake: {
    head: {
      x: 1,
      y: 1,
      dx: 1,
      dy: 0
    },
    length: 3,
    tail: []
  }
})
