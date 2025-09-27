import { reactive, readonly } from 'vue'
import type { TypeDish } from '../types'
import { apiFetchDishes } from '../api'

type TypeState = {
  isLoading: boolean
  list: TypeDish[]
}

const state = reactive<TypeState>({
  isLoading: false,
  list: []
})

const validateData = (data: any): TypeDish[] => {
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

  return {
    state: readonly(state) as TypeState,
    fetch
  }
}
