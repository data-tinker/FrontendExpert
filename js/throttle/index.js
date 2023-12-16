const { throttle}  = require("./throttle.js")

const throttled = throttle(console.log, 3000)

throttled("hello ")
throttled("world!")
throttled.cancel()
throttled("world!")
