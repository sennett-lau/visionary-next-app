export interface ILearningSummary {
  section: number
  title: string
  content: string
}

export interface ILearningQuiz {
  section: number
  number: number
  question: string
  options: ILearningQuizOption[]
  answer: string // label of the correct option
}

export interface ILearningQuizOption {
  label: string // A, B, C, D
  value: string // the answer
}

export interface ILearningRevealedQuestion {
  section: number
  question: number
}

export interface ILeaningUserAnswer {
  section: number
  question: number
  answer: string // the label of the selected option
}

export interface ILearningState {
  summary: ILearningSummary[]
  quiz: ILearningQuiz[]
  currentSection: number
  revealedSections: number[]
  revealedQuestions: number[]
  userAnswers: ILeaningUserAnswer[]
}
