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
      state.revealedQuestions.push(action.payload.question)
    },
    addUserAnswer(state, action: ILearningAddUserAnswerAction) {
      state.userAnswers = state.userAnswers.filter(
        (ua) =>
          ua.section !== action.payload.section &&
          ua.question !== action.payload.question,
      )
      state.userAnswers.push(action.payload)
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
