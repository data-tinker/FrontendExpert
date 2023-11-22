import Question from "./Question.tsx"
import { ReactElement } from "react"

interface CategoryProps {
  category: string
  questions: QuestionType[]
  submissionsByQuestion: Record<string, string>
}

export default function Category({
  category,
  questions,
  submissionsByQuestion,
}: CategoryProps): ReactElement {
  const totalQuestions = questions.length
  const numQuestionsCorrect = questions.reduce((sum, question) => {
    return submissionsByQuestion[question.id] === "CORRECT" ? sum + 1 : sum
  }, 0)

  return (
    <div className="category">
      <h2>
        {category} - {numQuestionsCorrect} / {totalQuestions}
      </h2>
      {questions.map((question) => (
        <Question
          key={question.id}
          question={question}
          submissionsByQuestion={submissionsByQuestion}
        />
      ))}
    </div>
  )
}
