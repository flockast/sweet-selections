import { reactive, readonly } from 'vue'
import { type TypeDish } from './dishes.types'
import { apiFetchDishes } from './dishes.api'

type TypeState = {
  isLoading: boolean
  list: TypeDish[]
}

const state = reactive<TypeState>({
  isLoading: false,
  list: []
})

const validateData = (data: unknown): TypeDish[] => {
  if (!Array.isArray(data)) {
    throw new Error('Invalid response: expected array of dishes')
  }
  return data
}

export const useDishes = () => {
  const fetch = async () => {
    try {
      state.isLoading = true
      const response = await apiFetchDishes()
      state.list = validateData(response)
    } catch (e) {
      throw new Error(`[useDishes.fetch] ${e}`)
    } finally {
      state.isLoading = false
    }
  }

  const getItem = (id: TypeDish['id']) => {
    return state.list.find((item) => item.id === id)
  }

  return {
    state: readonly(state) as TypeState,
    fetch,
    getItem
  }
}
