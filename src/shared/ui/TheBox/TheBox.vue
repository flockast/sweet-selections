<template>
  <div
    class="the-box"
    :style="style"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
type TypeProps = {
  style?: Record<PropertyKey, string>
}

defineProps<TypeProps>()
</script>

<style lang="scss" scoped>
.the-box {
  border: 1px solid var(--cl-border);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  background: var(--cl-box-bg);
  transition: background .2s ease-in-out, border .2s ease-in-out;
}
</style>
