import { createHttpClient, type TypeConfig } from '@/shared/lib/httpClient'

type TypeHttpClient = ReturnType<typeof createHttpClient>

type TypeState = {
  clients: Map<PropertyKey, TypeHttpClient>
}

const state: TypeState = {
  clients: new Map()
}

export const useHttpClients = () => {
  const init = (
    key: string,
    config: TypeConfig,
    callback?: (client: TypeHttpClient) => void
  ) => {
    const newClient = createHttpClient(config)

    if (callback) {
      callback(newClient)
    }

    state.clients.set(key, newClient)
  }

  const client = (key: string) => {
    if (!state.clients.has(key)) {
      throw new Error(`Http client "${key}" not initialized`)
    }
    return state.clients.get(key)
  }

  const remove = (key: string) => {
    if (!state.clients.has(key)) {
      throw new Error(`Http client "${key}" not initialized`)
    }
    return state.clients.delete(key)
  }

  return {
    init,
    client,
    remove
  }
}
