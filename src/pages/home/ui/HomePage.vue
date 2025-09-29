<template>
  <div class="home container">
    <div>
      <IngredientsList />
    </div>
    <div>
      <IngredientsSelectedList
        @accept="handleAccept"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ROUTE_NAMES } from '@/app/providers/router'
import { useRouting } from '@/shared/lib'
import { IngredientsList, IngredientsSelectedList } from '@/features/ingredients'

const routing = useRouting()

const handleAccept = () => {
  routing.goTo(ROUTE_NAMES.DISHES)
}
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
