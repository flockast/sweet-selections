<template>
  <div class="dishes container">
    <DishesListSelected
      @back="handleClickBack"
    />
  </div>
</template>

<script lang="ts" setup>
import { ROUTE_NAMES } from '@/app/providers/router'
import { useRouting } from '@/shared/lib'
import { DishesListSelected } from '@/features/dishes'

const routing = useRouting()

const handleClickBack = () => {
  routing.goTo(ROUTE_NAMES.HOME)
}
</script>

<style lang="scss" scoped>
.dishes {
  padding: 3rem 1.5rem;
  height: 100%;
}
</style>
