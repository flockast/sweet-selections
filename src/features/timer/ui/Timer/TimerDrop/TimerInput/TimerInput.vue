<script lang="ts" setup>
import { computed, getCurrentInstance } from 'vue'

type TypeProps = {
  modelValue: number
  label?: string
  min?: number
  max?: number
}

type TypeEmits = {
  (event: 'update:modelValue', value: TypeProps['modelValue']): void
}

withDefaults(defineProps<TypeProps>(), {
  min: 0,
  max: 59
})

const emit = defineEmits<TypeEmits>()

const currentInstance = getCurrentInstance()

const id = computed(() => `input-${currentInstance?.uid}`)

const handleInput = (event: Event) => {
  emit('update:modelValue', Number((event.target as HTMLInputElement).value))
}
</script>

<template>
  <div class="timer-input">
    <label
      v-if="label"
      :for="id"
    >
      {{ label }}
    </label>
    <input
      type="number"
      :id="id"
      :min="min"
      :max="max"
      :value="modelValue"
      @input="handleInput"
    >
  </div>
</template>

<style lang="scss" scoped>
.timer-input {
  display: block;
  width: 100%;

  label {
    display: block;
    font-size: 1.2rem;
    margin-bottom: .5rem;
    text-transform: uppercase;
    font-weight: bold;
  }

  input {
    display: block;
    width: 100%;
    padding: .5rem;
    margin: 0;
    border: 1px solid var(--cl-border);
    border-radius: var(--border-radius);
    color: var(--cl-text);
    outline: none;
    background-color: var(--cl-box-bg);
    text-align: center;
  }
}
</style>
