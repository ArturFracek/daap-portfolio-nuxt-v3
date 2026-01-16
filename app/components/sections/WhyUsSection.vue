<template>
  <section id="why-us" class="section why-us">
    <div class="container">
      <SectionHeading
        :title="t('whyUs.title')"
        :subtitle="t('whyUs.subtitle')"
        align="left"
      />
      <div class="why-us__grid">
        <Card
          v-for="card in cards"
          :key="card.id"
          variant="glass"
          class="why-us__card"
          data-reveal
        >
          <div class="why-us__card-header">
            <span class="why-us__index">0{{ card.index }}</span>
          </div>
          <h3 class="why-us__title">{{ rt(card.title) }}</h3>
          <p class="why-us__description">{{ rt(card.description) }}</p>
          <ul class="why-us__list">
            <li v-for="item in card.highlights" :key="item">{{ rt(item) }}</li>
          </ul>
        </Card>
      </div>
      <div class="why-us__cta">
        <Button
          v-if="cta?.primary"
          variant="primary"
          :to="cta.primary.href || '#contact'"
        >
          {{ rt(cta.primary.text) }}
        </Button>
        <Button
          v-if="cta?.secondary"
          variant="secondary"
          :to="cta.secondary.href || '#realizacje'"
        >
          {{ rt(cta.secondary.text) }}
        </Button>
        <span class="why-us__testimonial">{{ testimonial }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t, tm, rt } = useI18n();

type WhyCard = {
  title: string;
  description: string;
  highlights: string[];
};

const cardKeys = [
  "value1",
  "value2",
  "value3",
  "value4",
  "value5",
  "value6",
] as const;

const cards = computed<Array<WhyCard & { id: string; index: number }>>(() =>
  cardKeys.map((key, index) => ({
    ...(tm(`whyUs.${key}`) as WhyCard),
    id: key,
    index: index + 1,
  }))
);

const cta = computed(() => {
  const raw = tm("whyUs.value6.cta") as
    | {
        primary?: { text: string; href?: string };
        secondary?: { text: string; href?: string };
      }
    | null
    | undefined;
  if (!raw) return undefined;
  return {
    ...raw,
    primary: raw.primary ? { ...raw.primary } : undefined,
    secondary: raw.secondary ? { ...raw.secondary } : undefined,
  };
});
const testimonial = computed(() => rt(tm("whyUs.value6.testimonial")));
</script>

<style scoped lang="scss">
.why-us {
  position: relative;
  overflow: hidden;
}

.why-us::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
      60vw 50vh at 10% 20%,
      rgba(var(--color-primary-rgb), 0.18),
      transparent 60%
    ),
    radial-gradient(
      45vw 40vh at 90% 10%,
      rgba(var(--color-accent-rgb), 0.16),
      transparent 55%
    ),
    linear-gradient(
      180deg,
      rgba(var(--color-surface-rgb), 0.4),
      transparent 40%
    );
  pointer-events: none;
}

.container {
  position: relative;
  z-index: 1;
}

.why-us__grid {
  margin-top: 6vh;
  display: grid;
  gap: 2.4vw;
  grid-template-columns: repeat(auto-fit, minmax(28vw, 1fr));
}

.why-us__card {
  position: relative;
  padding: 28px 24px;
  background: linear-gradient(
    135deg,
    rgba(var(--color-surface-rgb), 0.9),
    rgba(var(--color-surface-rgb), 0.6)
  );
  border: 1px solid rgba(var(--color-border-rgb), 0.4);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
  overflow: hidden;
}

.why-us__card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 20px;
  border: 1px solid transparent;
  background: linear-gradient(transparent, transparent) padding-box,
    linear-gradient(
        120deg,
        rgba(var(--color-primary-rgb), 0.35),
        rgba(var(--color-accent-rgb), 0.1)
      )
      border-box;
  pointer-events: none;
}

.why-us__card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.why-us__index {
  font-size: clamp(0.8rem, 1.2vw, 1rem);
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(var(--color-text-secondary-rgb), 0.9);
}

.why-us__title {
  margin-bottom: 12px;
  font-size: clamp(1.2rem, 2vw, 1.6rem);
  font-weight: 800;
}

.why-us__description {
  color: var(--color-text-secondary);
  margin-bottom: 16px;
  max-width: 90%;
}

.why-us__list {
  display: grid;
  gap: 1.4vh;
  color: var(--color-text);
  padding-left: 18px;
}

.why-us__list li {
  position: relative;
  line-height: 1.6;
}

.why-us__list li::marker {
  color: var(--color-accent);
}

.why-us__cta {
  margin-top: 6vh;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2vw;
  padding: 18px 22px;
  background: rgba(var(--color-surface-rgb), 0.6);
  border-radius: 999px;
  border: 1px solid rgba(var(--color-border-rgb), 0.5);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.12);
}

.why-us__testimonial {
  color: var(--color-text-secondary);
  font-weight: 600;
}

@media (max-width: 900px) {
  .why-us__grid {
    grid-template-columns: 1fr;
    gap: 4vh;
  }

  .why-us__cta {
    border-radius: 24px;
    gap: 3vh;
  }
}
</style>
