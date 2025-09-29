import { useSelectedIngredients } from '@/entities/selectedIngredients'

export const withCache = () => {
  const selectedIngredients = useSelectedIngredients()
  selectedIngredients.fetchFromCache()
}
