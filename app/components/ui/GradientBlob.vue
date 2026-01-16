<template>
  <div
    class="gradient-blob"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
      top,
      left,
      right,
      bottom,
      opacity
    }"
  />
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: number
    top?: string
    left?: string
    right?: string
    bottom?: string
    opacity?: number
  }>(),
  {
    size: 360,
    opacity: 0.35
  }
)
</script>

<style scoped lang="scss">
.gradient-blob {
  position: absolute;
  border-radius: 999px;
  background: var(--gradient-accent);
  filter: blur(60px);
  pointer-events: none;
  z-index: 0;
}
</style>
