import { useHttpClients, HTTP_CLIENT_NAMES } from '@/shared/entities/http-clients'
import { type TypeTag } from './tags.types'

const httpClients = useHttpClients()

export const apiFetchTags = () => {
  return httpClients
    .client(HTTP_CLIENT_NAMES.BASE)
    ?.get<TypeTag[]>('/tags.json')
}
