import { reactive, readonly } from 'vue'
import { type TypeTag } from './tags.types'
import { apiFetchTags } from './tags.api'

type TypeState = {
  isLoading: boolean
  list: TypeTag[]
}

const state = reactive<TypeState>({
  isLoading: false,
  list: []
})

const validateData = (data: unknown): TypeTag[] => {
  if (!Array.isArray(data)) {
    throw new Error('Invalid response: expected array of tags')
  }
  return data
}

export const useTags = () => {
  const fetch = async () => {
    try {
      state.isLoading = true
      const response = await apiFetchTags()
      state.list = validateData(response)
    } catch (e) {
      throw new Error(`[useTags.fetch] ${e}`)
    } finally {
      state.isLoading = false
    }
  }

  const getItem = (id: TypeTag['id']) => {
    return state.list.find((item) => item.id === id)
  }

  return {
    state: readonly(state) as TypeState,
    fetch,
    getItem
  }
}
