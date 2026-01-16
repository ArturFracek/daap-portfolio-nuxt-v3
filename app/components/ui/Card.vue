<template>
  <div :class="['card', `card--${variant}`]">
    <slot />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'solid' | 'outline' | 'glass'
  }>(),
  {
    variant: 'solid'
  }
)
</script>

<style scoped lang="scss">
.card {
  border-radius: 20px;
  padding: 1.5rem;
}

.card--solid {
  background: var(--color-surface);
  border: 1px solid rgba(var(--color-border-rgb), 0.6);
}

.card--outline {
  background: transparent;
  border: 1px solid rgba(var(--color-border-rgb), 0.6);
}

.card--glass {
  background: rgba(var(--color-surface-rgb), 0.7);
  border: 1px solid rgba(var(--color-border-rgb), 0.4);
  backdrop-filter: blur(12px);
}
</style>
