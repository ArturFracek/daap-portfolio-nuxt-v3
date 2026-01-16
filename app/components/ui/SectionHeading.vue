<template>
  <div :class="['section-heading', `section-heading--${align}`]">
    <p v-if="eyebrow" class="section-heading__eyebrow">{{ eyebrow }}</p>
    <h2 class="section-heading__title">
      <slot name="title">
        {{ title }}
      </slot>
    </h2>
    <p v-if="subtitle" class="section-heading__subtitle">{{ subtitle }}</p>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    subtitle?: string
    eyebrow?: string
    align?: 'left' | 'center' | 'right'
  }>(),
  {
    align: 'left'
  }
)
</script>

<style scoped lang="scss">
.section-heading {
  display: grid;
  gap: 0.6rem;
}

.section-heading--center {
  text-align: center;
  justify-items: center;
}

.section-heading--right {
  text-align: right;
  justify-items: end;
}

.section-heading__eyebrow {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--color-text-secondary);
}

.section-heading__title {
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  font-weight: 800;
}

.section-heading__subtitle {
  max-width: 620px;
  color: var(--color-text-secondary);
}
</style>
