const { memoize } = require('./memoize')

const callback = (...args) => {
  console.log('called')
  return args
}
const memoized = memoize(callback)

console.log(memoized(123))
console.log(memoized(123))
console.log(memoized(123, "abc"))
