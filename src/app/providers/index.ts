import { type App } from 'vue'
import { withRouter } from './router'
import { withTheme } from './theme'

export const withProviders = async (app: App) => {
  withTheme()

  const { app: appWithRouter, router} = withRouter(app)

  return {
    app: appWithRouter,
    router
  }
}
