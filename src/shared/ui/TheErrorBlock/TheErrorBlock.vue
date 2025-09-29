<template>
  <div class="the-error-block">
    <div
      class="the-error-block__emoji no-select"
      @click.prevent="updateEmoji"
    >
      {{ emojies[emojiIndex] }}
    </div>
    <div class="the-error-block__text">К сожалению, такой страницы не существует.</div>
    <a href="/" class="the-error-block__link">Вернуться на главную</a>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getRandomInRange } from '@/shared/helpers'

const emojiIndex = ref(0)

const emojies = [
  '(^-^*)',
  '(≥o≤)',
  '(>_<)',
  '\\(o_o)/',
  '(·_·)',
  '(·.·)',
  '(o^^)o',
  '(;-;)'
]

const setRandomEmoji = () => {
  emojiIndex.value = getRandomInRange(0, emojies.length - 1)
}

const updateEmoji = () => {
  const index = emojiIndex.value + 1
  emojiIndex.value = index % (emojies.length - 1)
}

onMounted(() => {
  setRandomEmoji()
})
</script>

<style lang="scss" scoped>
.the-error-block {
  text-align: center;

  &__emoji {
    margin-bottom: 6rem;
    font-size: 17rem;
    cursor: pointer;
    transition: .2s ease-in-out;

    &:active {
      transform: scale(.9);
    }
  }

  &__text {
    margin-bottom: 1.5rem;
  }

  &__link {
    display: inline-block;
    color: var(--cl-accent);
    text-decoration: none;
    transition: background .2s ease-in-out, color .2s ease-in-out;

    &:hover {
      background: var(--cl-accent);
      color: var(--cl-base-bg);
    }

    &:active {
      transform: translateY(1px);
    }
  }
}
</style>
