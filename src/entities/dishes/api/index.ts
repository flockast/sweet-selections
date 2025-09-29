import { useHttpClients, HTTP_CLIENT_NAMES } from '@/shared/httpClients'
import { type TypeDish } from '../types'

const httpClients = useHttpClients()

export const apiFetchDishes = () => {
  return httpClients
    .client(HTTP_CLIENT_NAMES.BASE)
    ?.get<TypeDish[]>('/dishes.json')
}
