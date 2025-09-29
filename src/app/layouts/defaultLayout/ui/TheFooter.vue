<template>
  <div class="footer container">
    <div class="footer__copyright">
      {{ getCurrentYear() }} © Татьяна Панина
    </div>
  </div>
</template>

<script lang="ts" setup>
import { DateTime } from 'luxon'
import { ThemeToggleButton } from '@/features/themeToggle'

const getCurrentYear = () => {
  const { year } = DateTime
    .now()
    .setZone('Europe/Moscow')
    .toObject()
  return year
}
</script>


<style lang="scss" scoped>
.footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 8rem;
  padding: 1rem 1.5rem;
  color: #8b8b8b;

  &__copyright {
    margin-right: auto;
    font-size: 1.6rem;
  }
}
</style>
