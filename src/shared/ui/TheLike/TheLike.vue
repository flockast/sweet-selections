<template>
  <button
    class="the-like"
    @click="toggle"
  >
    <HeartIcon
      class="the-like__icon"
      :class="iconClasses"
      @animationend="onIconAnimationEnds"
    />
    <Transition name="particles-transition">
      <div
        v-if="animating"
        class="the-like__particles"
      />
    </Transition>
  </button>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import HeartIcon from './HeartIcon.vue'

type TypeProps = {
  modelValue: boolean
}

type TypeEmits = {
  (event: 'update:modelValue', value: boolean): void
}

const props = defineProps<TypeProps>()
const emit = defineEmits<TypeEmits>()

const animating = ref(false)

const iconClasses = computed(() => ({
  'the-like__icon--active': props.modelValue,
  'the-like__icon--animate': animating.value
}))

const toggle = () => {
  // Only animate on favoriting
  if (!props.modelValue) {
    animating.value = true
  }

  const newValue = !props.modelValue
  emit('update:modelValue', newValue)
}

const onIconAnimationEnds = () => {
  animating.value = false
}
</script>

<style lang="scss" scoped>
.the-like {
  --particles-animation-duration: 0.8s;
  --icon-animation-duration: 0.48s;
  --icon-color: hsl(1, 89%, 61%);
  --icon-background: var(--cl-like-bg);
  --icon-border-color: var(--cl-like-border);

  margin: 0;
  padding: 0;
  box-shadow: none;
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.8rem;
  height: 4.8rem;
  background: var(--icon-background);
  border-radius: 50%;
  position: relative;
  transition: transform .2s ease-in-out;

  &:active {
    transform: scale(.95);
  }

  &__icon {
    width: 2.4rem;
    height: 2.4rem;

    // Transition mainly for when un-favoriting
    transition: fill-opacity 0.2s, stroke 0.2s;
    fill: var(--icon-color);
    fill-opacity: 0;
    stroke: var(--icon-border-color);

    &--active {
      fill-opacity: 1;
      stroke: var(--icon-color);
    }

    // Icon animation
    &--animate {
      opacity: 0;
      transform: scale(0);
      animation-duration: var(--icon-animation-duration);
      animation-delay: calc(var(--particles-animation-duration) - var(--icon-animation-duration));
      animation-name: icon-animation;
    }
  }

  &__particles {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3em;
    height: 3em;
  }
}

@keyframes icon-animation {
  0% {
    opacity: 1;
    transform: scale(0.1);
  }

  50% {
    opacity: 1;
    transform: scale(1.1);
  }

  80% {
    opacity: 1;
    transform: scale(0.9);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes particles-animation {
  0% {
    background-position: left center;
  }
  100% {
    background-position: right center;
  }
}

// Particles animation.
.particles-transition-enter-active {
  background-image: url('./assets/particles-sprite.png');
  background-size: 2500% auto;
  background-position: left center;
  background-repeat: no-repeat;

  animation-duration: var(--particles-animation-duration);
  animation-timing-function: steps(24);
  animation-name: particles-animation;
}
</style>
