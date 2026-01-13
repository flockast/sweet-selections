<template>
  <div class="timer-field">
    <div class="timer-field__icon">
      <IconClock />
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
import { IconClock } from '@/shared/ui'
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
    color: #8b8b8b;
  }

  &__time {
    margin-left: .5rem;
  }
}
</style>
