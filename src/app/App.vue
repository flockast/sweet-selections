<template>
  <WelcomePopup
    v-if="welcomePopup.state.isVisible"
    @close="welcomePopup.hide"
  />
  <RouterView />
</template>

<script lang="ts" setup>
import { useWelcomePopup } from '@/entities/welcome-popup'
import { WelcomePopup } from '@/features/welcome-popup'

const welcomePopup = useWelcomePopup()
</script>
