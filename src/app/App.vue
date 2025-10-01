<template>
  <WelcomePopup
    v-if="welcomePopup.state.isVisible"
    @close="welcomePopup.hide"
  />
  <RouterView />
</template>

<script lang="ts" setup>
import { useWelcomePopup } from '@/entities/welcomePopup'
import { WelcomePopup } from '@/features/welcomePopup'

const welcomePopup = useWelcomePopup()
</script>
