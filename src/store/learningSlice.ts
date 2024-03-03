import {
  ILearningAddRevealedQuestionAction,
  ILearningAddRevealedSectionAction,
  ILearningAddUserAnswerAction,
  ILearningSetCurrentSectionAction,
  ILearningSetQuizzesAction,
  ILearningSetSummariesAction,
  ILearningState,
} from '@/types'
import { createSlice } from '@reduxjs/toolkit'

const initialState: ILearningState = {
  summaries: [],
  quizzes: [],
  currentSection: 0,
  revealedSections: [],
  revealedQuestions: [],
  userAnswers: [],
}

const slice = createSlice({
  name: 'learning',
  initialState,
  reducers: {
    setSummaries(state, action: ILearningSetSummariesAction) {
      state.summaries = action.payload.summaries
    },
    setQuizzes(state, action: ILearningSetQuizzesAction) {
      state.quizzes = action.payload.quizzes
    },
    setCurrentSection(state, action: ILearningSetCurrentSectionAction) {
      state.currentSection = action.payload.currentSection
    },
    addRevealedSection(state, action: ILearningAddRevealedSectionAction) {
      state.revealedSections.push(action.payload.section)
    },
    addRevealedQuestion(state, action: ILearningAddRevealedQuestionAction) {
      const clone = [...state.revealedQuestions]
      const existingIndex = clone.findIndex(
        (rq) =>
          rq.section === action.payload.section &&
          rq.questionNumber === action.payload.questionNumber,
      )
      if (existingIndex !== -1) {
        clone[existingIndex] = action.payload
      } else {
        clone.push(action.payload)
      }
      state.revealedQuestions = clone
    },
    addUserAnswer(state, action: ILearningAddUserAnswerAction) {
      const clone = [...state.userAnswers]
      const existingIndex = clone.findIndex(
        (ua) =>
          ua.section === action.payload.section &&
          ua.question === action.payload.question,
      )
      if (existingIndex !== -1) {
        clone[existingIndex] = action.payload
      } else {
        clone.push(action.payload)
      }
      state.userAnswers = clone
    },
  },
})

export const {
  setSummaries,
  setQuizzes,
  setCurrentSection,
  addRevealedSection,
  addRevealedQuestion,
  addUserAnswer,
} = slice.actions

export default slice
