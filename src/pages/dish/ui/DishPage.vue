<template>
  <div class="dish-item container">
    <DishViewer
      v-if="dish"
      :item="dish"
    />
    <TheErrorBlock v-else />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRouting } from '@/shared/lib/useRouting'
import { TheErrorBlock } from '@/shared/ui'
import { useDishes } from '@/entities/dishes'
import { DishViewer } from '@/features/dishViewer'

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
