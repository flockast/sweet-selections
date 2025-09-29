<template>
  <div class="header container">
    <div class="header__logo">
      <div class="logo">sweet selections</div>
    </div>
    <nav class="header__menu">
      <ul>
        <li><a href="#">Любимые блюда</a></li>
      </ul>
    </nav>
    <div class="header__actions">
      <div>
        <ThemeToggleButton color="#8b8b8b" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ThemeToggleButton } from '@/features/themeToggle'
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  height: 8rem;
  padding: 1rem 1.5rem;

  &__logo {
    margin-right: auto;
  }

  &__menu {
    ul {
      display: flex;
      align-items: center;
      list-style: none;
      li {
        a {
          display: block;
          color: var(--cl-text);
          text-decoration: none;
          transition: background .2s ease-in-out, color .2s ease-in-out;

          &:hover {
            background: var(--cl-accent);
            color: var(--cl-base-bg);
          }

          &:active {
            transform: translateY(.1rem);
          }
        }
      }
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    margin-left: 1.5rem;
  }
}

.logo {
  font-family: "Pacifico", cursive;
  font-weight: 400;
  font-style: normal;
  font-size: 4.2rem;
  color: var(--cl-accent);
}
</style>
