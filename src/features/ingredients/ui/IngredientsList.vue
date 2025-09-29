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
          :is-active="selectedIngredients.has(ingredient.id)"
          @click="  selectedIngredients.toggle(ingredient.id)"
        />
      </div>
      <TheNoData v-else />
    </div>
  </TheBox>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { TheBox, TheInput, TheNoData } from '@/shared/ui'
import { useIngredients } from '@/entities/ingredients'
import { useSelectedIngredients } from '@/entities/selectedIngredients'
import IngredientCardItem from './IngredientCardItem.vue'

const filterValue = ref('')

const ingredients = useIngredients()
const selectedIngredients = useSelectedIngredients()

const filteredIngredients = computed(() => {
  return ingredients.state.list.filter((item) => {
    return item.name.toLowerCase().includes(filterValue.value.toLocaleLowerCase())
  })
})

const countAll = computed(() => {
  return ingredients.state.list.length || 0
})

const countSelected = computed(() => {
  return selectedIngredients.state.list.length || 0
})

const description = computed(() => (
  `Выбрано ${countSelected.value} из ${countAll.value}`
))
</script>

<style lang="scss" scoped>
.ingredients {
  &__header {
    margin-bottom: 1.5rem;
  }

  &__title {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 1.5rem;
  }

  &__desc {
    margin-bottom: 3rem;
    font-size: 16px;
  }

  &__filter {}

  &__content {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
