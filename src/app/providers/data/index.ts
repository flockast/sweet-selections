import { useIngredients } from '@/entities/ingredients'
import { useDishes } from '@/entities/dishes'

export const withData = async () => {
  const ingredients = useIngredients()
  const dishes = useDishes()

  await ingredients.fetch()
  await dishes.fetch()
}
