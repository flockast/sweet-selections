import { useConfig } from '@/shared/entities/config'
import { useHttpClients, HTTP_CLIENT_NAMES } from '@/shared/entities/http-clients'

export const withHttpClients = () => {
  const config = useConfig()
  const httpClients = useHttpClients()

  httpClients.init(HTTP_CLIENT_NAMES.BASE, {
    baseUrl: config.state.BASE_API
  })
}
