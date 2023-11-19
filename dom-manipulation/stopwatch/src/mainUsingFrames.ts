let timerIdFrame: number
let lastTimerStartTimeFrame = 0
let millisElapsedBeforeLastStartFrame = 0

const timerFrame = document.getElementById("timer")!
const startButtonFrame = document.getElementById("start-button") as HTMLButtonElement
const stopButtonFrame = document.getElementById("stop-button") as HTMLButtonElement
const resetButtonFrame = document.getElementById("reset-button") as HTMLButtonElement

startButtonFrame.addEventListener("click", startTimerFrame)
stopButtonFrame.addEventListener("click", stopTimerFrame)
resetButtonFrame.addEventListener("click", resetTimerFrame)

function startTimerFrame() {
  startButtonFrame.disabled = true
  stopButtonFrame.disabled = false
  resetButtonFrame.disabled = true

  lastTimerStartTimeFrame = Date.now()
  timerIdFrame = requestAnimationFrame(updateTimerFrame)
}

function stopTimerFrame() {
  startButtonFrame.disabled = false
  stopButtonFrame.disabled = true
  resetButtonFrame.disabled = false

  millisElapsedBeforeLastStartFrame += Date.now() - lastTimerStartTimeFrame

  cancelAnimationFrame(timerIdFrame)
}

function resetTimerFrame() {
  resetButtonFrame.disabled = true
  timerFrame.textContent = "00:00:000"

  millisElapsedBeforeLastStart = 0
}

function updateTimerFrame() {
  const millisElapsed = Date.now() - lastTimerStartTimeFrame + millisElapsedBeforeLastStartFrame
  const secondsElapsed = millisElapsed / 1000
  const minutesElapsed = secondsElapsed / 60

  const millisText = formatNumberFrame(millisElapsed % 1000, 3)
  const secondsText = formatNumberFrame(Math.floor(secondsElapsed) % 60, 2)
  const minutesText = formatNumberFrame(Math.floor(minutesElapsed), 2)

  timerFrame.textContent = `${minutesText}:${secondsText}:${millisText}`

  timerIdFrame = requestAnimationFrame(updateTimerFrame)
}

function formatNumberFrame(num: number, desiredLength: number): string {
  const stringNumber = String(num)
  return stringNumber.padStart(desiredLength, "0")
}
