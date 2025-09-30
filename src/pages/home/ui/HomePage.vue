<template>
  <GreetingPopup />
  <div class="home container">
    <div>
      <IngredientsList />
    </div>
    <div>
      <IngredientsSelectedList />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IngredientsList, IngredientsSelectedList } from '@/features/ingredients'
import { GreetingPopup } from '@/features/greetingPopup'
</script>

<style lang="scss" scoped>
.home {
  padding: 3rem 1.5rem;
  height: 100%;
  display: grid;
  gap: 3rem;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
}
</style>
