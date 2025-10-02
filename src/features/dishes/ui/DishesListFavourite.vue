<template>
  <TheBox>
    <div class="favourite-dishes">
      <div class="favourite-dishes__header">
        <div class="favourite-dishes__title">Ваши любимые кондитерские блюда</div>
      </div>
      <div
        v-if="favouriteDishesList.length"
        class="favourite-dishes__content"
      >
        <DishCardItem
          v-for="dish in favouriteDishesList"
          :key="dish.id"
          :item="dish"
          :to="{
            name: ROUTE_NAMES.FAVOURITE_DISH,
            params: {
              id: dish.id
            }
          }"
        />
      </div>
      <TheNoData v-else />
    </div>
  </TheBox>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { ROUTE_NAMES } from '@/shared/constants'
import { TheBox, TheNoData } from '@/shared/ui'
import { type TypeDish, useDishes } from '@/entities/dishes'
import { useFavouriteDishes } from '@/entities/favouriteDishes'
import DishCardItem from './DishCardItem/DishCardItem.vue'

const dishes = useDishes()
const favouriteDishes = useFavouriteDishes()

const favouriteDishesList = computed(() => (
  favouriteDishes.state.list
    .map((item) => dishes.getItem(item))
    .filter((item): item is TypeDish => Boolean(item))
))
</script>

<style lang="scss" scoped>
.favourite-dishes {
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
