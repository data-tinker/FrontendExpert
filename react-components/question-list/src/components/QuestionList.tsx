import useQuestionsAndSubmissions from "../hooks/useQuestionsAndSubmissions"
import {
  getQuestionsByCategory,
  getSubmissionsByQuestions,
} from "../services/responseProcessing.ts"
import Category from "./Category.tsx"
import { ReactElement } from "react"

export default function QuestionList(): ReactElement {
  const [questions, submissions] = useQuestionsAndSubmissions()
  const questionsByCategory = getQuestionsByCategory(questions)
  const submissionsByQuestion = getSubmissionsByQuestions(submissions)
  const categories = Object.keys(questionsByCategory)

  return (
    <>
      {categories.map((category) => (
        <Category
          key={category}
          category={category}
          questions={questionsByCategory[category]}
          submissionsByQuestion={submissionsByQuestion}
        />
      ))}
    </>
  )
}
