<template>
  <div class="language-switch" role="group" :aria-label="t('controls.language')">
    <button
      type="button"
      class="language-switch__button"
      :class="{ 'is-active': locale === 'pl' }"
      @click="setLocale('pl')"
    >
      PL
    </button>
    <button
      type="button"
      class="language-switch__button"
      :class="{ 'is-active': locale === 'en' }"
      @click="setLocale('en')"
    >
      EN
    </button>
  </div>
</template>

<script setup lang="ts">
const { locale, setLocale, t } = useI18n()
</script>

<style scoped lang="scss">
.language-switch {
  display: inline-flex;
  padding: 0.2rem;
  border-radius: 999px;
  border: 1px solid rgba(var(--color-border-rgb), 0.7);
  background: rgba(var(--color-surface-rgb), 0.7);
}

.language-switch__button {
  padding: 0.35rem 0.7rem;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: var(--color-text-secondary);
  font-weight: 600;
  cursor: pointer;
  transition: background 200ms ease, color 200ms ease;

  &.is-active {
    background: var(--gradient-primary);
    color: white;
  }
}
</style>
