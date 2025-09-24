import { HTTP_METHODS } from './constants'

export type TypeHttpMethod = typeof HTTP_METHODS[keyof typeof HTTP_METHODS]

export type TypeRequestOptions = {
  headers?: Record<string, string>
  queryParams?: Record<string, string | number | boolean | undefined>
  body?: unknown
  signal?: AbortSignal
}

export type TypeConfig = {
  baseUrl: string
  defaultHeaders?: Record<string, string>
}
