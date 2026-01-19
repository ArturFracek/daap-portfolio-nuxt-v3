<template>
  <section id="process" class="section process" ref="sectionRef">
    <div class="container">
      <SectionHeading
        :title="title"
        :subtitle="t('process.subtitle')"
        align="center"
      />
      <div class="process__layout">
        <aside class="process__panel" :style="{ '--progress': scrollProgress }">
          <div class="process__panel-frame">
            <span class="process__panel-label">{{ t('process.stage_label') }}</span>
            <p class="process__panel-subtitle">{{ t('process.subtitle') }}</p>
            <div class="process__rail">
              <span class="process__rail-track"></span>
              <span class="process__rail-fill"></span>
              <ol class="process__rail-list">
                <li
                  v-for="(step, index) in steps"
                  :key="step.title"
                  :class="{ 'is-active': activeIndex === index }"
                >
                  <span class="process__rail-index">{{ index + 1 }}</span>
                  <span class="process__rail-title">{{ step.title }}</span>
                </li>
              </ol>
            </div>
          </div>
        </aside>
        <div class="process__scroller">
          <div class="process__scroller-content">
            <article
              v-for="(step, index) in steps"
              :key="step.title"
              class="process__card"
              :class="{ 'is-active': activeIndex === index }"
              :ref="setCardRef"
            >
              <div class="process__card-head">
                <span class="process__card-badge">
                  {{ t('process.stage_label') }} {{ index + 1 }}
                </span>
                <span class="process__card-index">0{{ index + 1 }}</span>
              </div>
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
              <ul>
                <li v-for="item in features(step)" :key="item">{{ item }}</li>
              </ul>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Lenis from "lenis";

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

const sectionRef = ref<HTMLElement | null>(null)
const cardRefs = ref<HTMLElement[]>([])
const activeIndex = ref(0)
const scrollProgress = ref(0)
let lenis: Lenis | null = null
let rafId: number | null = null

const features = (step: (typeof steps.value)[number]) => [
  step.feature1,
  step.feature2,
  step.feature3,
  step.feature4
]

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

const setCardRef = (el: HTMLElement | null) => {
  if (el) cardRefs.value.push(el)
}

const updateActiveIndexFromWindow = () => {
  if (!cardRefs.value.length) return
  const focusPoint = window.innerHeight * 0.45
  let closestIndex = 0
  let closestDistance = Number.POSITIVE_INFINITY
  cardRefs.value.forEach((card, index) => {
    const rect = card.getBoundingClientRect()
    const cardCenter = rect.top + rect.height / 2
    const distance = Math.abs(cardCenter - focusPoint)
    if (distance < closestDistance) {
      closestDistance = distance
      closestIndex = index
    }
  })
  activeIndex.value = closestIndex

  const first = cardRefs.value[0]
  const last = cardRefs.value[cardRefs.value.length - 1]
  const scrollY = window.scrollY || window.pageYOffset
  const start = first.getBoundingClientRect().top + scrollY
  const end = last.getBoundingClientRect().top + scrollY
  const current = scrollY + focusPoint
  const total = Math.max(1, end - start)
  scrollProgress.value = clamp((current - start) / total, 0, 1)
}

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

  lenis = new Lenis({
    smoothWheel: false,
    syncTouch: true
  })

  const raf = (time: number) => {
    lenis?.raf(time)
    rafId = requestAnimationFrame(raf)
  }
  rafId = requestAnimationFrame(raf)

  lenis.on("scroll", updateActiveIndexFromWindow)
  updateActiveIndexFromWindow()
})

onBeforeUnmount(() => {
  if (rafId !== null) cancelAnimationFrame(rafId)
  lenis?.destroy()
  lenis = null
})

onBeforeUpdate(() => {
  cardRefs.value = []
})
</script>

<style scoped lang="scss">
.process {
  background:
    radial-gradient(
      60% 90% at 0% 0%,
      rgba(var(--color-primary-rgb), 0.14) 0%,
      rgba(var(--color-primary-rgb), 0) 65%
    ),
    radial-gradient(
      55% 80% at 100% 0%,
      rgba(var(--color-accent-rgb), 0.16) 0%,
      rgba(var(--color-accent-rgb), 0) 70%
    ),
    rgba(var(--color-surface-rgb), 0.35);
}

.process__layout {
  margin-top: 2.5rem;
  display: grid;
  gap: 2rem;
  align-items: start;
  grid-template-columns: minmax(240px, 320px) minmax(0, 1fr);
}

.process__panel {
  position: sticky;
  top: clamp(90px, 12vh, 140px);
  align-self: start;
}

.process__panel-frame {
  position: relative;
  padding: 1.6rem 1.6rem 2rem;
  background: linear-gradient(
      140deg,
      rgba(var(--color-primary-rgb), 0.18),
      rgba(var(--color-secondary-rgb), 0.08),
      rgba(var(--color-surface-rgb), 0.92)
    ),
    repeating-linear-gradient(
      0deg,
      rgba(var(--color-border-rgb), 0.2) 0 1px,
      transparent 1px 12px
    );
  border: 2px solid rgba(var(--color-border-rgb), 0.65);
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.18);
  clip-path: polygon(
    var(--cut-size) 0,
    100% 0,
    100% calc(100% - var(--cut-size)),
    calc(100% - var(--cut-size)) 100%,
    0 100%,
    0 var(--cut-size)
  );
}

