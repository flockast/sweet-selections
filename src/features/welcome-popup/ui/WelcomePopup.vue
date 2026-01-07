<template>
  <Transition name="overlay">
    <div
      v-if="showOverlay"
      class="greeting-popup"
      @click.stop
    >
      <Transition name="window">
        <div
          v-if="showWindow"
          class="window"
        >
          <div class="croissant"/>
          <div class="pancake" />
          <div class="window__greet">Добро пожаловать</div>
          <div class="window__title">Sweet Selections</div>
          <div class="window__desc">Откройте для себя идеальные рецепты кондитерских изделий, выбирая ингредиенты, которые у вас есть. Наше приложение поможет вам легко превратить обычные ингредиенты во вкусные угощения.</div>
          <div class="window__footer">
            <div class="window__button">
              <TheButton @click.prevent="handleClickStart">Начать творить</TheButton>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { TheButton } from '@/shared/ui'
import { delay } from '@/shared/helpers'
import { initParallax, destroyParallax } from '../helpers'

const showOverlay = ref(true)
const showWindow = ref(false)

type TypeEmits = {
  (event: 'close'): void
}

const emit = defineEmits<TypeEmits>()

const handleClickStart = async () => {
  await close()
  emit('close')
}

const open = async () => {
  showOverlay.value = true
  await delay(300)
  showWindow.value = true
  await delay(300)
  initParallax()
}

const close = async () => {
  showWindow.value = false
  await delay(300)
  showOverlay.value = false
  await delay(300)
  destroyParallax()
}

onMounted(async () => {
  await open()
})
</script>

<style lang="scss" scoped>
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity .3s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

.window-enter-active,
.window-leave-active {
  transition: opacity .3s ease, transform .3s ease;
}

.window-enter-from {
  opacity: 0;
  transform: translateY(50px);
}

.window-leave-to {
  opacity: 0;
  transform: translateY(50px);
}

.greeting-popup {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: var(--cl-popup-bg);

  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.window {
  position: relative;
  max-width: 800px;
  background: var(--cl-popup-window-bg);
  border-radius: 16px;
  padding: 3rem;
  box-shadow: var(--popup-window-box-shadow);


  &__greet {
    margin-bottom: 3rem;
    font-size: 5.2rem;
    font-weight: bold;
    text-align: center;
  }

  &__title {
    margin-bottom: 3rem;
    font-size: 5.2rem;
    font-weight: bold;
    text-align: center;
    font-family: 'Pacifico', cursive;
    color: var(--cl-accent);
  }

  &__desc {
    padding: 0 9rem;
    margin-bottom: 3rem;
    text-align: center;
  }

  &__footer {
    text-align: center;
  }

  &__button {
    display: inline-block;
  }
}

.croissant {
  position: absolute;
  right: 0;
  top: 100px;
  width: 130px;
  height: 80px;
  background: url('../assets/croissant.png');
  background-size: cover;
}

.pancake {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 245px;
  height: 130px;
  background: url('../assets/pancake.png');
  background-size: cover;
}
</style>
