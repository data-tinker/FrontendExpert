import { ReactNode, useEffect, useState } from "react"

import QuizQuestion from "../models/QuizQuestion"
import Answer from "./Answer"

const QUIZ_API_BASE_URL = "https://api.frontendexpert.io/api/fe/quiz"

export default function Quiz(): ReactNode {
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch(QUIZ_API_BASE_URL)
      const jsonResponse = await response.json()
      setQuestions(jsonResponse)
    }

    fetchQuestions()
  }, [])

  if (questions.length === 0) {
    return null
  }

  const currentQuestion = questions[currentQuestionIdx]
  const currentAnswerId = answers[currentQuestionIdx]
  const isFirstQuestion = currentQuestionIdx === 0
  const isLastQuestion = currentQuestionIdx === questions.length - 1

  const setAnswer = (answerIdx: number) => {
    if (currentAnswerId != null) {
      return
    }
    setAnswers([...answers, answerIdx])
  }

  return (
    <>
      <h1>{currentQuestion.question}</h1>
      {currentQuestion.answers.map((answer, answerIdx) => (
        <Answer
          key={answerIdx}
          answer={answer}
          onClick={() => setAnswer(answerIdx)}
          answeredCorrectly={
            answerIdx === currentAnswerId ? answerIdx === currentQuestion.correctAnswer : undefined
          }
        />
      ))}
      <button
        disabled={isFirstQuestion}
        onClick={() => setCurrentQuestionIdx((prevIdx) => prevIdx - 1)}
      >
        Back
      </button>
      <button
        disabled={currentAnswerId == null || isLastQuestion}
        onClick={() => setCurrentQuestionIdx((prevIdx) => prevIdx + 1)}
      >
        Next
      </button>
    </>
  )
}
