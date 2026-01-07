import { type Router } from 'vue-router'
import { ROUTE_NAMES } from '@/shared/constants'
import { useWelcomePopup } from '@/entities/welcome-popup'

export const withWelcomePopup = (router: Router) => {
  const welcomePopup = useWelcomePopup()

  if (router.currentRoute.value.name === ROUTE_NAMES.HOME) {
    welcomePopup.show()
  }
}
