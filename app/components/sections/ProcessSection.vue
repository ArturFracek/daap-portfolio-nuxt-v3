<template>
  <section id="process" class="section process">
    <div class="container">
      <SectionHeading
        :title="title"
        :subtitle="t('process.subtitle')"
        align="center"
      />
      <div class="process__grid">
        <ProcessStep
          v-for="(step, index) in steps"
          :key="step.title"
          :index="index + 1"
          :label="t('process.stage_label')"
          :step="step"
          data-reveal
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

const title = computed(() => (
  `${t('process.title.prefix')} ${t('process.title.gradient')} ${t('process.title.suffix')}`
))

const stageKeys = ['stage1', 'stage2', 'stage3', 'stage4', 'stage5'] as const

const steps = computed(() => stageKeys.map((key) => ({
  title: t(`process.${key}.title`),
  description: t(`process.${key}.description`),
  feature1: t(`process.${key}.feature1`),
  feature2: t(`process.${key}.feature2`),
  feature3: t(`process.${key}.feature3`),
  feature4: t(`process.${key}.feature4`)
})))
</script>

<style scoped lang="scss">
.process {
  background: rgba(var(--color-surface-rgb), 0.45);
}

.process__grid {
  margin-top: 2.5rem;
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}
</style>
