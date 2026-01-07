import { useHttpClients, HTTP_CLIENT_NAMES } from '@/shared/entities/http-clients'
import { type TypeDish } from './dishes.types'

const httpClients = useHttpClients()

export const apiFetchDishes = () => {
  return httpClients
    .client(HTTP_CLIENT_NAMES.BASE)
    ?.get<TypeDish[]>('/dishes.json')
}
