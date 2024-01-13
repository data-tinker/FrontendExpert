const { flatten } = require("./flatten")

console.log(flatten(1))
console.log(flatten({a: 1, b: {c : 2, d: 3, e: {f: 4}}}))
