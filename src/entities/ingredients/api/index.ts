import { useHttpClients, HTTP_CLIENT_NAMES } from '@/shared/httpClients'
import { type TypeIngredient } from '../types'

const httpClients = useHttpClients()

export const apiFetchIngredients = () => {
  return httpClients
    .client(HTTP_CLIENT_NAMES.BASE)
    ?.get<TypeIngredient[]>('/ingredients.json')
}
