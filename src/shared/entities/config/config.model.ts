import { readonly } from 'vue'
import { getEnvVariable } from '@/shared/helpers'

type TypeState = {
  IS_DEV: boolean
  IS_PROD: boolean
  BUILD_DATE: string
  BASE_URL: string
  BASE_API: string
}

const state: TypeState = {
  IS_DEV: getEnvVariable('DEV'),
  IS_PROD: getEnvVariable('PROD'),
  BUILD_DATE: getEnvVariable('VITE_BUILD_DATE'),
  BASE_URL: getEnvVariable('VITE_BASE_URL'),
  BASE_API: getEnvVariable('VITE_BASE_API')
}

export const useConfig = () => {
  return {
    state: readonly(state) as TypeState
  }
}
