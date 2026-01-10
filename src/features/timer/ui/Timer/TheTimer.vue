<template>
  <div
    class="timer"
    @click.stop
  >
    <button
      class="timer__field"
      @click.prevent="toggle"
    >
      <TimerField />
    </button>
    <div
      v-if="showDrop"
      class="timer__drop"
    >
      <TimerDrop
        @start="close"
        @stop="close"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useEvent } from '@/shared/composables/useEvent'
import TimerField from './TimerField/TimerField.vue'
import TimerDrop from './TimerDrop/TimerDrop.vue'

const showDrop = ref(false)

const toggle = () => {
  showDrop.value = !showDrop.value
}

const close = () => {
  showDrop.value = false
}

useEvent(document.body, 'click', () => {
  close()
})

useEvent(document, 'keydown', (event) => {
  if (event.key === 'Escape') {
    close()
  }
})
</script>

<style lang="scss" scoped>
.timer {
  position: relative;

  &__field {
    display: block;
    margin: 0;
    padding: 0;
    background: none;
    box-shadow: none;
    outline: none;
    border: none;
    -webkit-appearance: none;
    appearance: none;
    cursor: pointer;

    &:active {
      transform: translateY(1px);
    }
  }

  &__drop {
    position: absolute;
    top: 5.4rem;
    right: 0;
    width: 15rem;
  }
}
</style>
