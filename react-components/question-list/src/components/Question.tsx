import { ReactElement } from "react"

interface QuestionProps {
  question: QuestionType
  submissionsByQuestion: Record<string, string>
}

export default function Question({ question, submissionsByQuestion }: QuestionProps): ReactElement {
  const submissionsStatus = submissionsByQuestion[question.id]
  const statusClass =
    submissionsStatus == null ? "unattempted" : submissionsStatus.toLowerCase().replace("_", "-")

  return (
    <div className="question">
      <div className={`status ${statusClass}`} />
      <h3>{question.name}</h3>
    </div>
  )
}
