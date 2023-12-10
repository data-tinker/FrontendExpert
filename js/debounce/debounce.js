export default function debounce(callback, delay, immediate = false) {
  let timerID

  // arrow function (...args) => wouldn't work here
  // because it wouldn't capture the "this" value
  // this is known as lexical scoping
  return function(...args) {
    console.log(this)
    clearTimeout(timerID)

    if (timerID == null && immediate) {
      callback.apply(this, args)
    }

    timerID = setTimeout(() => {
      if (!immediate) {
        callback.apply(this, args)
      }
      timerID = null
    }, delay)
  }
}
