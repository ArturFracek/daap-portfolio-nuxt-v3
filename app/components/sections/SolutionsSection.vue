<template>
  <section id="solutions" class="section solutions">
    <div class="container">
      <SectionHeading
        :eyebrow="t('solutions.eyebrow')"
        :title="t('solutions.title')"
        :subtitle="t('solutions.subtitle')"
        align="center"
      />
      <div class="solutions__intro">
        <p class="solutions__lead">{{ t('solutions.lead') }}</p>
        <div class="solutions__stats">
          <div v-for="stat in stats" :key="stat.label" class="solutions__stat">
            <span class="solutions__stat-value">{{ stat.value }}</span>
            <span class="solutions__stat-label">{{ stat.label }}</span>
          </div>
        </div>
      </div>
      <div class="solutions__grid">
        <Card
          v-for="item in items"
          :key="item.title"
          variant="glass"
          class="solutions__card"
          data-reveal
        >
          <div class="solutions__card-header">
            <Badge :variant="item.badgeVariant">{{ item.badge }}</Badge>
            <h3 class="solutions__card-title">{{ item.title }}</h3>
          </div>
          <p class="solutions__card-description">{{ item.description }}</p>
          <ul class="solutions__card-list">
            <li v-for="(point, index) in item.highlights" :key="index">
              <span class="solutions__card-dot" aria-hidden="true"></span>
              <span>{{ point }}</span>
            </li>
          </ul>
          <div class="solutions__card-tags">
            <Badge
              v-for="tag in item.tags"
              :key="tag"
              variant="ghost"
            >
              {{ tag }}
            </Badge>
          </div>
        </Card>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t, tm, rt } = useI18n()

type SolutionItem = {
  title: string
  description: string
  badge: string
  badgeVariant: 'primary' | 'secondary' | 'ghost'
  highlights: string[]
  tags: string[]
}

type SolutionStat = {
  value: string
  label: string
}

const items = computed<SolutionItem[]>(() => [
  {
    title: t('solutions.mes.title'),
    description: t('solutions.mes.description'),
    badge: t('solutions.mes.badge'),
    badgeVariant: 'primary',
    highlights: (tm('solutions.mes.highlights') as string[]).map((item) => rt(item)),
    tags: (tm('solutions.mes.tags') as string[]).map((item) => rt(item))
  },
  {
    title: t('solutions.integration.title'),
    description: t('solutions.integration.description'),
    badge: t('solutions.integration.badge'),
    badgeVariant: 'secondary',
    highlights: (tm('solutions.integration.highlights') as string[]).map((item) => rt(item)),
    tags: (tm('solutions.integration.tags') as string[]).map((item) => rt(item))
  },
  {
    title: t('solutions.automation.title'),
    description: t('solutions.automation.description'),
    badge: t('solutions.automation.badge'),
    badgeVariant: 'primary',
    highlights: (tm('solutions.automation.highlights') as string[]).map((item) => rt(item)),
    tags: (tm('solutions.automation.tags') as string[]).map((item) => rt(item))
  }
])

const stats = computed<SolutionStat[]>(() => (
  (tm('solutions.stats') as SolutionStat[]).map((stat) => ({
    value: rt(stat.value),
    label: rt(stat.label)
  }))
))
</script>

<style scoped lang="scss">
.solutions {
  background: radial-gradient(
      60% 70% at 10% 0%,
      rgba(var(--color-primary-rgb), 0.16) 0%,
      rgba(var(--color-primary-rgb), 0) 70%
    ),
    radial-gradient(
      50% 70% at 90% 10%,
      rgba(var(--color-secondary-rgb), 0.18) 0%,
      rgba(var(--color-secondary-rgb), 0) 68%
    ),
    rgba(var(--color-surface-rgb), 0.45);
}

.solutions__intro {
  margin-top: 1.4rem;
  display: grid;
  gap: 1.4rem;
  align-items: center;
  justify-items: center;
}

.solutions__lead {
  max-width: 720px;
  text-align: center;
  color: var(--color-text-secondary);
}

.solutions__stats {
  width: min(760px, 100%);
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
}

.solutions__stat {
  padding: 0.9rem 1.1rem;
  border-radius: 0;
  border: 1px solid rgba(var(--color-border-rgb), 0.6);
  background: rgba(var(--color-surface-rgb), 0.7);
  display: grid;
  gap: 0.4rem;
  text-align: center;
  clip-path: polygon(
    var(--cut-size-sm) 0,
    100% 0,
    100% calc(100% - var(--cut-size-sm)),
    calc(100% - var(--cut-size-sm)) 100%,
    0 100%,
    0 var(--cut-size-sm)
  );
}

.solutions__stat-value {
  font-size: clamp(18px, 2vw, 24px);
  font-weight: 700;
}

.solutions__stat-label {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
}

.solutions__grid {
  margin-top: 2.4rem;
  display: grid;
  gap: 1.6rem;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.solutions__card {
  display: grid;
  gap: 1rem;
  position: relative;
  padding: 1.7rem;
  min-height: 100%;
}

.solutions__card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 0;
  padding: 1px;
  background: linear-gradient(
    140deg,
    rgba(var(--color-primary-rgb), 0.4),
    rgba(var(--color-secondary-rgb), 0.35),
    rgba(var(--color-accent-rgb), 0.35)
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}

.solutions__card-header {
  display: grid;
  gap: 0.65rem;
}

.solutions__card-title {
  font-size: clamp(18px, 1.6vw, 22px);
  letter-spacing: 0.2px;
}

.solutions__card-description {
  color: var(--color-text-secondary);
}

.solutions__card-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.6rem;
  color: var(--color-text-secondary);
}

.solutions__card-list li {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.6rem;
  align-items: start;
}

.solutions__card-dot {
  width: 8px;
  height: 8px;
  margin-top: 6px;
  border-radius: 0;
  background: var(--gradient-accent);
  box-shadow: 0 0 0 4px rgba(var(--color-accent-rgb), 0.12);
}

.solutions__card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.solutions__card-tags :deep(.badge--ghost) {
  background: rgba(var(--color-primary-rgb), 0.08);
  border-color: rgba(var(--color-primary-rgb), 0.18);
  color: var(--color-text);
}

@media (max-width: 768px) {
  .solutions__stats {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  }

  .solutions__card {
    padding: 1.4rem;
  }
}
</style>
