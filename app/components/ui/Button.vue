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
  border-radius: 999px;
  border: 1px solid transparent;
  font-weight: 600;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: transform 200ms ease, box-shadow 200ms ease, background-color 200ms ease, color 200ms ease;
}

.button__content {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.button--primary {
  background: var(--gradient-primary);
  color: white;
  box-shadow: 0 12px 30px rgba(var(--color-primary-rgb), 0.35);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 18px 40px rgba(var(--color-primary-rgb), 0.45);
  }
}

.button--secondary {
  background: transparent;
  border-color: rgba(var(--color-primary-rgb), 0.4);
  color: var(--color-text);

  &:hover {
    border-color: rgba(var(--color-accent-rgb), 0.8);
    color: var(--color-accent);
  }
}

.button--ghost {
  background: transparent;
  color: var(--color-text-secondary);

  &:hover {
    color: var(--color-text);
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
