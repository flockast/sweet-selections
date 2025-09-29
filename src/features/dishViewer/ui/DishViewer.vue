<template>
  <TheBox>
    <div class="dish-viewer">
      <div class="dish-viewer__header">
        <div class="dish-viewer__back">
          <TheButtonLink
            :to="{
              name: ROUTE_NAMES.DISHES
            }"
          >
            <IconArrow direction="prev" />
          </TheButtonLink>
        </div>
        <div class="dish-viewer__title">{{ item.name }}</div>
      </div>
      <div class="dish-viewer__desc">{{ item.description }}</div>
      <div class="dish-viewer__metrics">
        <div class="dish-viewer__metric">
          <div class="dish-viewer__metric-icon"><IconClock /></div>
          <div>Время приготовления: {{ item.cookingTime }}</div>
        </div>
        <div class="dish-viewer__metric">
          <div class="dish-viewer__metric-icon"><IconPerson /></div>
          <div>Порции: {{ item.servings }}</div>
        </div>
      </div>
      <div class="dish-viewer__block">
        <div class="dish-viewer__cover">
          <img
            :src="`/images/dishes/${item.id}.jpg`"
            :alt="item.name"
          >
        </div>
      </div>
      <div class="dish-viewer__block">
        <div class="dish-viewer__subtitle">Ингредиенты</div>
        <ul class="the-list">
          <li
            v-for="ingredient in allIngredients"
            :key="ingredient.id"
          >
            {{ ingredient.name }}: {{ ingredient.amount }}
          </li>
        </ul>
      </div>
      <div class="dish-viewer__block">
        <div class="dish-viewer__subtitle">Инструкция по приготовлению</div>
        <ul class="the-list">
          <li
            v-for="(step, index) in item.recipe"
            :key="index"
          >
            {{ index + 1 }}. {{ step }}
          </li>
        </ul>
      </div>
    </div>
  </TheBox>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { ROUTE_NAMES } from '@/app/providers/router'
import { IconArrow, TheBox, TheButtonLink } from '@/shared/ui'
import { type TypeDish } from '@/entities/dishes'
import { IconClock, IconPerson } from '@/shared/ui'
import { useIngredients } from '@/entities/ingredients'

type TypeProps = {
  item: TypeDish
}

const props = defineProps<TypeProps>()

const ingredients = useIngredients()

const allIngredients = computed(() => {
  return props.item.ingredients.map((item) => ({
    ...ingredients.getItem(item.id),
    amount: item.amount
  }))
})
</script>

<style lang="scss" scoped>
.dish-viewer {
  &__header {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  &__title {
    font-size: 36px;
    font-weight: bold;
  }

  &__desc {
    margin-bottom: 3rem;
  }

  &__metrics {
    display: flex;
    align-items: center;
    gap: 3rem;
  }

  &__metric {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &__metric-icon {
    color: var(--cl-accent);
  }

  &__cover {
    height: 50rem;
    border-radius: var(--border-radius);
    overflow: hidden;

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__subtitle {
    font-size: 2.8rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
  }

  &__block {
    margin: 6rem 0;
  }
}

.the-list {
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    position: relative;
    padding-left: 2.5rem;

    &:before {
      content: '';
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      position: absolute;
      top: .6rem;
      left: 0;
      background: var(--cl-accent);
    }

    &:not(:last-child) {
      margin-bottom: 1.5rem;
    }
  }
}
</style>
