<template>
  <div class="the-input">
    <label
      v-if="label"
      class="the-input__label"
    >
      {{ label }}
    </label>
    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="handleInput"
    >
    <div
      v-if="error"
      class="the-input__error"
    >
      {{ error }}
    </div>
  </div>
</template>

<script lang="ts" setup>
type TypeProps = {
  modelValue: string
  type?: string
  placeholder?: string
  label?: string
  error?: string
}

type TypeEmits = {
  (event: 'update:modelValue', value: TypeProps['modelValue']): void
}

withDefaults(defineProps<TypeProps>(), {
  type: 'text'
})

const emit = defineEmits<TypeEmits>()

const handleInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<style lang="scss" scoped>
.the-input {
  display: grid;
  gap: .5rem;

  input {
    display: block;
    border: none;
    box-shadow: 0 0 0 1px var(--cl-border);
    border-radius: var(--border-radius);
    background: none;
    margin: 0;
    padding: 1.5rem;
    outline: none;
    color: var(--cl-text);
    transition: box-shadow .2s ease-in-out;

    &:focus {
      box-shadow: 0 0 0 2px var(--cl-focus);
    }
  }

  &__error {
    font-size: 1.4rem;
    color: darkred;
  }
}
</style>
