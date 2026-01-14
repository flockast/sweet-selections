import { useIngredients } from '@/entities/ingredients'
import { useDishes } from '@/entities/dishes'
import { useTags } from '@/entities/tags'

export const withData = async () => {
  const ingredients = useIngredients()
  const dishes = useDishes()
  const tags = useTags()

  await Promise.all([
    ingredients.fetch(),
    dishes.fetch(),
    tags.fetch()
  ])
}
