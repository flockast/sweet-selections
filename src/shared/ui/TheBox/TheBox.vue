<template>
  <div
    class="the-box"
    :class="`the-box--${height}`"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
type TypeProps = {
  height?: 'full' | 'auto'
}

withDefaults(defineProps<TypeProps>(), {
  height: 'full'
})
</script>

<style lang="scss" scoped>
.the-box {
  border: 1px solid var(--cl-border);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  background: var(--cl-box-bg);
  transition: background .2s ease-in-out, border .2s ease-in-out;

  &--full {
    height: 100%;
  }

  &--auto {
    height: auto;
  }
}
</style>
