import { DateTime, Duration, type DurationLikeObject } from 'luxon'
import { DATE_TIME_FORMAT, DATE_TIME_NO_SECONDS_FORMAT } from '@/shared/constants'

export const convertObjectToMillis = (payload: DurationLikeObject) => {
  return Duration.fromObject(payload).as('milliseconds')
}

export const convertMillisToFormat = (ms: number, format = DATE_TIME_FORMAT) => {
  return Duration.fromMillis(ms).toFormat(format)
}

export const getCurrentMillis = () => {
  return DateTime.now().set({ millisecond: 0 }).toMillis()
}

export const fromJSDateToISO = (dateTimeJSDate: Date) => {
  return DateTime.fromJSDate(dateTimeJSDate)
    .toISO({ includeOffset: false, suppressMilliseconds: true })
}

export const fromJSDateToISODate = (dateTimeJSDate: Date) => {
  return DateTime.fromJSDate(dateTimeJSDate)
    .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
    .toISO({ includeOffset: false, suppressMilliseconds: true })
}

export const fromJSDateToMillis = (dateTimeJSDate: Date) => {
  return DateTime.fromJSDate(dateTimeJSDate).toMillis()
}

export const fromJSDateToFormat = (dateTimeJSDate: Date, format = DATE_TIME_NO_SECONDS_FORMAT) => {
  return DateTime.fromJSDate(dateTimeJSDate).toFormat(format)
}

export const fromISOToMillis = (dateTimeISO: string) => {
  return DateTime.fromISO(dateTimeISO).toMillis()
}

export const fromISOToFormat = (dateTimeISO: string, format = DATE_TIME_NO_SECONDS_FORMAT) => {
  return DateTime.fromISO(dateTimeISO).toFormat(format)
}

export const fromFormatToFormat = (date: string, fromFormat: string, toFormat: string) => {
  return DateTime.fromFormat(date, fromFormat).toFormat(toFormat)
}
