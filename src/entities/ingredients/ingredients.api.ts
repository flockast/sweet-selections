import { useHttpClients, HTTP_CLIENT_NAMES } from '@/shared/entities/http-clients'
import { type TypeIngredient } from './ingredients.types'

const httpClients = useHttpClients()

export const apiFetchIngredients = () => {
  return httpClients
    .client(HTTP_CLIENT_NAMES.BASE)
    ?.get<TypeIngredient[]>('/ingredients.json')
}
