import { useSelectedIngredients } from '@/entities/selected-ingredients'
import { useFavouriteDishes } from '@/entities/favourite-dishes'
import { useTimer } from '@/entities/timer'

export const withCache = () => {
  const selectedIngredients = useSelectedIngredients()
  const favouriteDishes = useFavouriteDishes()
  const timer = useTimer()

  selectedIngredients.fetchFromCache()
  favouriteDishes.fetchFromCache()
  timer.fetchFromCache()
}
