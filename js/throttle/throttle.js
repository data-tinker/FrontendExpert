function throttle(callback, delay) {
  let lastTimeCalled = 0
  let timerID = null

  const throttled =  function(...args) {
    const now = Date.now()
    const timesSinceLastCall = now - lastTimeCalled
    const delayRemaining = delay - timesSinceLastCall

    if (delayRemaining <= 0) {
      lastTimeCalled = now
      callback.apply(this, args)
    } else {
      clearTimeout(timerID)
      timerID = setTimeout(() => {
        lastTimeCalled = Date.now()
        callback.apply(this, args)
      }, delayRemaining)
    }
  }

  throttled.cancel = function() {
    clearTimeout(timerID)
  }

  return throttled
}

exports.throttle = throttle