.process__panel-label {
  display: inline-flex;
  padding: 0.2rem 0.6rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background: rgba(var(--color-accent-rgb), 0.2);
  border: 1px solid rgba(var(--color-accent-rgb), 0.45);
}

.process__panel-subtitle {
  margin: 0.7rem 0 1.2rem;
  color: var(--color-text-secondary);
}

.process__rail {
  position: relative;
  padding-left: 1.6rem;
}

.process__rail-track,
.process__rail-fill {
  position: absolute;
  left: 0;
  top: 0.35rem;
  bottom: 0.35rem;
  width: 3px;
}

.process__rail-track {
  background: rgba(var(--color-border-rgb), 0.4);
}

.process__rail-fill {
  background: linear-gradient(
    180deg,
    rgba(var(--color-accent-rgb), 0.9) 0%,
    rgba(var(--color-primary-rgb), 0.4) 100%
  );
  height: calc(var(--progress, 0) * 100%);
  bottom: auto;
}

.process__rail-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 1rem;
}

.process__rail-list li {
  display: grid;
  gap: 0.2rem;
  color: var(--color-text-secondary);
  transition: color 0.2s ease;
}

.process__rail-list li.is-active {
  color: var(--color-text);
}

.process__rail-index {
  font-weight: 700;
  color: rgba(var(--color-accent-rgb), 0.9);
  font-size: 0.85rem;
  letter-spacing: 0.08em;
}

.process__rail-title {
  font-size: 0.95rem;
}

.process__scroller {
  position: relative;
  height: auto;
  padding: 12px;
  overflow: visible;
  background: linear-gradient(
      135deg,
      rgba(var(--color-surface-rgb), 0.8),
      rgba(var(--color-primary-rgb), 0.12)
    ),
    repeating-linear-gradient(
      90deg,
      rgba(var(--color-border-rgb), 0.12) 0 1px,
      transparent 1px 16px
    );
  border: 2px solid rgba(var(--color-border-rgb), 0.65);
  clip-path: polygon(
    var(--cut-size) 0,
    100% 0,
    100% calc(100% - var(--cut-size)),
    calc(100% - var(--cut-size)) 100%,
    0 100%,
    0 var(--cut-size)
  );
}

.process__scroller::before {
  content: "";
  position: absolute;
  inset: 10px;
  border: 1px solid rgba(var(--color-border-rgb), 0.5);
  background: rgba(var(--color-surface-rgb), 0.82);
  backdrop-filter: blur(12px);
  clip-path: polygon(
    var(--cut-size) 0,
    100% 0,
    100% calc(100% - var(--cut-size)),
    calc(100% - var(--cut-size)) 100%,
    0 100%,
    0 var(--cut-size)
  );
  pointer-events: none;
}

.process__scroller-content {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 1.4rem;
  padding: 1.4rem;
}

.process__card {
  padding: 1.6rem;
  background: linear-gradient(
      150deg,
      rgba(var(--color-surface-rgb), 0.9),
      rgba(var(--color-primary-rgb), 0.08)
    ),
    repeating-linear-gradient(
      120deg,
      rgba(var(--color-border-rgb), 0.16) 0 1px,
      transparent 1px 22px
    );
  border: 2px solid rgba(var(--color-border-rgb), 0.6);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12);
  clip-path: polygon(
    var(--cut-size) 0,
    100% 0,
    100% calc(100% - var(--cut-size)),
    calc(100% - var(--cut-size)) 100%,
    0 100%,
    0 var(--cut-size)
  );
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.process__card.is-active {
  transform: translateX(6px);
  border-color: rgba(var(--color-accent-rgb), 0.7);
}

.process__card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.process__card-badge {
  display: inline-flex;
  padding: 0.25rem 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.72rem;
  background: rgba(var(--color-accent-rgb), 0.18);
  border: 1px solid rgba(var(--color-accent-rgb), 0.5);
}

.process__card-index {
  font-size: 1.1rem;
  letter-spacing: 0.12em;
  color: rgba(var(--color-primary-rgb), 0.8);
  font-weight: 700;
}

.process__card h3 {
  margin: 0.7rem 0 0.4rem;
}

.process__card p {
  color: var(--color-text-secondary);
  margin: 0 0 1rem;
}

.process__card ul {
  margin: 0;
  display: grid;
  gap: 0.5rem;
  padding-left: 1.2rem;
  color: var(--color-text-secondary);
}

@media (max-width: 960px) {
  .process__layout {
    grid-template-columns: 1fr;
  }

  .process__panel {
    position: relative;
    top: 0;
  }

  .process__scroller {
    height: auto;
    overflow: visible;
  }

  .process__scroller::before {
    display: none;
  }
}
</style>
