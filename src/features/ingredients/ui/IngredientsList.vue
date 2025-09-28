<template>
  <TheBox>
    <div class="ingredients">
      <div class="ingredients__header">
        <div class="ingredients__title">Выберите ингредиенты</div>
        <div class="ingredients__desc">{{ description }}</div>
        <div class="ingredients__filter">
          <TheInput
            v-model="filterValue"
            placeholder="Поиск ингредиентов..."
          />
        </div>
      </div>
      <div
        v-if="filteredIngredients.length"
        class="ingredients__content"
      >
        <IngredientCardItem
          v-for="ingredient in filteredIngredients"
          :key="ingredient.id"
          :item="ingredient"
          :is-active="isActiveItem(ingredient)"
          @click="handleClick(ingredient)"
        />
      </div>
      <div
        v-else
        class="ingredients__no-data"
      >
        Ничего не найдено...
      </div>
    </div>
  </TheBox>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { TheBox, TheInput } from '@/shared/ui'
import { type TypeIngredient, useIngredients } from '@/entities/ingredients'
import IngredientCardItem from './IngredientCardItem.vue'

const filterValue = ref('')

const ingredients = useIngredients()

const filteredIngredients = computed(() => {
  return ingredients.state.list.filter((item) => {
    return item.name.toLowerCase().includes(filterValue.value.toLocaleLowerCase())
  })
})

const countAll = computed(() => {
  return ingredients.state.list.length || 0
})

const countSelected = computed(() => {
  return ingredients.state.selectedIds.length || 0
})

const description = computed(() => (
  `Выбрано ${countSelected.value} из ${countAll.value}`
))

const handleClick = (item: TypeIngredient) => {
  ingredients.toggleItem(item.id)
}

const isActiveItem = (item: TypeIngredient) => {
  return ingredients.state.selectedIds.findIndex((id) => id === item.id) !== -1
}
</script>

<style lang="scss" scoped>
.ingredients {
  display: grid;
  gap: 1.5rem;

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
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  &__no-data {
    padding: 3rem;
    text-align: center;
  }
}
</style>
