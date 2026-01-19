<template>
  <component
    :is="componentTag"
    :to="to"
    :href="href"
    :class="['button', `button--${variant}`, `button--${size}`]"
  >
    <span class="button__content">
      <slot />
    </span>
  </component>
</template>

<script setup lang="ts">
type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    to?: string
    href?: string
    variant?: ButtonVariant
    size?: ButtonSize
  }>(),
  {
    variant: 'primary',
    size: 'md'
  }
)

const componentTag = computed(() => {
  if (props.to) return 'NuxtLink'
  if (props.href) return 'a'
  return 'button'
})
</script>

<style scoped lang="scss">
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0;
  border: 2px solid transparent;
  font-family: $font-family-heading;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 200ms ease, box-shadow 200ms ease, background-color 200ms ease, color 200ms ease;
  clip-path: polygon(
    var(--cut-size-sm) 0,
    100% 0,
    100% calc(100% - var(--cut-size-sm)),
    calc(100% - var(--cut-size-sm)) 100%,
    0 100%,
    0 var(--cut-size-sm)
  );
}

.button__content {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.button--primary {
  background: var(--gradient-primary);
  color: white;
  box-shadow: 0 12px 30px rgba(var(--color-primary-rgb), 0.3);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 18px 40px rgba(var(--color-primary-rgb), 0.4);
  }
}

.button--secondary {
  background: rgba(var(--color-surface-rgb), 0.7);
  border-color: rgba(var(--color-primary-rgb), 0.45);
  color: var(--color-text);
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.5);

  &:hover {
    border-color: rgba(var(--color-accent-rgb), 0.8);
    color: var(--color-accent);
  }
}

.button--ghost {
  background: transparent;
  color: var(--color-text-secondary);
  border-color: rgba(var(--color-border-rgb), 0.6);

  &:hover {
    color: var(--color-text);
    border-color: rgba(var(--color-accent-rgb), 0.6);
  }
}

.button--sm {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

.button--md {
  padding: 0.7rem 1.4rem;
  font-size: 1rem;
}

.button--lg {
  padding: 0.9rem 1.8rem;
  font-size: 1.05rem;
}
</style>
