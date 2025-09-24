import { type App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { useConfig } from '@/shared/config'

export const withRouter = (app: App) => {
  const config = useConfig()

  const router = createRouter({
    history: createWebHistory(config.state.BASE_URL),
    routes
  })

  app.use(router)

  return { app, router }
}
