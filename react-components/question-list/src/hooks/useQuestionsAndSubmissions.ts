import { useEffect, useState } from "react"

const QUESTIONS_API_BASE_URL = "https://api.frontendexpert.io/api/fe/questions"
const SUBMISSIONS_API_BASE_URL = "https://api.frontendexpert.io/api/fe/submissions"

export default function useQuestionsAndSubmissions(): [QuestionType[], SubmissionType[]] {
  const [questions, setQuestions] = useState<QuestionType[]>([])
  const [submissions, setSubmissions] = useState<SubmissionType[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const [questionsResponse, submissionsResponse] = await Promise.all([
        fetch(QUESTIONS_API_BASE_URL),
        fetch(SUBMISSIONS_API_BASE_URL),
      ])
      const [questions, submissions] = await Promise.all([
        questionsResponse.json(),
        submissionsResponse.json(),
      ])

      setQuestions(questions)
      setSubmissions(submissions)
    }

    fetchData()
  }, [])

  return [questions, submissions]
}
