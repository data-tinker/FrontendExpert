export default class EventTarget {
  constructor() {
    this.eventsToCallbacks = new Map()
  }

  addEventListener(name, callback) {
    if (!this.eventsToCallbacks.has(name)) {
      this.eventsToCallbacks.set(name, new Set())
    }
    this.eventsToCallbacks.get(name).add(callback)
  }

  removeEventListener(name, callback) {
    if (!this.eventsToCallbacks.has(name)) {
      return
    }
    const callbacks = this.eventsToCallbacks.get(name)
    callbacks.delete(callback)
    if (callbacks.size === 0) {
      this.eventsToCallbacks.delete(name)
    }
  }

  dispatchEvent(name) {
    if (!this.eventsToCallbacks.has(name)) {
      return
    }

    for (const cb of this.eventsToCallbacks.get(name)) {
      cb()
    }
  }
}
