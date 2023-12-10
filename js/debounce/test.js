import debounce from "./debounce.js"

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const myObject = {
  value: 'Hello, World!',
  myMethod() {
    console.log(this.value);
  }
};

const debounced = debounce(myObject.myMethod, 3000, true);
debounced.call(myObject);

await sleep(4000)
