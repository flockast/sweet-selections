import { createApp } from 'vue'
import { withProviders } from './providers'
import App from './App.vue'

const bootstrap = async () => {
  try {
    const { app }  = await withProviders(createApp(App))
    app.mount('#app')
  } catch {
    console.error('Initialization error')
  }
}

bootstrap()
