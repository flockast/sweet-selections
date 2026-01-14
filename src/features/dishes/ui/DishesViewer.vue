<template>
  <TheBox>
    <div class="dish-viewer">
      <div class="dish-viewer__header">
        <div class="dish-viewer__back">
          <TheButtonLink :to="back">
            <IconArrow direction="prev" />
          </TheButtonLink>
        </div>
        <div class="dish-viewer__title">{{ item.name }}</div>
      </div>
      <div class="dish-viewer__cover">
        <img
          :src="`/images/dishes/${item.id}.jpg`"
          :alt="item.name"
        >
      </div>
      <ul
        v-if="dishTags.length"
        class="dish-viewer__tags"
      >
        <li
          v-for="tag in dishTags"
          :key="tag.id"
        >
          {{ tag.name }}
        </li>
      </ul>
      <div class="dish-viewer__metrics">
        <div class="dish-viewer__metric">
          <div class="dish-viewer__metric-icon"><IconClock /></div>
          <div>Время приготовления {{ item.cookingTime }} мин.</div>
        </div>
        <div class="dish-viewer__metric">
          <div class="dish-viewer__metric-icon"><IconPerson /></div>
          <div>{{ declOfNum(item.servings, ['порций', 'порции', 'порций'], true) }}</div>
        </div>
        <div class="dish-viewer__metric">
          <div class="dish-viewer__metric-icon"><IconGym /></div>
          <div>Одна порция {{ declOfNum(item.caloriesPerServing, ['калорий', 'калории', 'калорий'], true) }}</div>
        </div>
      </div>
      <div class="dish-viewer__desc">{{ item.description }}</div>
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
        <ul class="the-list the-list--none">
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
import { type RouteLocationRaw } from 'vue-router'
import { IconArrow, TheBox, TheButtonLink, IconClock, IconPerson, IconGym } from '@/shared/ui'
import { declOfNum } from '@/shared/helpers'
import { type TypeDish } from '@/entities/dishes'
import { useIngredients } from '@/entities/ingredients'
import { useTags, type TypeTag } from '@/entities/tags'

type TypeProps = {
  back: RouteLocationRaw
  item: TypeDish
}

const props = defineProps<TypeProps>()

const ingredients = useIngredients()
const tags = useTags()

const allIngredients = computed(() => {
  return props.item.ingredients.map((item) => ({
    ...ingredients.getItem(item.id),
    amount: item.amount
  }))
})

const dishTags = computed(() => props.item.tags
  .map((tagId) => tags.getItem(tagId))
  .filter((tag): tag is TypeTag => Boolean(tag))
)
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
    margin-top: 3rem;
  }

  &__metrics {
    margin-top: 3rem;
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

  &__tags {
    margin: 3rem 0 0 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: .8rem;

    & > * {
      background: var(--cl-border);
      border-radius: 10px;
      padding: .4rem .8rem;
      white-space: nowrap;
      font-size: 1.6rem;
    }
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

  &--none {
    li {
      padding-left: 0;

      &:before {
        display: none;
      }
    }
  }
}
</style>
