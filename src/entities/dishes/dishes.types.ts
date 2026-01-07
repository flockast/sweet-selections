export type TypeDish = {
  id: number
  name: string
  description: string
  recipe: string[]
  ingredients: {
    id: number
    name: string
    amount: string
  }[]
  criticalIngredients: number[]
  cookingTime: number
  servings: number
}
