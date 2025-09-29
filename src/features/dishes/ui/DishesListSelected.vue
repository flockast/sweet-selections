<template>
  <TheBox>
    <div class="dishes-selected">
      <div class="dishes-selected__header">
        <div class="dishes-selected__back">
          <TheButtonLink
            :to="{
              name: ROUTE_NAMES.HOME
            }"
          >
            <IconArrow direction="prev" />
          </TheButtonLink>
        </div>
        <div class="dishes-selected__title">Ваши кондитерские творения</div>
      </div>
      <div
        v-if="selectedDishes.length"
        class="dishes-selected__content"
      >
        <DishCardItem
          v-for="dish in selectedDishes"
          :key="dish.id"
          :item="dish"
          :optionals="getOptionalsIngredients(dish)"
        />
      </div>
      <TheNoData v-else />
    </div>
  </TheBox>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { ROUTE_NAMES } from '@/app/providers/router'
import { TheBox, TheButtonLink, TheNoData, IconArrow } from '@/shared/ui'
import { type TypeDish, useDishes } from '@/entities/dishes'
import { useSelectedIngredients } from '@/entities/selectedIngredients'
import { useIngredients } from '@/entities/ingredients'
import DishCardItem from './DishCardItem.vue'

const dishes = useDishes()
const ingredients = useIngredients()
const selectedIngredients = useSelectedIngredients()

const selectedDishes = computed(() => dishes.state.list.filter((dish) => {
  return dish.criticalIngredients.every((id) => selectedIngredients.state.list.includes(id))
}))

const getOptionalsIngredients = (dish: TypeDish) => {
  return dish.ingredients
    .filter((item) => !selectedIngredients.has(item.id))
    .map((item) => ingredients.getItem(item.id))
    .filter((item): item is TypeDish => Boolean(item))
    .map((item) => item.name.toLowerCase())
}
</script>

<style lang="scss" scoped>
.dishes-selected {
  &__header {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  &__title {
    font-size: 28px;
    font-weight: bold;
  }

  &__content {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
