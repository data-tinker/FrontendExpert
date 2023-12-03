const BOARD_SIZE = 3

const Player = {
  FIRST: 1,
  SECOND: 2,
}

let boardState = generateEmptyBoardState()
let currentPlayer = Player.FIRST
let numMovesDone = 0

const gameHeading = document.getElementById("game-heading")
const gameSquares = document.querySelectorAll(".game-square")
const restartButton = document.getElementById("restart-button")

gameSquares.forEach((gameSquare, i) => {
  gameSquare.addEventListener("click", () => {
    const row = Math.floor(i / BOARD_SIZE)
    const col = i % BOARD_SIZE
    makeMove(gameSquare, row, col)
  })
})

restartButton.addEventListener("click", restartGame)

function makeMove(gameSquare, row, col) {
  gameSquare.textContent = currentPlayer === Player.FIRST ? "X" : "O"
  gameSquare.disabled = true
  numMovesDone++
  boardState[row][col] = currentPlayer

  if (didPlayerWin()) {
    gameHeading.textContent = `Player ${currentPlayer} Won!`
    endGame()
  } else if (numMovesDone >= BOARD_SIZE * BOARD_SIZE) {
    gameHeading.textContent = "Tie Game!"
    endGame()
  } else {
    currentPlayer = currentPlayer === Player.FIRST ? Player.SECOND : Player.FIRST
    setCurrentPlayerHeading()
  }
}

function didPlayerWin() {
  // Check if the player got a vertical line
  for (let row = 0; row < BOARD_SIZE; row++) {
    let wonHorizontal = true
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (boardState[row][col] !== currentPlayer) {
        wonHorizontal = false
        break
      }
    }

    if (wonHorizontal) {
      return true
    }
  }

  // Check if the player got a horizontal line
  for (let col = 0; col < BOARD_SIZE; col++) {
    let wonVertical = true
    for (let row = 0; row < BOARD_SIZE; row++) {
      if (boardState[row][col] !== currentPlayer) {
        wonVertical = false
        break
      }
    }

    if (wonVertical) {
      return true
    }
  }

  // Check if the player got a diagonal line, top left to bottom right
  let wonTopLeftToBottomRight = true
  for (let i = 0; i < BOARD_SIZE; i++) {
    if (boardState[i][i] !== currentPlayer) {
      wonTopLeftToBottomRight = false
      break
    }
  }

  if (wonTopLeftToBottomRight) {
    return true
  }

  // Check if the player got a diagonal line, top right to bottom left
  let wonTopRightToBottomLeft = true
  for (let i = 0; i < BOARD_SIZE; i++) {
    if (boardState[i][BOARD_SIZE - i - 1] !== currentPlayer) {
      wonTopRightToBottomLeft = false
      break
    }
  }

  return wonTopRightToBottomLeft
}

function endGame() {
  restartButton.style.display = "block"
  gameSquares.forEach((gameSquare) => {
    gameSquare.disabled = true
  })
}

function setCurrentPlayerHeading() {
  gameHeading.textContent = `Player ${currentPlayer}'s Turn`
}

function restartGame() {
  boardState = generateEmptyBoardState()
  currentPlayer = Player.FIRST
  numMovesDone = 0
  setCurrentPlayerHeading()
  gameSquares.forEach((gameSquare) => {
    gameSquare.textContent = ""
    gameSquare.disabled = false
  })
  restartButton.style.display = "none"
}

function generateEmptyBoardState() {
  return new Array(BOARD_SIZE).fill().map(() => new Array(BOARD_SIZE).fill())
}
