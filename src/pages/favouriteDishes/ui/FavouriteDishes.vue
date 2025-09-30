<template>
  <div class="favourite-dishes container">
    <DishesListFavourite />
  </div>
</template>

<script lang="ts" setup>
import { DishesListFavourite } from '@/features/dishes'
</script>

<style lang="scss" scoped>
.favourite-dishes {
  padding: 3rem 1.5rem;
  height: 100%;
}
</style>
