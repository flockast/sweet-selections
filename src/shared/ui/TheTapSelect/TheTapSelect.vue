<script lang="ts" setup>
import { computed } from 'vue'

type TypeId = string | number

type TypeOption = {
  id: TypeId
  label: string
}

type TypeProps = {
  options: TypeOption[]
  modelValue: undefined | TypeId | TypeId[]
}

type TypeEmits = {
  (event: 'update:modelValue', value: TypeProps['modelValue']): void
}

const props = defineProps<TypeProps>()
const emit = defineEmits<TypeEmits>()

const selectedOptions = computed(() => {
  return props.options.filter((item) => {
    if (Array.isArray(props.modelValue)) {
      return props.modelValue.includes(item.id)
    }
    return props.modelValue === item.id
  })
})

const updateValue = (newValue: TypeProps['modelValue']) => {
  emit('update:modelValue', newValue)
}

const toggle = (id: TypeId) => {
  if (Array.isArray(props.modelValue)) {
    const index = props.modelValue.findIndex((valueId) => valueId === id)
    if (index === -1) {
      updateValue([
        ...props.modelValue,
        id
      ])
    } else {
      updateValue( props.modelValue.filter((valueId) => valueId !== id))
    }
  } else {
    if (props.modelValue === id) {
      updateValue( undefined)
    } else {
      updateValue(id)
    }
  }
}
</script>

<template>
  <div class="tap-select">
    <button
      v-for="option in options"
      :key="option.id"
      class="tap-select__item"
      :class="{
        'is-active': selectedOptions.find((item) => item.id === option.id)
      }"
      @click.prevent="toggle(option.id)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.tap-select {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: .8rem;

  &__item {
    margin: 0;
    padding: .8rem 1.2rem;
    border: none;
    outline: none;
    border-radius: 12px;
    background-color: var(--cl-border);
    color: var(--cl-text);
    box-shadow: none;
    appearance: none;
    cursor: pointer;

    &:active {
      transform: translateY(1px);
    }

    &.is-active {
      background-color: var(--cl-accent);
      color: white;
    }
  }
}
</style>
