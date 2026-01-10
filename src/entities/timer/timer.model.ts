import { computed, reactive } from 'vue'
import { ONE_SECOND_IN_MILLIS } from '@/shared/constants'
import { convertObjectToMillis, convertMillisToFormat, getCurrentMillis } from '@/shared/helpers'
import { LOCAL_STORAGE_KEY_FINISH_TIME, LOCAL_STORAGE_KEY_START_TIME, LOCAL_STORAGE_KEY_STATUS, STATUSES } from './timer.constant'

type TypeStatuses = typeof STATUSES[keyof typeof STATUSES]

type TypeState = {
  status: TypeStatuses
  startTime: number
  finishTime: number
  timerId: ReturnType<typeof setInterval>
  callbacks: (() => void)[]
}

const state = reactive<TypeState>({
  status: STATUSES.STOP,
  startTime: 0,
  finishTime: 0,
  timerId: 0,
  callbacks: []
})

export const useTimer = () => {
  const onSuccess = (callback: () => void) => {
    state.callbacks = [
      ...state.callbacks,
      callback
    ]
  }

  const fetchFromCache = () => {
    state.startTime = Number(localStorage.getItem(LOCAL_STORAGE_KEY_START_TIME)) || 0
    state.finishTime = Number(localStorage.getItem(LOCAL_STORAGE_KEY_FINISH_TIME)) || 0
    state.status = localStorage.getItem(LOCAL_STORAGE_KEY_STATUS) as TypeStatuses || STATUSES.STOP
    if (state.status === STATUSES.PLAY) {
      initTimer()
    }
  }

  const updateStartTime = (payload: number) => {
    state.startTime = payload
    localStorage.setItem(LOCAL_STORAGE_KEY_START_TIME, `${state.startTime}`)
  }

  const updateFinishTime = (payload: number) => {
    state.finishTime = payload
    localStorage.setItem(LOCAL_STORAGE_KEY_FINISH_TIME, `${state.finishTime}`)
  }

  const updateStatus = (payload: TypeStatuses) => {
    state.status = payload
    localStorage.setItem(LOCAL_STORAGE_KEY_STATUS, state.status)
  }

  const clearTimer = () => {
    if (state.timerId) {
      clearInterval(state.timerId)
      state.timerId = 0
    }
  }

  const remainingTime = computed(() => state.finishTime - state.startTime)

  const remainingTimeFormat = computed(() => convertMillisToFormat(remainingTime.value, 'hh:mm:ss'))

  const initTimer = () => {
    state.timerId = setInterval(() => {
      updateStartTime(getCurrentMillis())
      if (remainingTime.value <= 0) {
        for (const item of state.callbacks) {
          if (typeof item === 'function') {
            item()
          }
        }
        stop()
      }
    }, ONE_SECOND_IN_MILLIS)
  }

  const start = (payload: { hour: number, minute: number }) => {
    const current = getCurrentMillis()
    updateStartTime(current)
    updateFinishTime(current + convertObjectToMillis(payload))
    initTimer()
    updateStatus(STATUSES.PLAY)
  }

  const stop = () => {
    clearTimer()
    updateStartTime(0)
    updateFinishTime(0)
    updateStatus(STATUSES.STOP)
    state.callbacks = []
  }

  const pause = () => {
    clearTimer()
    updateStatus(STATUSES.PAUSE)
  }

  const resume = () => {
    const diff = remainingTime.value
    const current = getCurrentMillis()
    updateStartTime(current)
    updateFinishTime(current + diff)
    initTimer()
    updateStatus(STATUSES.PLAY)
  }

  return {
    fetchFromCache,
    start,
    stop,
    pause,
    resume,
    onSuccess,
    getters: {
      status: computed(() => state.status),
      remainingTimeFormat
    }
  }
}
