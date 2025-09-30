import { useSelectedIngredients } from '@/entities/selectedIngredients'
import { useFavouriteDishes } from '@/entities/favouriteDishes/model'

export const withCache = () => {
  const selectedIngredients = useSelectedIngredients()
  const favouriteDishes = useFavouriteDishes()

  selectedIngredients.fetchFromCache()
  favouriteDishes.fetchFromCache()
}
