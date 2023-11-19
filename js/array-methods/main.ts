import "./array-methods"

const array = [1, 2, 3]

const mappedArray1 = array.myMap((value, i, arr) => {
  return value + i + arr[1]
})

const mappedArray2 = array.myMap((num) => num * 2)

console.log(mappedArray1)
console.log(mappedArray2)

const filteredArray = array.myFilter((value, i, arr) => {
  return value + i + arr[1] > 5
})

console.log(filteredArray)

const reducedValue1 = array.myReduce((acc, value, i, arr) => {
  return acc + value + i + arr[1]
}, 3)
const reducedValue2 = array.myReduce((acc, value, i, arr) => {
  return acc + value
})

console.log(reducedValue1)
console.log(reducedValue2)
