import {
  type TypeHttpMethod,
  type TypeConfig,
  type TypeRequestOptions
} from './types'

import { HTTP_METHODS } from './constants'

export const createHttpClient = (config: TypeConfig) => {
  const { baseUrl, defaultHeaders = {} } = config

  // Интерцепторы
  const requestInterceptors: Array<(req: Request) => Request> = []
  const responseInterceptors: Array<(res: Response) => Response> = []

  const buildUrl = (endpoint: string, queryParams?: TypeRequestOptions['queryParams']): string => {
    const normalizedBase = baseUrl.replace(/\/+$/, '')
    const normalizedEndpoint = endpoint.replace(/^\/+/, '')

    const path = [normalizedBase, normalizedEndpoint]
      .filter(Boolean)
      .join('/')

    const queryString = queryParams
      ? Object.entries(queryParams)
        .filter((item) => {
          return item[1] !== null && item[1] !== undefined
        })
        .map(([key, value]) => {
          return `${encodeURIComponent(key)}=${encodeURIComponent(`${value}`)}`
        })
        .join('&')
      : ''

    return queryString ? `${path}?${queryString}` : path
  }

  const createRequest = (method: TypeHttpMethod, endpoint: string, options?: TypeRequestOptions) => {
    const url = buildUrl(endpoint, options?.queryParams)
    const headers = new Headers({ ...defaultHeaders, ...options?.headers })

    const requestInit: RequestInit = {
      method,
      headers,
      signal: options?.signal
    }

    if (options?.body) {
      requestInit.body = JSON.stringify(options.body)
      headers.set('Content-Type', 'application/json')
    }

    const initialRequest = new Request(url, requestInit)

    return requestInterceptors.reduce(
      (currentRequest, interceptor) => interceptor(currentRequest),
      initialRequest
    )
  }

  const handleResponse = async <T>(response: Response): Promise<T | string> => {
    const processedResponse = responseInterceptors.reduce(
      (currentResponse, interceptor) => interceptor(currentResponse),
      response
    )

    if (!processedResponse.ok) {
      throw new Error(`HTTP error! status: ${processedResponse.status}`)
    }

    const contentType = processedResponse.headers.get('content-type')
    return contentType?.includes('application/json')
      ? processedResponse.json()
      : processedResponse.text()
  }

  const request = async <T>(method: TypeHttpMethod, endpoint: string, options?: TypeRequestOptions): Promise<T | string> => {
    const req = createRequest(method, endpoint, options)
    const res = await fetch(req)
    return handleResponse<T>(res)
  }

  return {
    get: <T>(endpoint: string, options?: Omit<TypeRequestOptions, 'body'>) => {
      return request<T>(HTTP_METHODS['GET'], endpoint, options)
    },

    post: <T>(endpoint: string, body?: unknown, options?: Omit<TypeRequestOptions, 'body'>) => {
      return request<T>(HTTP_METHODS['POST'], endpoint, { ...options, body })
    },

    put: <T>(endpoint: string, body?: unknown, options?: Omit<TypeRequestOptions, 'body'>) => {
      return request<T>(HTTP_METHODS['PUT'], endpoint, { ...options, body })
    },

    patch: <T>(endpoint: string, body?: unknown, options?: Omit<TypeRequestOptions, 'body'>) => {
      return request<T>(HTTP_METHODS['PATCH'], endpoint, { ...options, body })
    },

    delete: <T>(endpoint: string, options?: Omit<TypeRequestOptions, 'body'>) => {
      return request<T>(HTTP_METHODS['DELETE'], endpoint, options)
    },

    addRequestInterceptor: (interceptor: (req: Request) => Request) => {
      requestInterceptors.push(interceptor)
    },

    addResponseInterceptor: (interceptor: (res: Response) => Response) => {
      responseInterceptors.push(interceptor)
    },

    setDefaultHeader: (key: string, value: string) => {
      defaultHeaders[key] = value
    },

    removeDefaultHeader: (key: string) => {
      delete defaultHeaders[key]
    }
  }
}
