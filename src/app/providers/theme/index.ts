import { useTheme, getInitialTheme } from '@/entities/theme'

export const withTheme = () => {
  const theme = useTheme()
  const initialTheme = getInitialTheme()
  theme.setTheme(initialTheme)
}
