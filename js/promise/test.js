const { MyPromise } = require("./MyPromise")

const promise = new MyPromise((res, rej) => {
  res(10)
})
promise.then(val => {
  console.log(val)
  return val + 10
}).then(val => {
  console.log(val)
  return val + 9
}).then(val => {
  console.log(val)
  return val + 8
}, val => {
  console.log("error: " + val)
  return val + 7
}).then(val => {
  console.log(val)
  return val + 6
}).catch(val => {
  console.log("error: " + val)
  return val + 5
}).then(val => {
  console.log(val)
  throw new Error("oops")
}).catch(err => {
  console.log("error: " + err)
})

console.log("end")
