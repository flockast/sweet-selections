import { reactive, readonly } from 'vue'
import { LOCAL_STORAGE_KEY } from '../constants'

type TypeItem = number

type TypeState = {
  list: TypeItem[]
}

const state = reactive<TypeState>({
  list: []
})

export const useFavouriteDishes = () => {
  const set = (payload: TypeState['list']) => {
    state.list = payload
    localStorage.setItem(LOCAL_STORAGE_KEY, state.list.join(','))
  }

  const fetchFromCache = () => {
    const fromLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY) || ''
    set(
      fromLocalStorage
        .split(',')
        .filter((item) => Boolean(item))
        .map((item) => +item)
    )
  }

  const add = (id: TypeItem) => {
    set([
      ...state.list,
      id
    ])
  }

  const remove = (id: TypeItem) => {
    set(
      state.list.filter((item) => item !== id)
    )
  }

  const toggle = (id: TypeItem) => {
    const index = state.list.findIndex((item) => item === id)
    if (index === -1) {
      add(id)
    } else {
      remove(id)
    }
  }

  return {
    state: readonly(state) as TypeState,
    fetchFromCache,
    toggle
  }
}
