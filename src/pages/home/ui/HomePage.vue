<template>
  <div class="home container">
    <div>
      <IngredientsList />
    </div>
    <div>
      <IngredientsSelectedList />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IngredientsList, IngredientsSelectedList } from '@/features/ingredients'
</script>

<style lang="scss" scoped>
.home {
  padding: 3rem 1.5rem;
  display: grid;
  gap: 3rem;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  height: 100%;
}
</style>
