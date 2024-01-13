const defaultResolver = (...args) => {
  return JSON.stringify(args)
}

function memoize(callback, resolver=defaultResolver) {
  const cache = new Map()

  const memoizedFn = function(...args) {
    const key = resolver(...args);
    if (cache.has(key)) {
      return cache.get(key)
    }

    const value = callback.call(this, ...args)
    cache.set(key, value)
    return value
  }

  memoizedFn.clear = () => {
    cache.clear()
  }

  memoizedFn.delete = (...args) => {
    const key = resolver(...args)
    cache.delete(key)
  }

  memoizedFn.has = (...args) => {
    const key = resolver(...args)
    return cache.has(key)
  }

  return memoizedFn
}

// Do not edit the line below.
exports.memoize = memoize;
