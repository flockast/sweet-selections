<script setup lang="ts">
import { computed, reactive } from 'vue'
import { TheBox, TheButton } from '@/shared/ui'
import { STATUSES, useTimer } from '@/entities/timer'
import TimerInput from './TimerInput/TimerInput.vue'

const timer = useTimer()
const timerStatus = computed(() => timer.getters.status.value)

const userData = reactive({
  hour: 0,
  minute: 0,
  second: 0
})

const buttonDisabled = computed(() => {
  return Object.values(userData).every((item) => !item)
})

const handleClickStart = () => {
  timer.start({
    hour: userData.hour,
    minute: userData.minute,
    second: userData.second
  })
}
</script>

<template>
  <TheBox class="timer-drop">
    <div
      v-if="timerStatus === STATUSES.STOP"
      class="timer-drop__select"
    >
      <div class="timer-drop__fields">
        <TimerInput
          label="часы"
          v-model="userData.hour"
        />
        <span>:</span>
        <TimerInput
          label="минуты"
          v-model="userData.minute"
        />
        <span>:</span>
        <TimerInput
          label="секунды"
          v-model="userData.second"
        />
      </div>
      <TheButton
        :disabled="buttonDisabled"
        @click.prevent="handleClickStart"
      >
        Старт
      </TheButton>
    </div>
    <div
      v-else
      class="timer-drop__actions"
    >
      <TheButton
        v-if="timerStatus === STATUSES.PLAY"
        @click.prevent="timer.pause"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5m4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5"/>
        </svg>
      </TheButton>
      <TheButton
        v-else-if="timerStatus === STATUSES.PAUSE"
        @click.prevent="timer.resume"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
        </svg>
      </TheButton>
      <TheButton @click.prevent="timer.stop">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5"/>
        </svg>
      </TheButton>
    </div>
  </TheBox>
</template>

<style lang="scss" scoped>
.timer-drop {

  &__select {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 1.5rem;
  }

  &__fields {
    display: flex;
    gap: 1.5rem;
    align-items: center;

    input {
      display: block;
      width: 100%;
    }
  }

  &__actions {
    display: flex;
    gap: 1.5rem;

    svg {
      display: block;
      width: 2.4rem;
      height: 2.4rem;
      margin: 0 auto;
    }
  }
}
</style>
