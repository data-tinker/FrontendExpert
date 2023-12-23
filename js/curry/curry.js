function curry(callback) {
  const curried = (...args) => {
    if (args.length === 0) {
      return callback()
    }

    return (...otherArgs) => {
      if (otherArgs.length === 0) {
        return callback(...args)
      }

      return curried(...args, ...otherArgs)
    }
  }

  return curried
}

exports.curry = curry
