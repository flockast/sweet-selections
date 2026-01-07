<template>
  <div class="dish-card">
    <div class="dish-card__heart">
      <TheLike
        :model-value="isFavourite"
        @update:model-value="favouriteDishes.toggle(item.id)"
      />
    </div>
    <div class="dish-card__main">
      <div class="dish-card__image">
        <img
          :src="`/images/dishes/${item.id}.jpg`"
          :alt="item.name"
        >
      </div>
      <div class="dish-card__name">{{ item.name }}</div>
      <div class="dish-card__desc">{{ item.description }}</div>
    </div>
    <div class="dish-card__footer">
      <template v-if="Array.isArray(optionals)">
        <div
          v-if="optionals.length"
          class="dish-card__optionals"
        >
          + {{ optionals.join(', ') }}
        </div>
        <div
          v-else
          class="dish-card__full-complete"
        >
          всех ингредиентов хватает
        </div>
      </template>
      <TheButtonLink
        :to="to"
      >
        Посмотреть рецепт
      </TheButtonLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { type RouteLocationRaw } from 'vue-router'
import { TheButtonLink, TheLike } from '@/shared/ui'
import { type TypeDish } from '@/entities/dishes'
import { useFavouriteDishes } from '@/entities/favourite-dishes'

type TypeProps = {
  item: TypeDish
  to: RouteLocationRaw
  optionals?: string[]
}

const props = defineProps<TypeProps>()

const favouriteDishes = useFavouriteDishes()

const isFavourite = computed(() => {
  return favouriteDishes.state.list.includes(props.item.id)
})
</script>

<style lang="scss" scoped>
.dish-card {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1.5rem;
  border: 1px solid var(--cl-border);
  border-radius: var(--border-radius);

  &__main {
    margin-bottom: 3rem;
  }

  &__footer {
    margin-top: auto;
  }

  &__image {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: var(--border-radius);
    overflow: hidden;

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__heart {
    position: absolute;
    top: 3rem;
    right: 3rem;
  }

  &__name {
    font-weight: bold;
    margin-top: 1.5rem;
  }

  &__desc {
    font-size: 1.6rem;
    margin-top: 1.5rem;
  }

  &__optionals {
    margin-bottom: 1.5rem;
    font-size: 1.4rem;
    color: var(--cl-danger);
  }

  &__full-complete {
    margin-bottom: 1.5rem;
    font-size: 1.4rem;
    color: var(--cl-success);
  }
}
</style>
