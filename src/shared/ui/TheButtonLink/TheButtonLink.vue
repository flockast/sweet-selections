<template>
  <RouterLink
    :to="to"
    class="the-button-link"
  >
   <slot />
  </RouterLink>
</template>

<script lang="ts" setup>
import { type RouteLocationRaw } from 'vue-router'

type TypeProps = {
  to: RouteLocationRaw
}

defineProps<TypeProps>()
</script>

<style lang="scss" scoped>
.the-button-link {
  display: block;
  width: 100%;
  margin: 0;
  text-align: center;
  text-decoration: none;
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
}
</style>
