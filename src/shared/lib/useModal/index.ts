import { reactive, readonly } from 'vue'

export const useModal = () => {
  const state = reactive({
    isOpen: false,
    selectedId: ''
  })

  const open = (id: string) => {
    state.selectedId = id
    state.isOpen = true
  }

  const close = () => {
    state.selectedId = ''
    state.isOpen = false
  }

  return {
    state: readonly(state),
    open,
    close
  }
}
