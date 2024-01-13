function deepEquals(valueOne, valueTwo) {

  // type check
  if (typeof valueOne !== typeof valueTwo) return false

  // NaN check
  if (Number.isNaN(valueOne)) return Number.isNaN(valueTwo)

  // Array vs non-array check
  if (Array.isArray(valueOne) && !Array.isArray(valueTwo)) return false
  if (!Array.isArray(valueTwo) && Array.isArray(valueOne)) return false

  // null check
  if (valueOne === null) return valueTwo === null
  if (valueTwo === null) return valueOne === null

  // matching elements of array
  if (Array.isArray(valueOne) && Array.isArray(valueTwo)) {
    if (valueOne.length !== valueTwo.length) {
      return false
    }
    for (let i = 0; i < valueOne.length; i++) {
      if (!deepEquals(valueOne[i], valueTwo[i])) {
        return false
      }
    }
    return true
  }

  if (Array.isArray(valueOne) || Array.isArray(valueTwo)) return false

  // matching every property of both objects
  if (typeof valueOne === 'object'  && typeof valueTwo === "object") {
    if (Object.keys(valueOne).length !== Object.keys(valueTwo).length) return false
    for (let key in valueOne) {
      if (!valueTwo.hasOwnProperty(key)) {
        return false
      } else if (!deepEquals(valueOne[key], valueTwo[key])) {
        return false
      }
    }
    return true
  }


  return valueOne === valueTwo
}

export { deepEquals }
