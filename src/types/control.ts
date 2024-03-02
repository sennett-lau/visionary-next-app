import { Action } from 'redux'

export interface IControlState {
  isImageModalOpen: boolean
  imageModalSrc: string
  panelState: PanelState
}

export interface IControlSetImageModalOpenAction extends Action {
  payload: {
    isImageModalOpen: boolean
    imageModalSrc?: string
  }
}

export interface IControlSetPanelStateAction extends Action {
  payload: {
    panelState: PanelState
  }
}

export enum PanelState {
  inputs = 'inputs',
  loading = 'loading',
  learning = 'learning',
}
