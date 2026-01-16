<template>
  <Card variant="glass">
    <Badge variant="secondary">{{ label }} {{ index }}</Badge>
    <h3>{{ step.title }}</h3>
    <p>{{ step.description }}</p>
    <ul>
      <li v-for="item in features" :key="item">{{ item }}</li>
    </ul>
  </Card>
</template>

<script setup lang="ts">
const props = defineProps<{
  index: number
  label: string
  step: {
    title: string
    description: string
    feature1: string
    feature2: string
    feature3: string
    feature4: string
  }
}>()
const features = computed(() => [
  props.step.feature1,
  props.step.feature2,
  props.step.feature3,
  props.step.feature4
])
</script>

<style scoped lang="scss">
h3 {
  margin: 0.8rem 0 0.5rem;
}

ul {
  margin-top: 1rem;
  display: grid;
  gap: 0.4rem;
  color: var(--color-text-secondary);
  padding-left: 1.1rem;
}
</style>
