import { v4 as uuidv4 } from 'uuid'

export const getEnvVariable = (key: string) => {
  if (import.meta.env[key] === undefined) {
    throw new Error(`Env variable ${key} is required`)
  }

  return import.meta.env[key]
}

export const convertMinutesToHoursAndMinutes = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return { hours, minutes }
}

export const lightenHexColor = (hexColor: string, percent: number) => {
  // Remove the '#' if present
  const hex = hexColor.replace(/^#/, '')

  // Parse R, G, B components and increase RGB values and cap at 255
  const r = Math.min(255, parseInt(hex.substring(0, 2), 16) + Math.floor(255 * (percent / 100)))
  const g = Math.min(255, parseInt(hex.substring(2, 4), 16) + Math.floor(255 * (percent / 100)))
  const b = Math.min(255, parseInt(hex.substring(4, 6), 16) + Math.floor(255 * (percent / 100)))

  // Convert back to hex and format with leading zeros if needed
  const toHex = (c: number) => ('0' + c.toString(16)).slice(-2)

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

export const createArrayWithStep = (start: number, end: number, step: number) => {
  const length = Math.floor((end - start) / step) + 1
  return Array.from({ length: length }, (_, index) => start + index * step)
}

export const generateUniqId = () => {
  return uuidv4()
}

export const getErrorMessage = (error: unknown, fallbackMessage = '') => {
  return error instanceof Error && error?.message
    ? error.message
    : fallbackMessage
}

export const zeroPad = (num: number, places: number) => {
  return String(num).padStart(places, '0')
}

export const getRandomInRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const declOfNum = (number: number, titles: string[], full = false) => {
  const cases = [2, 0, 1, 1, 1, 2]
  const result = titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]]
  return full ? `${number} ${result}` : result
}

export const delay = (ms: number, callback?: () => any) => new Promise((resolve) => {
  setTimeout(() => {
    resolve(callback ? callback() : true)
  }, ms)
})
