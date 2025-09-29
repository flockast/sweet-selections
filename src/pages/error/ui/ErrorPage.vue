<template>
  <div class="error-page">
    <TheErrorBlock />
  </div>
</template>

<script lang="ts" setup>
import { TheErrorBlock } from '@/shared/ui'
</script>

<style lang="scss" scoped>
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
