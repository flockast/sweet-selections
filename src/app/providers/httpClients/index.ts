import { useConfig } from '@/shared/config'
import { useHttpClients, HTTP_CLIENT_NAMES } from '@/shared/httpClients'

export const withHttpClients = () => {
  const config = useConfig()
  const httpClients = useHttpClients()

  httpClients.init(HTTP_CLIENT_NAMES.BASE, {
    baseUrl: config.state.BASE_API
  })
}
