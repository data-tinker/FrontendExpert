const promisify = require("./promisify")

function adder(x, y, handleErrorAndValue) {
  const value = x + y
  if (typeof value !== "number") {
    const error = new Error("Not a number")
    handleErrorAndValue(error, null)
  } else {
    handleErrorAndValue(null, value)
  }
}

const promisifiedAdder = promisify(adder)

promisifiedAdder(1, 2)
  .then(console.log)
  .catch(console.error)

promisifiedAdder(1, "foobar")
  .then(console.log)
  .catch(console.error)
