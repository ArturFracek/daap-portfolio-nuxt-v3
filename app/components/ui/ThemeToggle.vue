<template>
  <button
    class="theme-toggle"
    type="button"
    :aria-label="isDark ? t('controls.switchToLight') : t('controls.switchToDark')"
    @click="toggle"
  >
    <span class="theme-toggle__dot" />
    <span class="theme-toggle__label">
      {{ isDark ? 'Dark' : 'Light' }}
    </span>
  </button>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const { t } = useI18n()

const isDark = computed(() => colorMode.value === 'dark')

const toggle = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>

<style scoped lang="scss">
.theme-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  border: 1px solid rgba(var(--color-border-rgb), 0.7);
  background: rgba(var(--color-surface-rgb), 0.7);
  color: var(--color-text);
  cursor: pointer;
  transition: background 200ms ease, border-color 200ms ease;

  &:hover {
    border-color: rgba(var(--color-accent-rgb), 0.8);
  }
}

.theme-toggle__dot {
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: var(--gradient-primary);
  box-shadow: 0 0 12px rgba(var(--color-primary-rgb), 0.6);
}

.theme-toggle__label {
  font-size: 0.85rem;
  font-weight: 600;
}
</style>
