<template>
  <div class="footer container">
    © {{ getCurrentYear() }} Татьяна Панина
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
}
</style>

<script lang="ts" setup>
import { DateTime } from 'luxon'

const getCurrentYear = () => {
  const { year } = DateTime
    .now()
    .setZone('Europe/Moscow')
    .toObject()
  return year
}
</script>
