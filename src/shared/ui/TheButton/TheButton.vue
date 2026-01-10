<script lang="ts" setup>
type TypeProps = {
  disabled?: boolean
}

withDefaults(defineProps<TypeProps>(), {
  disabled: false
})
</script>

<template>
  <button
    class="the-button"
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
  border-radius: var(--border-radius);
  background: var(--cl-button-bg);
  color: white;
  padding: 1.5rem;
  box-shadow: none;
  cursor: pointer;
  transition: opacity .2s ease-in-out, transform .2s ease-in-out;

  &:active {
    transform: scale(.95);
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
