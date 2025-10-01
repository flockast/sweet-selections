import { type App } from 'vue'
import { withRouter } from './router'
import { withTheme } from './theme'
import { withHttpClients } from './httpClients'
import { withData } from './data'
import { withCache } from './cache'
import { withWelcomePopup } from './welcomePopup'

export const withProviders = async (app: App) => {
  withTheme()
  withHttpClients()
  await withData()
  withCache()

  const { app: appWithRouter, router} = await withRouter(app)

  withWelcomePopup(router)

  return {
    app: appWithRouter,
    router
  }
}
