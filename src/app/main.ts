import { createApp, nextTick } from 'vue'
import { withProviders } from './providers'
// import { fadeOutLoading, setErrorPage } from './helpers'
import App from './App.vue'

const bootstrap = async () => {
  try {
    const { app, router }  = await withProviders(createApp(App))
    app.mount('#app')
    await router.isReady()
    await nextTick()
    await new Promise((resolve) => setTimeout(resolve, 300))
    // await fadeOutLoading()
  } catch {
    // setErrorPage()
  }
}

bootstrap()
