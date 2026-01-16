<template>
  <div class="pair">
    <Card variant="outline">
      <Badge variant="secondary">{{ rt(labels.problemBadge) }}</Badge>
      <h3>{{ rt(problem.title) }}</h3>
      <p>{{ rt(problem.description) }}</p>
      <ul>
        <li v-for="item in problem.bullets" :key="item">{{ rt(item) }}</li>
      </ul>
    </Card>
    <Card variant="glass">
      <Badge variant="primary">{{ rt(labels.solutionBadge) }}</Badge>
      <h3>{{ rt(solution.title) }}</h3>
      <p>{{ rt(solution.description) }}</p>
      <ul>
        <li v-for="item in solution.bullets" :key="item">{{ rt(item) }}</li>
      </ul>
    </Card>
  </div>
</template>

<script setup lang="ts">
const { rt } = useI18n()

defineProps<{
  problem: {
    title: string
    description: string
    bullets: string[]
  }
  solution: {
    title: string
    description: string
    bullets: string[]
  }
  labels: {
    problemBadge: string
    solutionBadge: string
  }
}>()
</script>

<style scoped lang="scss">
.pair {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

h3 {
  margin: 0.75rem 0 0.5rem;
}

ul {
  margin-top: 1rem;
  display: grid;
  gap: 0.4rem;
  color: var(--color-text-secondary);
  padding-left: 1.1rem;
}
</style>
