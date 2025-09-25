import { LOCAL_STORAGE_THEME_KEY, THEMES } from '../constants'

export const getInitialTheme = () => {
  const localStorageTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY)

  if (localStorageTheme === THEMES.DARK || localStorageTheme === THEMES.LIGHT) {
    return localStorageTheme
  }

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return THEMES.DARK
  }

  return THEMES.LIGHT
}
