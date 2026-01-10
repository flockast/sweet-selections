<template>
  <div class="timer-field">
    <div class="timer-field__icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
      </svg>
    </div>
    <div
      v-if="timerStatus !== STATUSES.STOP"
      class="timer-field__time"
    >
      {{ remainingTimeFormat }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { STATUSES, useTimer } from '@/entities/timer'

const timer = useTimer()

const timerStatus = computed(() => timer.getters.status.value)
const remainingTimeFormat = computed(() => timer.getters.remainingTimeFormat.value)
</script>

<style lang="scss" scoped>
.timer-field {
  display: flex;
  align-items: center;
  color: var(--cl-text);

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.4rem;
    height: 2.4rem;
    color: #8b8b8b;

    svg {
      width: 1.8rem;
      height: 1.8rem;
    }
  }

  &__time {
    margin-left: .5rem;
  }
}
</style>
