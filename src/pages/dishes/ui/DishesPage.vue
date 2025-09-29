<template>
  <div class="dishes container">
    <DishesListSelected />
  </div>
</template>

<script lang="ts" setup>
import { DishesListSelected } from '@/features/dishes'
</script>

<style lang="scss" scoped>
.dishes {
  padding: 3rem 1.5rem;
  height: 100%;
}
</style>
