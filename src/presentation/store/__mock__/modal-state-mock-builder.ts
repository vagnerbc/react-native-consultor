import { ModalTypes } from 'types/modal'

import { State, initialState, PropsType } from '../ducks/modal'

export class ModalStateMockBuilder {
  private isOpen = false
  private currentModal: keyof ModalTypes | null = 'cliente'
  private propsByName: PropsType = {}

  withIsOpen(value: boolean) {
    this.isOpen = value
    return this
  }

  withCurrentModal(value: keyof ModalTypes | null) {
    this.currentModal = value
    return this
  }

  withPropsByName(value: PropsType) {
    this.propsByName = value
    return this
  }

  build(): State {
    return {
      ...initialState,
      currentModal: this.currentModal,
      isOpen: this.isOpen,
      propsByName: this.propsByName
    }
  }
}
