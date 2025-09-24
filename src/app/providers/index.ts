import { type App } from 'vue'
import { withRouter } from './router'

export const withProviders = async (app: App) => {
  const { app: appWithRouter, router} = withRouter(app)

  return {
    app: appWithRouter,
    router
  }
}
