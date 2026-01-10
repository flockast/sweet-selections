<script setup lang="ts">
import { computed, reactive } from 'vue'
import { TheBox } from '@/shared/ui'
import { STATUSES, useTimer } from '@/entities/timer'

const emit = defineEmits<{
  (event: 'start'): void
  (event: 'stop'): void
}>()

const timer = useTimer()
const timerStatus = computed(() => timer.getters.status.value)
const userData = reactive({
  hour: 0,
  minute: 0
})

const handleClickStart = () => {
  timer.start({
    hour: userData.hour,
    minute: userData.minute
  })
  emit('start')
}

const handleClickStop = () => {
  timer.stop()
  emit('stop')
}
</script>

<template>
  <TheBox class="timer-drop">
    <div
      v-if="timerStatus === STATUSES.STOP"
      class="timer-drop__select"
    >
      <div class="timer-drop__fields">
        <input type="number" min="0" placeholder="Часы" v-model="userData.hour">
        <input type="number" min="0" placeholder="Минуты" v-model="userData.minute">
      </div>
      <button
        class="timer-drop__start"
        @click.prevent="handleClickStart"
      >
        Старт
      </button>
    </div>
    <div
      v-else
      class="timer-drop__actions"
    >
      <button
        v-if="timerStatus === STATUSES.PLAY"
        @click.prevent="timer.pause"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5m4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5"/>
        </svg>
      </button>
      <button
        v-else-if="timerStatus === STATUSES.PAUSE"
        @click.prevent="timer.resume"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
        </svg>
      </button>
      <button @click.prevent="handleClickStop">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5"/>
        </svg>
      </button>
    </div>
  </TheBox>
</template>

<style lang="scss" scoped>
.timer-drop {
  button {
    margin: 0;
    padding: 0;
    background: none;
    box-shadow: none;
    outline: none;
    border: none;
    -webkit-appearance: none;
    appearance: none;
    cursor: pointer;
  }

  &__select {

  }

  &__fields {
    input {
      display: block;
      width: 100%;
    }
  }

  &__actions {
    & > button {

    }
  }
}
</style>
