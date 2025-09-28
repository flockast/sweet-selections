<template>
  <div class="ingredient-item">
    <div class="ingredient-item__image"></div>
    <div class="ingredient-item__name">{{ item.name }}</div>
  </div>
</template>

<script lang="ts" setup>
import { type TypeIngredient } from '@/entities/ingredients'

type TypeProps = {
  item: TypeIngredient
  isActive?: boolean
}

defineProps<TypeProps>()
</script>

<style lang="scss" scoped>
.ingredient-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;

  &__image {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    overflow: hidden;
    background: #c2c2c2;
  }
}
</style>
