import { readonly, reactive } from 'vue'

type TypeState = {
  isVisible: boolean
}

const state = reactive<TypeState>({
  isVisible: false
})

export const useWelcomePopup = () => {
  const show = () => {
    state.isVisible = true
  }

  const hide = () => {
    state.isVisible = false
  }

  return {
    state: readonly(state) as TypeState,
    show,
    hide
  }
}
