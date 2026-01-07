import { useSelectedIngredients } from '@/entities/selected-ingredients'
import { useFavouriteDishes } from '@/entities/favourite-dishes'

export const withCache = () => {
  const selectedIngredients = useSelectedIngredients()
  const favouriteDishes = useFavouriteDishes()

  selectedIngredients.fetchFromCache()
  favouriteDishes.fetchFromCache()
}
