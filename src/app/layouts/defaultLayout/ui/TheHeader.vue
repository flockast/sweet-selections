<template>
  <div class="header container">
    <div class="header__logo">
      <RouterLink
        :to="{ name: ROUTE_NAMES.HOME }"
      >
        <TheLogo />
      </RouterLink>
      <div class="logo"></div>
    </div>
    <nav class="header__menu">
      <ul>
        <li>
          <RouterLink
            :to="{ name: ROUTE_NAMES.FAVOURITE_DISHED }"
          >
            Любимые блюда
          </RouterLink>
        </li>
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
import { ROUTE_NAMES } from '@/shared/constants'
import { ThemeToggleButton } from '@/features/themeToggle'
import TheLogo from './TheLogo.vue'
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  height: 8rem;
  padding: 1rem 1.5rem;

  &__logo {
    margin-right: auto;

    a {
      display: block;
      text-decoration: none;

      &:active {
        transform: translateY(1px);
      }
    }
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
          padding: 0 .2rem;
          border-radius: 5px 5px 0 0;

          &:hover {
            box-shadow: inset 0 -2px 0 var(--cl-accent);
          }

          &:active {
            transform: translateY(1px);
          }

          &.router-link-active {
            box-shadow: inset 0 -2px 0 var(--cl-accent);
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
</style>
