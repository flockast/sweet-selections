import { type App } from 'vue'
import { withRouter } from './router'
import { withTheme } from './theme'
import { withHttpClients } from './httpClients'
import { withData } from './data'

export const withProviders = async (app: App) => {
  withTheme()
  withHttpClients()
  await withData()

  const { app: appWithRouter, router} = withRouter(app)

  return {
    app: appWithRouter,
    router
  }
}
