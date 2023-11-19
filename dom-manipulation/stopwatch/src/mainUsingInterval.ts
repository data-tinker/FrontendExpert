const INTERVAL_MS = 1000 / 60

let timerId: NodeJS.Timeout
let lastTimerStartTime = 0
let millisElapsedBeforeLastStart = 0

const timer = document.getElementById("timer")!
const startButton = document.getElementById("start-button") as HTMLButtonElement
const stopButton = document.getElementById("stop-button") as HTMLButtonElement
const resetButton = document.getElementById("reset-button") as HTMLButtonElement

startButton.addEventListener("click", startTimer)
stopButton.addEventListener("click", stopTimer)
resetButton.addEventListener("click", resetTimer)

function startTimer() {
  startButton.disabled = true
  stopButton.disabled = false
  resetButton.disabled = true

  lastTimerStartTime = Date.now()
  timerId = setInterval(updateTimer, INTERVAL_MS)
}

function stopTimer() {
  startButton.disabled = false
  stopButton.disabled = true
  resetButton.disabled = false

  millisElapsedBeforeLastStart += Date.now() - lastTimerStartTime

  clearInterval(timerId)
}

function resetTimer() {
  resetButton.disabled = true
  timer.textContent = "00:00:000"

  millisElapsedBeforeLastStart = 0
}

function updateTimer() {
  const millisElapsed = Date.now() - lastTimerStartTime + millisElapsedBeforeLastStart
  const secondsElapsed = millisElapsed / 1000
  const minutesElapsed = secondsElapsed / 60

  const millisText = formatNumber(millisElapsed % 1000, 3)
  const secondsText = formatNumber(Math.floor(secondsElapsed) % 60, 2)
  const minutesText = formatNumber(Math.floor(minutesElapsed), 2)

  timer.textContent = `${minutesText}:${secondsText}:${millisText}`
}

function formatNumber(num: number, desiredLength: number): string {
  const stringNumber = String(num)
  return stringNumber.padStart(desiredLength, "0")
}
