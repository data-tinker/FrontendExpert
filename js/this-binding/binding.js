Function.prototype.myCall = function (thisContext, ...args) {
  const symbol = Symbol()
  thisContext[symbol] = this
  const returnValue = thisContext[symbol](...args)
  delete thisContext[symbol]
  return returnValue
};

Function.prototype.myApply = function (thisContext, args = []) {
  const symbol = Symbol()
  thisContext[symbol] = this
  const returnValue = thisContext[symbol](...args)
  delete thisContext[symbol]
  return returnValue
};

Function.prototype.myBind = function (thisContext, ...args) {
  return (...newArgs) => {
    const symbol = Symbol()
    thisContext[symbol] = this
    const returnVal = thisContext[symbol](...args, ...newArgs)
    delete thisContext[symbol]
    return returnVal
  }
};
