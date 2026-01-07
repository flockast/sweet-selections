import { readonly, reactive } from 'vue'
import { type TypeIngredient } from './ingredients.types'
import { apiFetchIngredients } from './ingredients.api'

type TypeState = {
  isLoading: boolean
  list: TypeIngredient[]
  selectedIds: TypeIngredient['id'][]
}

const state = reactive<TypeState>({
  isLoading: false,
  list: [],
  selectedIds: []
})

const validateData = (data: unknown): TypeIngredient[] => {
  if (!Array.isArray(data)) {
    throw new Error('Invalid response: expected array of ingredients')
  }
  return data
}

export const useIngredients = () => {
  const fetch = async () => {
    try {
      state.isLoading = true
      const response = await apiFetchIngredients()
      state.list = validateData(response)
    } catch (e) {
      throw new Error(`[useIngredients.fetch] ${e}`)
    } finally {
      state.isLoading = false
    }
  }

  const getItem = (id: TypeIngredient['id']) => {
    return state.list.find((item) => item.id === id)
  }

  return {
    state: readonly(state) as TypeState,
    fetch,
    getItem
  }
}
