export function getQuestionsByCategory(questions: QuestionType[]): Record<string, QuestionType[]> {
  const questionsByCategory: Record<string, QuestionType[]> = {}
  questions.forEach((question) => {
    if (!(question.category in questionsByCategory)) {
      questionsByCategory[question.category] = []
    }
    questionsByCategory[question.category].push(question)
  })
  return questionsByCategory
}

export function getSubmissionsByQuestions(submissions: SubmissionType[]): Record<string, string> {
  const submissionsByQuestion: Record<string, string> = {}
  submissions.forEach((submission) => {
    submissionsByQuestion[submission.questionId] = submission.status
  })
  return submissionsByQuestion
}
