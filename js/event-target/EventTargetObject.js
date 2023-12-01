export default class EventTarget {
  constructor() {
    this.eventsToCallbacks = {}
  }

  addEventListener(name, callback) {
    if (!this.eventsToCallbacks.hasOwnProperty(name)) {
      this.eventsToCallbacks[name] = new Set()
    }

    this.eventsToCallbacks[name].add(callback)
  }

  removeEventListener(name, callback) {
    this.eventsToCallbacks[name]?.delete(callback)
  }

  dispatchEvent(name) {
    this.eventsToCallbacks[name]?.forEach(callback => {
      callback()
    })
  }
}
