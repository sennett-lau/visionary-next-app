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
  questionNumber: number
  userAnswer: string
  quizAnswer: string
}

export interface ILeaningUserAnswer {
  section: number
  question: number
  answer: string // the label of the selected option
}

export interface ILearningState {
  summaries: ILearningSummary[]
  quizzes: ILearningQuiz[]
  currentSection: number
  revealedSections: number[]
  revealedQuestions: ILearningRevealedQuestion[]
  userAnswers: ILeaningUserAnswer[]
}

export interface ILearningSetSummariesAction {
  payload: {
    summaries: ILearningSummary[]
  }
}

export interface ILearningSetQuizzesAction {
  payload: {
    quizzes: ILearningQuiz[]
  }
}

export interface ILearningSetCurrentSectionAction {
  payload: {
    currentSection: number
  }
}

export interface ILearningAddRevealedSectionAction {
  payload: {
    section: number
  }
}

export interface ILearningAddRevealedQuestionAction {
  payload: {
    section: number
    questionNumber: number
    userAnswer: string
    quizAnswer: string
  }
}

export interface ILearningAddUserAnswerAction {
  payload: {
    section: number
    question: number
    answer: string
  }
}
