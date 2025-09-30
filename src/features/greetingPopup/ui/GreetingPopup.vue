<template>
  <Transition name="fade">
    <div
      v-if="greetingPopup.state.isVisible"
      class="greeting-popup"
      @click.stop
    >
      <Transition name="fade-up">
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
              <TheButton @click.prevent="handleClickGo">Начать творить</TheButton>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useGreetingPopup } from '@/entities/greetingPopup'
import { TheButton } from '@/shared/ui'
import { createMouseParallax } from '@/shared/lib/parallax'

const showWindow = ref(false)

const greetingPopup = useGreetingPopup()
const parallax = createMouseParallax()

const handleClickGo = () => {
  showWindow.value = false
  setTimeout(() => {
    greetingPopup.hide()
  }, 1000)
}

const initParallax = () => {
  const croissant = document.querySelector('.croissant')
  if (croissant instanceof HTMLElement) {
    parallax.addElement(croissant, 0.09)
  }

  const pancake = document.querySelector('.pancake')
  if (pancake instanceof HTMLElement) {
    parallax.addElement(pancake, 0.01)
  }

  const title = document.querySelector('.window__title')
  if (title instanceof HTMLElement) {
    parallax.addElement(title, 0.01)
  }

  parallax.start()
}

const destroyParallax = () => {
  parallax.start()
}

onBeforeUnmount(() => {
  destroyParallax()
})

const nextTickDelay = async () => {
  await nextTick()
  return new Promise((resolve) => setTimeout(resolve, 300))
}

onMounted(async () => {
  if (greetingPopup.state.isVisible) {
    showWindow.value = true
    await nextTickDelay()
    initParallax()
  }
})
</script>

<style lang="scss" scoped>
.fade-up-enter-active,
.fade-up-leave-active {
  transition: opacity 1s ease, transform 1s ease;
}

.fade-up-enter-from {
  opacity: 0;
  transform: translateY(50px);
}

.fade-up-leave-to {
  opacity: 0;
  transform: translateY(50px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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
  width: 160px;
  height: 100px;
  background: url('../assets/croissant.png');
  background-size: cover;
}

.pancake {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 188px;
  height: 100px;
  background: url('../assets/pancake.png');
  background-size: cover;
}
</style>
