interface Array<T> {
  myMap<U>(callback: (value: T, index: number, array: T[]) => U): U[]

  myFilter(callback: (value: T, index: number, array: T[]) => boolean): T[]

  myReduce(
    callback: (accumulator: T, value: T, index: number, array: T[]) => T,
    initialValue?: T,
  ): T
}

Array.prototype.myMap = function <T, U>(
  this: T[],
  callback: (value: T, index: number, array: T[]) => U,
): U[] {
  const result: U[] = []
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this))
  }
  return result
}

Array.prototype.myFilter = function <T>(
  this: T[],
  callback: (value: T, index: number, array: T[]) => boolean,
): T[] {
  const result: T[] = []
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      result.push(this[i])
    }
  }
  return result
}

Array.prototype.myReduce = function <T>(
  this: T[],
  callback: (accumulator: T, value: T, index: number, array: T[]) => T,
  initialValue?: T,
): T {
  let acc = initialValue !== undefined ? initialValue : this[0]
  let startIndex = initialValue !== undefined ? 0 : 1

  for (let i = startIndex; i < this.length; i++) {
    acc = callback(acc, this[i], i, this)
  }
  return acc
}
