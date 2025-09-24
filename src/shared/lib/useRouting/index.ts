import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export const useRouting = () => {
  const router = useRouter()
  const route = useRoute()

  const createRouteLocationRaw = (name: string) => ({
    ...route,
    name,
    query: {
      ...route.query
    }
  })

  const goTo = async (name: string) => {
    await router.push(createRouteLocationRaw(name))
  }

  return {
    createRouteLocationRaw,
    goTo,
    currentRouteName: computed(() => route.name as string || '')
  }
}
