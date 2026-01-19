<template>
  <section id="problem-solution" class="section problem-solution">
    <div class="container">
      <SectionHeading
        :title="t('problemSolution.sectionTitle')"
        :subtitle="t('problemSolution.sectionSubtitle')"
        align="center"
      />
      <div
        class="problem-solution__scroller"
        ref="scrollerRef"
        :style="{
          '--scroll-progress': scrollProgress,
          '--active-index': activeIndex,
          '--pair-count': pairs.length
        }"
      >
        <div class="problem-solution__scroller-content" ref="scrollerContentRef">
          <ProblemSolutionPair
            v-for="(pair, index) in pairs"
            :key="pair.id"
            :problem="pair.problem"
            :solution="pair.solution"
            :labels="labels"
            :index="index"
            :active="index === activeIndex"
            data-reveal
          />
        </div>
        <div class="problem-solution__rail" aria-hidden="true"></div>
        <div class="problem-solution__progress" aria-hidden="true">
          <span
            v-for="(_, index) in pairs"
            :key="`ps-dot-${index}`"
            :class="[
              'problem-solution__dot',
              { 'is-active': index === activeIndex }
            ]"
          ></span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Lenis from 'lenis'

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

const scrollerRef = ref<HTMLElement | null>(null)
const scrollerContentRef = ref<HTMLElement | null>(null)
const activeIndex = ref(0)
const scrollProgress = ref(0)
let lenis: Lenis | null = null
let rafId: number | null = null

const updateActiveIndex = (scroll: number, limit: number) => {
  if (!pairs.value.length) return
  const step = limit / Math.max(pairs.value.length - 1, 1)
  const nextIndex = step > 0 ? Math.round(scroll / step) : 0
  activeIndex.value = Math.min(pairs.value.length - 1, Math.max(0, nextIndex))
  scrollProgress.value = limit > 0 ? Math.min(1, Math.max(0, scroll / limit)) : 0
}

onMounted(() => {
  if (!scrollerRef.value || !scrollerContentRef.value) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  lenis = new Lenis({
    wrapper: scrollerRef.value,
    content: scrollerContentRef.value,
    smoothWheel: true,
    syncTouch: true,
    lerp: 0.14,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.1
  })

  const raf = (time: number) => {
    lenis?.raf(time)
    rafId = requestAnimationFrame(raf)
  }
  rafId = requestAnimationFrame(raf)

  lenis.on('scroll', ({ scroll, limit }: { scroll: number; limit: number }) =>
    updateActiveIndex(scroll, limit)
  )
})

onBeforeUnmount(() => {
  if (rafId !== null) cancelAnimationFrame(rafId)
  lenis?.destroy()
  lenis = null
})
</script>

<style scoped lang="scss">
.problem-solution {
  background: rgba(var(--color-surface-rgb), 0.5);
}

.problem-solution__scroller {
  margin-top: 2.5rem;
  position: relative;
  height: clamp(520px, 78vh, 820px);
  overflow: hidden;
  padding: 16px;
  background: linear-gradient(
      145deg,
      rgba(var(--color-primary-rgb), 0.15),
      rgba(var(--color-secondary-rgb), 0.08),
      rgba(var(--color-accent-rgb), 0.16)
    ),
    repeating-linear-gradient(
      90deg,
      rgba(var(--color-border-rgb), 0.12) 0 1px,
      transparent 1px 16px
    );
  box-shadow: 0 28px 70px rgba(15, 23, 42, 0.22);
  clip-path: polygon(
    var(--cut-size) 0,
    100% 0,
    100% calc(100% - var(--cut-size)),
    calc(100% - var(--cut-size)) 100%,
    0 100%,
    0 var(--cut-size)
  );
}

.problem-solution__scroller::before {
  content: '';
  position: absolute;
  inset: 12px;
  background: linear-gradient(
    180deg,
    rgba(var(--color-surface-rgb), 0.96),
    rgba(var(--color-surface-rgb), 0.82)
  );
  border: 1px solid rgba(var(--color-border-rgb), 0.7);
  backdrop-filter: blur(16px);
  clip-path: polygon(
    var(--cut-size) 0,
    100% 0,
    100% calc(100% - var(--cut-size)),
    calc(100% - var(--cut-size)) 100%,
    0 100%,
    0 var(--cut-size)
  );
}

.problem-solution__scroller::after {
  content: '';
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 12px;
  height: 46px;
  background: linear-gradient(
    180deg,
    rgba(var(--color-surface-rgb), 0) 0%,
    rgba(var(--color-surface-rgb), 0.9) 85%
  );
  pointer-events: none;
}

.problem-solution__scroller-content {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 26px;
  padding: 32px 30px 44px;
}

.problem-solution__rail {
  position: absolute;
  top: 26px;
  bottom: 26px;
  left: 50%;
  width: 1px;
  background: linear-gradient(
    180deg,
    rgba(var(--color-border-rgb), 0),
    rgba(var(--color-border-rgb), 0.55),
    rgba(var(--color-border-rgb), 0)
  );
  transform: translateX(-50%);
  z-index: 1;
}

.problem-solution__progress {
  position: absolute;
  top: 28px;
  right: 18px;
  display: grid;
  gap: 10px;
  z-index: 2;
}

.problem-solution__dot {
  width: 8px;
  height: 18px;
  background: rgba(var(--color-border-rgb), 0.75);
  clip-path: polygon(0 0, 100% 0, 100% 80%, 70% 100%, 0 100%);
  transition: all 0.25s ease;
}

.problem-solution__dot.is-active {
  height: 28px;
  background: var(--gradient-accent);
  box-shadow: 0 0 12px rgba(var(--color-accent-rgb), 0.45);
}

@media (max-width: 900px) {
  .problem-solution__rail {
    display: none;
  }
}

@media (max-width: 768px) {
  .problem-solution__scroller {
    height: auto;
    padding: 10px;
  }

  .problem-solution__scroller-content {
    padding: 24px 18px 30px;
  }

  .problem-solution__progress {
    display: none;
  }
}
</style>
