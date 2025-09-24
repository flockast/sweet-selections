<template>
  <div
    class="content-wrapper-block"
    :class="{
      'is-loading-wrapper': isLoadingWrapper
    }"
  >
    <transition name="fade" mode="out-in">
      <div
        v-if="isLoading"
        class="content-wrapper-block__loading"
      >
        Загрузка...
      </div>
      <div
        v-else-if="isNoData"
        class="content-wrapper-block__no-data"
      >
        <slot name="no-data">
          Нет данных
        </slot>
      </div>
      <slot v-else />
    </transition>
  </div>
</template>

<script setup lang="ts">
type TypeProps = {
  isNoData?: boolean
  isLoading?: boolean
  isLoadingWrapper?: boolean
}

withDefaults(defineProps<TypeProps>(), {
  isNoData: false,
  isLoading: false,
  isLoadingWrapper: false
})
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.content-wrapper-block {
  $root: &;

  width: 100%;
  height: 100%;

  &__no-data {
    font-size: 1.6rem;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__loading {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &.is-loading-wrapper {
    position: relative;

    #{$root}__loading {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: rgba(255, 255, 255, .5);
    }
  }
}
</style>
