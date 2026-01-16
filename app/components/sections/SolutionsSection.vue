<template>
  <section id="solutions" class="section solutions">
    <div class="container">
      <SectionHeading :title="t('solutions.title')" align="center" />
      <div class="solutions__grid">
        <Card v-for="item in items" :key="item.title" variant="glass" data-reveal>
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </Card>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

const items = computed(() => [
  {
    title: t('solutions.mes.title'),
    description: t('solutions.mes.description')
  },
  {
    title: t('solutions.integration.title'),
    description: t('solutions.integration.description')
  },
  {
    title: t('solutions.automation.title'),
    description: t('solutions.automation.description')
  }
])
</script>

<style scoped lang="scss">
.solutions {
  background: rgba(var(--color-surface-rgb), 0.5);
}

.solutions__grid {
  margin-top: 2rem;
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

h3 {
  font-size: 1.2rem;
  margin-bottom: 0.75rem;
}
</style>
