import { JSDOM } from "jsdom"
import { readFileSync } from "fs"
import { expect } from "chai"
import FakeTimers, { InstalledClock } from "@sinonjs/fake-timers"

const html = readFileSync("index.html", "utf-8")
const clock: InstalledClock = FakeTimers.install()

let timer: HTMLElement
let startButton: HTMLButtonElement
let stopButton: HTMLButtonElement
let resetButton: HTMLButtonElement

const resetDom = () => {
  const dom = new JSDOM(html, {
    resources: "usable",
    pretendToBeVisual: true,
  })

  // Assign types to global objects
  global.document = dom.window.document as unknown as Document
  global.window = dom.window as unknown as Window & typeof globalThis
  global.requestAnimationFrame = (callback: FrameRequestCallback) => {
    return dom.window.requestAnimationFrame(callback)
  }
  global.cancelAnimationFrame = dom.window.cancelAnimationFrame

  Object.defineProperty(window.HTMLElement.prototype, "innerText", {
    configurable: true,
    get() {
      return this.textContent
    },
    set(val: string) {
      this.textContent = val
    },
  })

  // Clearing the module cache and requiring the JS module
  // Depending on your setup, you may need to adjust this part
  delete require.cache[require.resolve("../mainUsingInterval")]
  require("../mainUsingInterval")

  timer = document.getElementById("timer") as HTMLElement
  startButton = document.getElementById("start-button") as HTMLButtonElement
  stopButton = document.getElementById("stop-button") as HTMLButtonElement
  resetButton = document.getElementById("reset-button") as HTMLButtonElement
}

const TIMER_FORMAT_REGEX = /\d{2}:\d{2}:\d{3}/

const assertTimerMilliseconds = (expectedMilliseconds: number) => {
  const DELTA_MS = 20
  const timerMilliseconds = timerStringToMilliseconds(timer.textContent || "")
  expect(timerMilliseconds).to.be.closeTo(expectedMilliseconds, DELTA_MS)
}

const timerStringToMilliseconds = (timeString: string): number => {
  const [minutes, seconds, milliseconds] = timeString.split(":").map(Number)
  return minutes * 60 * 1000 + seconds * 1000 + milliseconds
}

describe("stopwatch", () => {
  beforeEach(() => {
    resetDom()
    clock.reset()
  })

  describe("active state", () => {
    beforeEach(() => {
      startButton.click()
    })

    describe("buttons", () => {
      it("start button should be disabled", () => {
        expect(startButton.disabled).to.be.equal(true)
      })

      it("stop button should be enabled", () => {
        expect(stopButton.disabled).to.be.equal(false)
      })

      it("reset button should be disabled", () => {
        expect(resetButton.disabled).to.be.equal(true)
      })
    })

    describe("timer", () => {
      it("should have the correct format", () => {
        expect(timer.textContent).to.match(TIMER_FORMAT_REGEX)
      })

      it("should count up correctly", () => {
        clock.tick(1000)
        assertTimerMilliseconds(1000)
        clock.tick(1000)
        assertTimerMilliseconds(2000)
        clock.tick(1000)
        assertTimerMilliseconds(3000)
      })
    })
  })
})
