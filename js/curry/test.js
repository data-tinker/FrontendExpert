const { curry } = require("./curry_bind")

const sum = (...numbers) => numbers.reduce((total, number) => total + number, 0)
const curriedSum = curry(sum)

console.log(curriedSum())
console.log(curriedSum(1)())
console.log(curriedSum(1)(2)())
console.log(curriedSum(1, 2)(3)(4, 5, 6)())
console.log(curriedSum(1))
console.log(curriedSum(1, 2)(3))
