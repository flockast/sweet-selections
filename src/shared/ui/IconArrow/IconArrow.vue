<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="icon-arrow"
    :class="`icon-arrow--${direction}`"
  >
    <path d="M4 12.92L4 10.92L16 10.92L10.5 5.42L11.92 4L19.84 11.92L11.92 19.84L10.5 18.42L16 12.92L4 12.92Z" fill="currentColor"></path>
  </svg>
</template>

<script lang="ts" setup>
type TypeProps = {
  direction?: 'next' | 'prev'
}

withDefaults(defineProps<TypeProps>(), {
  direction: 'next'
})
</script>

<style lang="scss" scoped>
.icon-arrow {
  width: 2.4rem;
  height: 2.4rem;
  margin: -0.4px 0;
  transition: transfrorm .2s ease-in-out;

  &--prev {
    transform: rotate(180deg);
  }
}
</style>
