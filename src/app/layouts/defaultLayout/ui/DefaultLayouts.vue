<template>
  <div class="default-layout">
    <header class="default-layout__header">
      <TheHeader />
    </header>
    <main class="default-layout__main">
      <RouterView v-slot="{ Component, route }">
        <ContentWrapperBlock>
          <div
            :key="route.fullPath"
            class="default-layout__content"
          >
            <component :is="Component" />
          </div>
        </ContentWrapperBlock>
      </RouterView>
    </main>
    <footer class="default-layout__footer">
      <TheFooter />
    </footer>
  </div>
</template>

<script lang="ts" setup>
import TheHeader from './TheHeader.vue'
import TheFooter from './TheFooter.vue'
import { ContentWrapperBlock } from '@/shared/ui'
</script>

<style lang="scss" scoped>
.default-layout {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header"
    "main"
    "footer";
}

.default-layout__header {
  grid-area: header;
  position: sticky;
  top: 0;
  z-index: 2;
  background: var(--cl-header-bg);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-bottom: 1px solid var(--cl-border);
  transition: border .2s ease-in-out;
}

.default-layout__main {
  grid-area: main;
  display: grid;
  place-items: center;
  min-height: 0; /* Важно для контента с переполнением */
}

.default-layout__content {
  height: 100%;
}

.default-layout__footer {
  grid-area: footer;
  border-top: 1px solid var(--cl-border);
  transition: border .2s ease-in-out;
}
</style>
