import { readonly, reactive } from 'vue'

type TypeState = {
  isVisible: boolean
}

const state = reactive<TypeState>({
  isVisible: true
})

export const useGreetingPopup = () => {
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
