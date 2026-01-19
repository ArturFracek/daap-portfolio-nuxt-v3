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
  border-radius: 0;
  padding: 1.5rem;
  clip-path: polygon(
    var(--cut-size) 0,
    100% 0,
    100% calc(100% - var(--cut-size)),
    calc(100% - var(--cut-size)) 100%,
    0 100%,
    0 var(--cut-size)
  );
}

.card--solid {
  background: var(--color-surface);
  border: 2px solid rgba(var(--color-border-rgb), 0.7);
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.08);
}

.card--outline {
  background: transparent;
  border: 2px solid rgba(var(--color-border-rgb), 0.7);
}

.card--glass {
  background: rgba(var(--color-surface-rgb), 0.7);
  border: 2px solid rgba(var(--color-border-rgb), 0.45);
  backdrop-filter: blur(12px);
}
</style>
