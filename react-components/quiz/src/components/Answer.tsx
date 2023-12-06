import { ReactNode } from "react"

interface AnswerProps {
  answer: string
  answeredCorrectly?: boolean
  onClick: () => void
}

export default function Answer({ answer, answeredCorrectly, onClick }: AnswerProps): ReactNode {
  let className = "answer"
  if (answeredCorrectly != undefined) {
    className += answeredCorrectly ? " correct" : " incorrect"
  }

  return (
    <h2 className={className} onClick={onClick}>
      {answer}
    </h2>
  )
}
