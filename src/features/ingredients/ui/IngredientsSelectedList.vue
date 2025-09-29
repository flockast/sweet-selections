<template>
  <TheBox
    :style="{
      'height': 'auto',
      'position': 'sticky',
      'top': '11rem'
    }"
  >
    <div class="selected-ingredients">
      <div class="selected-ingredients__header">
        <div class="selected-ingredients__title">Выбранные ингредиенты</div>
      </div>
      <div class="selected-ingredients__subheader">
        <div class="selected-ingredients__desc">{{ description }}</div>
        <button
          v-if="countSelected > 0"
          class="selected-ingredients__clear"
          @click.prevent="selectedIngredients.clear"
        >
          Очистить
        </button>
      </div>
      <div
        v-if="countSelected > 0"
        class="selected-ingredients__content scroll"
      >
        <IngredientLineItem
          v-for="ingredient in ingredientsList"
          :key="ingredient.id"
          :item="ingredient"
          @remove="selectedIngredients.remove(ingredient.id)"
        />
      </div>
      <div
        v-if="countSelected > 1"
        class="selected-ingredients__footer"
      >
        <TheButtonLink
          :to="{
            name: ROUTE_NAMES.DISHES
          }"
        >
          Найти блюда
        </TheButtonLink>
      </div>
    </div>
  </TheBox>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { ROUTE_NAMES } from '@/app/providers/router'
import { TheBox, TheButtonLink } from '@/shared/ui'
import { declOfNum } from '@/shared/helpers'
import { type TypeIngredient, useIngredients} from '@/entities/ingredients'
import { useSelectedIngredients } from '@/entities/selectedIngredients'
import IngredientLineItem from './IngredientLineItem.vue'

const ingredients = useIngredients()
const selectedIngredients = useSelectedIngredients()

const ingredientsList = computed(() => {
  return selectedIngredients.state.list
    .map((id) => ingredients.getItem(id))
    .filter((item): item is TypeIngredient => Boolean(item))
})

const countSelected = computed(() => {
  return selectedIngredients.state.list.length || 0
})

const description = computed(() => (
  `${countSelected.value} ${declOfNum(countSelected.value, ['ингредиент', 'ингредиента', 'ингредиентов']) } выбрано`
))
</script>

<style lang="scss" scoped>
.selected-ingredients {
  &__header {
    margin-bottom: 1.5rem;
  }

  &__title {
    font-size: 28px;
    font-weight: bold;
  }

  &__subheader {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__desc {
    font-size: 16px;
  }

  &__clear {
    margin: 0;
    padding: 0;
    border: none;
    box-shadow: none;
    background: none;
    outline: none;
    cursor: pointer;
    color: var(--cl-danger);

    &:active {
      transform: translateY(1px);
    }
  }

  &__filter {
    margin-top: 3rem;
  }

  &__content {
    margin-top: 3rem;
    max-height: 408px;
    overflow: auto;

    & > *:not(:last-child) {
      margin-bottom: 1.5rem;
    }
  }

  &__footer {
    margin-top: 3rem;
  }
}
</style>
