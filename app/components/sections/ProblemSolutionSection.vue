<template>
  <section id="problem-solution" class="section problem-solution">
    <div class="container">
      <SectionHeading
        :title="t('problemSolution.sectionTitle')"
        :subtitle="t('problemSolution.sectionSubtitle')"
        align="center"
      />
      <div class="problem-solution__list">
        <ProblemSolutionPair
          v-for="pair in pairs"
          :key="pair.id"
          :problem="pair.problem"
          :solution="pair.solution"
          :labels="labels"
          data-reveal
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t, tm } = useI18n()

type Pair = {
  id: string
  problem: { title: string; description: string; bullets: string[] }
  solution: { title: string; description: string; bullets: string[] }
}

const pairs = computed(() => {
  const raw = tm('problemSolution.pairs') as Pair[] | null | undefined
  if (!Array.isArray(raw)) return []
  return raw.map((pair) => ({
    ...pair,
    problem: {
      ...pair.problem,
      bullets: [...pair.problem.bullets]
    },
    solution: {
      ...pair.solution,
      bullets: [...pair.solution.bullets]
    }
  }))
})
const labels = computed(() => ({
  problemBadge: t('problemSolution.labels.problemBadge'),
  solutionBadge: t('problemSolution.labels.solutionBadge')
}))
</script>

<style scoped lang="scss">
.problem-solution {
  background: rgba(var(--color-surface-rgb), 0.5);
}

.problem-solution__list {
  margin-top: 2.5rem;
  display: grid;
  gap: 2rem;
}
</style>
