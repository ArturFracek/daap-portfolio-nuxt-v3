<template>
  <div class="pair" :class="{ 'is-active': active }" :style="{ '--pair-index': index }">
    <Card variant="outline" class="pair__card pair__card--problem">
      <div class="pair__meta">
        <Badge variant="secondary">{{ rt(labels.problemBadge) }}</Badge>
        <span class="pair__marker">{{ rt(labels.problemBadge) }} {{ index + 1 }}</span>
      </div>
      <h3>{{ rt(problem.title) }}</h3>
      <p>{{ rt(problem.description) }}</p>
      <ul>
        <li v-for="item in problem.bullets" :key="item">{{ rt(item) }}</li>
      </ul>
    </Card>
    <Card variant="glass" class="pair__card pair__card--solution">
      <div class="pair__meta">
        <Badge variant="primary">{{ rt(labels.solutionBadge) }}</Badge>
        <span class="pair__marker">{{ rt(labels.solutionBadge) }} {{ index + 1 }}</span>
      </div>
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
  index: number
  active?: boolean
}>()
</script>

<style scoped lang="scss">
.pair {
  display: grid;
  gap: 1.8rem;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  align-items: stretch;
  position: relative;
  transform: translateY(calc(var(--pair-index) * 2px));
}

.pair__card {
  position: relative;
  padding: 1.4rem 1.5rem 1.5rem;
  border: 1px solid rgba(var(--color-border-rgb), 0.7);
  box-shadow: 0 18px 46px rgba(15, 23, 42, 0.16);
  transform: translateY(12px) translateX(var(--card-shift, 0px));
  transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
  overflow: hidden;
}

.pair__card::after {
  content: '';
  position: absolute;
  top: 14px;
  right: 14px;
  width: 52px;
  height: 6px;
  background: var(--gradient-accent);
  opacity: 0.7;
  clip-path: polygon(0 0, 100% 0, 88% 100%, 0 100%);
}

.pair__card--problem {
  --card-shift: -12px;
  background: linear-gradient(
      150deg,
      rgba(var(--color-surface-rgb), 0.96),
      rgba(var(--color-surface-rgb), 0.9)
    ),
    repeating-linear-gradient(
      120deg,
      rgba(var(--color-border-rgb), 0.14) 0 1px,
      transparent 1px 12px
    );
}

.pair__card--solution {
  --card-shift: 12px;
  background: linear-gradient(
      150deg,
      rgba(var(--color-surface-rgb), 0.98),
      rgba(var(--color-primary-rgb), 0.12)
    ),
    repeating-linear-gradient(
      120deg,
      rgba(var(--color-border-rgb), 0.18) 0 1px,
      transparent 1px 12px
    );
  border-color: rgba(var(--color-primary-rgb), 0.45);
}

.pair__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.pair__marker {
  font-family: 'Unbounded', sans-serif;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-text-secondary);
}

.pair.is-active .pair__card {
  transform: translateY(0) translateX(var(--card-shift, 0px));
  box-shadow: 0 26px 62px rgba(15, 23, 42, 0.2);
  border-color: rgba(var(--color-accent-rgb), 0.6);
}

.pair:nth-child(even) .pair__card--problem {
  --card-shift: -6px;
}

.pair:nth-child(even) .pair__card--solution {
  --card-shift: 6px;
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

@media (max-width: 900px) {
  .pair {
    grid-template-columns: 1fr;
  }

  .pair__card {
    transform: translateY(0);
  }
}
</style>
