<template>
  <button class="the-button">
    <slot/>
  </button>
</template>

<style lang="scss" scoped>
.the-button {
  display: block;
  width: 100%;
  margin: 0;
  border: none;
  border-radius: var(--border-radius);
  background: var(--cl-accent);
  color: white;
  padding: 1.5rem;
  box-shadow: none;
  cursor: pointer;
  transition: opacity .2s ease-in-out, transform .2s ease-in-out;
  opacity: .9;

  &:active {
    transform: translateY(2px);
  }

  &:hover {
    opacity: 1;
  }
}
</style>
