export const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') {
    return null
  }

  const nameEQ = `${name}=`
  const cookies = document.cookie.split(';')

  return cookies
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(nameEQ))
    ?.substring(nameEQ.length) ?? null
}

export const setCookie = (name: string, value: string, days = 30): void => {
  if (typeof document === 'undefined') {
    return
  }

  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)

  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`
}

export const removeCookie = (name: string): void => {
  if (typeof document === 'undefined') {
    return
  }

  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
}

export const hasCookie = (name: string): boolean => {
  return getCookie(name) !== null
}
