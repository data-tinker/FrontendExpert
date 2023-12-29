const Promise = require("./promise")

Promise.myRace([
  new Promise(res => setTimeout(() => res(0), 500)),
  Promise.resolve(5),
  new Promise(res => setTimeout(() => res(10), 1000))
])
  .then((res) => console.log(`myRace result: ${res}`))
  .catch((error) => console.log(`myRace error: ${error}`))

Promise.myRace([
  new Promise(res => setTimeout(() => res(0), 500)),
  Promise.reject(new Error("error")),
  new Promise(res => setTimeout(() => res(10), 1000))
])
  .then((res) => console.log(`myRace result: ${res}`))
  .catch((error) => console.log(`myRace error: ${error}`))

Promise.myAny([
  new Promise(res => setTimeout(() => res(0), 500)),
  Promise.resolve(5),
  new Promise(res => setTimeout(() => res(10), 1000))
])
  .then((res) => console.log(`myAny result: ${res}`))

Promise.myAny([
  new Promise(res => setTimeout(() => res(0), 500)),
  Promise.reject(new Error("error")),
  new Promise(res => setTimeout(() => res(10), 1000))
])
  .then((res) => console.log(`myAny result: ${res}`))
  .catch((error) => console.log(`myAny error: ${error}`))

Promise.myAll([
  new Promise(res => setTimeout(() => res(0), 500)),
  Promise.resolve(5),
  new Promise(res => setTimeout(() => res(10), 1000))
])
.then((res) => console.log(`myAll result: ${res}`))

Promise.myAll([
  new Promise(res => setTimeout(() => res(0), 500)),
  Promise.reject(5),
  new Promise(res => setTimeout(() => res(10), 1000))
])
  .then((res) => console.log(`myAll result: ${res}`))
  .catch((error) => console.log(`myAll error: ${error}`))

Promise.myAllSettled([
  new Promise(res => setTimeout(() => res(0), 500)),
  Promise.resolve(5),
  new Promise(res => setTimeout(() => res(10), 1000))
])
  .then((res) => console.log(`myAllSettled result: ${JSON.stringify(res, null, 2)}`))

Promise.myAllSettled([
  new Promise(res => setTimeout(() => res(0), 500)),
  Promise.reject(5),
  new Promise(res => setTimeout(() => res(10), 1000))
])
  .then((res) => console.log(`myAllSettled result: ${JSON.stringify(res, null, 2)}`))
  .catch((error ) => console.log(`myAllSettled error: ${error}`))
