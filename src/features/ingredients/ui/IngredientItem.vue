<template>
  <div
    class="ingredient-item"
    :class="{
      'is-active': isActive
    }"
  >
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
  box-shadow: 0 0 0 1px var(--cl-border);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  display: grid;
  gap: 1.5rem;
  cursor: pointer;
  transition: transform .2s ease-in-out, box-shadow .2s ease-in-out;

  &__image {
    width: 100%;
    aspect-ratio: 1 / 1;
    background: #333;
    border-radius: var(--border-radius);
    overflow: hidden;

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__name {
    text-align: center;
  }

  &:active {
    transform: scale(.95);
    //transform: translateY(4px);
  }

  &.is-active {
    box-shadow: 0 0 0 2px var(--cl-accent);
  }
}
</style>
