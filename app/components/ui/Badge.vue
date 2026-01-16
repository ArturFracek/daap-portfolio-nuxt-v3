<template>
  <span :class="['badge', `badge--${variant}`]">
    <slot />
  </span>
</template>

<script setup lang="ts">
type BadgeVariant = 'primary' | 'secondary' | 'ghost'

withDefaults(
  defineProps<{
    variant?: BadgeVariant
  }>(),
  {
    variant: 'primary'
  }
)
</script>

<style scoped lang="scss">
.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  border: 1px solid transparent;
}

.badge--primary {
  background: rgba(var(--color-primary-rgb), 0.12);
  color: var(--color-primary);
  border-color: rgba(var(--color-primary-rgb), 0.2);
}

.badge--secondary {
  background: rgba(var(--color-secondary-rgb), 0.12);
  color: var(--color-secondary);
  border-color: rgba(var(--color-secondary-rgb), 0.2);
}

.badge--ghost {
  background: transparent;
  color: var(--color-text-secondary);
  border-color: rgba(var(--color-border-rgb), 0.6);
}
</style>
