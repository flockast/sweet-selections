import { reactive, readonly } from 'vue'
import { THEMES, LOCAL_STORAGE_THEME_KEY } from './theme.constants'

type TypeState = {
  theme: typeof THEMES[keyof  typeof THEMES]
}

const state = reactive<TypeState>({
  theme: THEMES.LIGHT
})

export const useTheme = () => {
  const setTheme = (payload: TypeState['theme']) => {
    state.theme = payload
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, state.theme)
    document.documentElement.setAttribute('theme', state.theme)
  }

  const toggleTheme = () => {
    const newTheme = state.theme === THEMES.DARK
      ? THEMES.LIGHT
      : THEMES.DARK
    setTheme(newTheme)
  }

  return {
    state: readonly(state) as TypeState,
    setTheme,
    toggleTheme
  }
}
