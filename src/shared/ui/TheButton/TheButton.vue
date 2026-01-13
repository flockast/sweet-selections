<script lang="ts" setup>
type TypeProps = {
  disabled?: boolean
  variant?: 'outline' | 'default'
}

withDefaults(defineProps<TypeProps>(), {
  disabled: false,
  variant: 'default'
})
</script>

<template>
  <button
    class="the-button"
    :class="`the-button--${variant}`"
    :disabled="disabled"
  >
    <slot/>
  </button>
</template>

<style lang="scss" scoped>
.the-button {
  display: block;
  width: 100%;
  margin: 0;
  border: none;
  background: none;
  border-radius: var(--border-radius);
  color: white;
  padding: 1.5rem;
  box-shadow: none;
  cursor: pointer;

  &--default {
    background: var(--cl-button-bg);
  }

  &--outline {
    box-shadow: 0 0 0 1px var(--cl-border);
  }

  &:active {
    transform: translateY(1px);
  }

  &:hover {
    opacity: 1;
  }

  &[disabled] {
    cursor: default;
    opacity: .5;
    pointer-events: none;
  }
}
</style>
