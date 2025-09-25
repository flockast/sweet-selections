<template>
  <div class="footer container">
    <div class="footer__copyright">
      © {{ getCurrentYear() }} Татьяна Панина
    </div>
    <div class="footer__actions">
      <div>
        <ThemeToggleButton color="#8b8b8b" />
      </div>
    </div>
  </div>
</template>

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
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
}
</style>

<script lang="ts" setup>
import { DateTime } from 'luxon'
import { ThemeToggleButton } from '@/features/ThemeToggle'

const getCurrentYear = () => {
  const { year } = DateTime
    .now()
    .setZone('Europe/Moscow')
    .toObject()
  return year
}
</script>
