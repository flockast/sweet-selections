<template>
  <div class="ingredient-item">
    <div class="ingredient-item__name">{{ item.name }}</div>
    <button
      class="ingredient-item__remove"
      @click.prevent="emit('remove')"
    >
      <IconTrash />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { type TypeIngredient } from '@/entities/ingredients'
import { IconTrash } from '@/shared/ui'

type TypeProps = {
  item: TypeIngredient
}

type TypeEmits = {
  (event: 'remove'): void
}

defineProps<TypeProps>()
const emit =defineEmits<TypeEmits>()
</script>

<style lang="scss" scoped>
.ingredient-item {
  $root: &;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding-left: 2.5rem;

  &:before {
    content: '';
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    position: absolute;
    top: .8rem;
    left: 0;
    background: var(--cl-accent);
  }

  &__remove {
    margin: 0;
    padding: 0;
    border: none;
    box-shadow: none;
    background: none;
    outline: none;
    cursor: pointer;
    color: var(--cl-text);
    transition: opacity .2s ease-in-out;

    &:active {
      transform: translateY(1px);
    }
  }
}
</style>
