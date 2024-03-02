import { IControlSetImageModalOpenAction, IControlState } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import { IControlSetPanelStateAction, PanelState } from '../types/control'

const initialState: IControlState = {
  isImageModalOpen: false,
  imageModalSrc: '',
  panelState: PanelState.inputs,
}

const slice = createSlice({
  name: 'control',
  initialState,
  reducers: {
    setImageModalOpen(state, action: IControlSetImageModalOpenAction) {
      state.isImageModalOpen = action.payload.isImageModalOpen
      state.imageModalSrc = action.payload.imageModalSrc || ''
    },
    setPanelState(state, action: IControlSetPanelStateAction) {
      state.panelState = action.payload.panelState
    },
  },
})

export const { setImageModalOpen, setPanelState } = slice.actions

export default slice
