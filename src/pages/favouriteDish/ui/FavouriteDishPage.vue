<template>
  <div class="dish-item container">
    <DishesViewer
      v-if="dish"
      :item="dish"
      :back="{
        name: ROUTE_NAMES.FAVOURITE_DISHES
      }"
    />
    <TheErrorBlock v-else />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRouting } from '@/shared/lib/useRouting'
import { ROUTE_NAMES } from '@/shared/constants'
import { TheErrorBlock } from '@/shared/ui'
import { useDishes } from '@/entities/dishes'
import { DishesViewer } from '@/features/dishes'

const dishes = useDishes()
const routing = useRouting()

const dish = computed(() => {
  const paramId = +routing.get().params?.id || 0
  return dishes.getItem(paramId)
})
</script>

<style lang="scss" scoped>
.dish-item {
  padding: 3rem 1.5rem;
  height: 100%;
}
</style>
