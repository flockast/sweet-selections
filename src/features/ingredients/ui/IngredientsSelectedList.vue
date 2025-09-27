<template>
  <TheBox height="auto">
    <div class="selected-ingredients">
      <div class="selected-ingredients__header">
        <div class="selected-ingredients__title">Выбранные ингредиенты</div>
        <div class="selected-ingredients__desc">{{ description }}</div>
      </div>
      <div class="selected-ingredients__content">
        <template
          v-for="ingredient in selectedIngredients"
          :key="ingredient.id"
        >
          <IngredientItem
            v-if="ingredient"
            :item="ingredient"
            :is-active="true"
            @click.prevent="handleClick(ingredient)"
          />
        </template>
      </div>
      <div
        v-if="countSelected > 1"
        class="selected-ingredients__footer"
      >
        <TheButton>Найти блюда</TheButton>
      </div>
    </div>
  </TheBox>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { TheBox, TheButton } from '@/shared/ui'
import { declOfNum } from '@/shared/helpers'
import { type TypeIngredient, useIngredients} from '@/entities/ingredients'
import IngredientItem from './IngredientItem.vue'

const ingredients = useIngredients()

const selectedIngredients = computed(() => {
  return ingredients.state.selectedIds.map((id) => ingredients.getItemById(id))
})

const countSelected = computed(() => {
  return ingredients.state.selectedIds.length || 0
})

const description = computed(() => (
  `${countSelected.value} ${declOfNum(countSelected.value, ['ингредиент', 'ингредиента', 'ингредиентов']) } выбрано`
))

const handleClick = (item: TypeIngredient) => {
  ingredients.removeItem(item.id)
}
</script>

<style lang="scss" scoped>
.selected-ingredients {
  display: grid;
  gap: 3rem;

  &__header {

  }

  &__title {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 1.5rem;
  }

  &__desc {
    font-size: 16px;
  }

  &__filter {
    margin-top: 3rem;
  }

  &__content {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
