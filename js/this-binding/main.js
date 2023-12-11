require("./binding")

const obj = {num: 0}

function logNums(x, y) {
  console.log(this.num, x, y)
}

logNums.myCall(obj, 1, 2)
logNums.myApply(obj, [1, 2])

const boundFunction = logNums.myBind(obj, 1)
boundFunction(2)
