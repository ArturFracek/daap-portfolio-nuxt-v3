<template>
  <section id="why-us" class="section why-us" ref="sectionRef">
    <div class="container">
      <SectionHeading
        :title="t('whyUs.title')"
        :subtitle="t('whyUs.subtitle')"
        align="left"
      />
      <div class="why-us__stage">
        <div
          class="why-us__scroller"
          ref="scrollerRef"
          :style="{
            '--scroll-progress': scrollProgress,
            '--active-index': activeIndex,
          }"
        >
          <div class="why-us__scroller-content" ref="scrollerContentRef">
            <Card
              v-for="(card, index) in cards"
              :key="index"
              :class="['why-us__card', { 'is-active': index === activeIndex }]"
              :style="{ '--card-index': index, zIndex: index + 1 }"
              variant="outline"
              data-reveal
            >
              <div class="why-us__card-head">
                <span class="why-us__card-index">{{ index + 1 }}</span>
                <h3 class="why-us__card-title">{{ rt(card.title) }}</h3>
              </div>
              <p class="why-us__card-description">{{ rt(card.description) }}</p>
              <ul class="why-us__card-list">
                <li
                  v-for="(item, itemIndex) in card.highlights"
                  :key="itemIndex"
                >
                  <span class="why-us__card-dot" aria-hidden="true"></span>
                  <span>{{ rt(item) }}</span>
                </li>
              </ul>
            </Card>
            <div class="why-us__scroller-spacer" aria-hidden="true"></div>
          </div>
          <div class="why-us__scroller-progress" aria-hidden="true">
            <span
              v-for="(_, index) in cards"
              :key="`progress-${index}`"
              :class="[
                'why-us__progress-dot',
                { 'is-active': index === activeIndex },
              ]"
            ></span>
          </div>
        </div>
      </div>
      <div class="why-us__cta">
        <Button
          v-if="cta?.primary"
          variant="primary"
          :to="cta?.primary?.href ? rt(cta.primary.href) : '#contact'"
        >
          {{ rt(cta.primary.text) }}
        </Button>
        <Button
          v-if="cta?.secondary"
          variant="secondary"
          :to="cta?.secondary?.href ? rt(cta.secondary.href) : '#realizacje'"
        >
          {{ rt(cta.secondary.text) }}
        </Button>
        <span class="why-us__testimonial">{{ testimonial }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Lenis from "lenis";

const { t, tm, rt } = useI18n();

type WhyCard = {
  title: string;
  description: string;
  highlights: string[];
};

const cards = computed<WhyCard[]>(() => {
  const values = [
    tm("whyUs.value1"),
    tm("whyUs.value2"),
    tm("whyUs.value3"),
    tm("whyUs.value4"),
    tm("whyUs.value5"),
    tm("whyUs.value6"),
  ] as Array<WhyCard>;
  return values;
});

const cta = computed(
  () =>
    tm("whyUs.value6.cta") as {
      primary?: { text: string; href?: string };
      secondary?: { text: string; href?: string };
    }
);
const testimonial = computed(() => t("whyUs.value6.testimonial"));

const sectionRef = ref<HTMLElement | null>(null);
const scrollerRef = ref<HTMLElement | null>(null);
const scrollerContentRef = ref<HTMLElement | null>(null);
const activeIndex = ref(0);
const scrollProgress = ref(0);
let lenis: Lenis | null = null;
let rafId: number | null = null;
let isLocked = false;
let lastTouchY = 0;

const updateActiveIndex = (scroll: number, limit: number) => {
  if (!cards.value.length) return;
  const step = limit / Math.max(cards.value.length - 1, 1);
  const nextIndex = step > 0 ? Math.round(scroll / step) : 0;
  activeIndex.value = Math.min(cards.value.length - 1, Math.max(0, nextIndex));
  scrollProgress.value =
    limit > 0 ? Math.min(1, Math.max(0, scroll / limit)) : 0;
};

const isSectionCentered = () => {
  if (!sectionRef.value) return false;
  const rect = sectionRef.value.getBoundingClientRect();
  const mid = window.innerHeight * 0.5;
  return rect.top < mid && rect.bottom > mid;
};

const lockScroll = () => {
  if (isLocked) return;
  document.body.style.overflow = "hidden";
  document.body.style.touchAction = "none";
  isLocked = true;
};

const unlockScroll = () => {
  if (!isLocked) return;
  document.body.style.overflow = "";
  document.body.style.touchAction = "";
  isLocked = false;
};

const scrollLenisBy = (delta: number) => {
  if (!lenis) return;
  const next = lenis.scroll + delta;
  lenis.scrollTo(next, { immediate: false });
};

const handleWheel = (event: WheelEvent) => {
  if (!lenis) return;
  if (!isSectionCentered()) {
    if (isLocked) unlockScroll();
    return;
  }

  const delta = event.deltaY;
  const atStart = lenis.scroll <= 1;
  const atEnd = lenis.scroll >= lenis.limit - 1;

  if ((delta < 0 && atStart) || (delta > 0 && atEnd)) {
    unlockScroll();
    return;
  }

  lockScroll();
  event.preventDefault();
  scrollLenisBy(delta);
};

const handleTouchStart = (event: TouchEvent) => {
  lastTouchY = event.touches[0]?.clientY ?? 0;
};

const handleTouchMove = (event: TouchEvent) => {
  if (!lenis) return;
  if (!isSectionCentered()) {
    if (isLocked) unlockScroll();
    return;
  }

  const currentY = event.touches[0]?.clientY ?? 0;
  const delta = lastTouchY - currentY;
  const atStart = lenis.scroll <= 1;
  const atEnd = lenis.scroll >= lenis.limit - 1;

  if ((delta < 0 && atStart) || (delta > 0 && atEnd)) {
    unlockScroll();
    return;
  }

  lockScroll();
  event.preventDefault();
  scrollLenisBy(delta);
  lastTouchY = currentY;
};

onMounted(() => {
  if (!scrollerRef.value || !scrollerContentRef.value) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  lenis = new Lenis({
    wrapper: scrollerRef.value,
    content: scrollerContentRef.value,
    smoothWheel: true,
    syncTouch: false,
    lerp: 0.14,
    wheelMultiplier: 1,
    touchMultiplier: 1,
  });

  const raf = (time: number) => {
    lenis?.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);

  lenis.on("scroll", ({ scroll, limit }: { scroll: number; limit: number }) =>
    updateActiveIndex(scroll, limit)
  );

  window.addEventListener("wheel", handleWheel, { passive: false });
  window.addEventListener("touchstart", handleTouchStart, { passive: true });
  window.addEventListener("touchmove", handleTouchMove, { passive: false });
});

onBeforeUnmount(() => {
  window.removeEventListener("wheel", handleWheel);
  window.removeEventListener("touchstart", handleTouchStart);
  window.removeEventListener("touchmove", handleTouchMove);
  unlockScroll();
  if (rafId !== null) cancelAnimationFrame(rafId);
  lenis?.destroy();
  lenis = null;
});
</script>

<style scoped lang="scss">
.why-us {
  background: radial-gradient(
      60% 80% at 8% 0%,
      rgba(var(--color-accent-rgb), 0.12) 0%,
      rgba(var(--color-accent-rgb), 0) 70%
    ),
    radial-gradient(
      50% 70% at 92% 8%,
      rgba(var(--color-primary-rgb), 0.14) 0%,
      rgba(var(--color-primary-rgb), 0) 68%
    );
}
.why-us__stage {
  position: relative;
}
.why-us__scroller {
  margin-top: 28px;
  position: relative;
  height: clamp(460px, 75vh, 780px);
  padding: 12px;
  overflow: hidden;
  background: linear-gradient(
      140deg,
      rgba(var(--color-primary-rgb), 0.22),
      rgba(var(--color-secondary-rgb), 0.08),
      rgba(var(--color-accent-rgb), 0.2)
    ),
    repeating-linear-gradient(
      90deg,
      rgba(var(--color-border-rgb), 0.12) 0 1px,
      transparent 1px 14px
    );
  box-shadow: 0 26px 70px rgba(15, 23, 42, 0.2);
  clip-path: polygon(
    var(--cut-size) 0,
    100% 0,
    100% calc(100% - var(--cut-size)),
    calc(100% - var(--cut-size)) 100%,
    0 100%,
    0 var(--cut-size)
  );
}
.why-us__scroller::before {
  content: "";
  position: absolute;
  inset: 12px;
  background: linear-gradient(
    180deg,
    rgba(var(--color-surface-rgb), 0.96),
    rgba(var(--color-surface-rgb), 0.78)
  );
  border: 1px solid rgba(var(--color-border-rgb), 0.7);
  backdrop-filter: blur(14px);
  clip-path: polygon(
    var(--cut-size) 0,
    100% 0,
    100% calc(100% - var(--cut-size)),
    calc(100% - var(--cut-size)) 100%,
    0 100%,
    0 var(--cut-size)
  );
}
.why-us__scroller::after {
  content: "";
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
  height: 3px;
  background: linear-gradient(
    90deg,
    rgba(var(--color-primary-rgb), 0.2),
    rgba(var(--color-accent-rgb), 0.9),
    rgba(var(--color-secondary-rgb), 0.3)
  );
  transform: translateX(calc(var(--scroll-progress, 0) * 40px));
  transition: transform 0.2s ease;
}
.why-us__scroller-content {
  position: relative;
  z-index: 1;
  min-height: 100%;
  display: grid;
  gap: 18px;
  padding: 26px 30px 38px 26px;
}
.why-us__scroller-spacer {
  height: clamp(180px, 40vh, 380px);
}
.why-us__scroller-progress {
  position: absolute;
  top: 20px;
  right: 16px;
  display: grid;
  gap: 8px;
  z-index: 2;
}
.why-us__progress-dot {
  width: 8px;
  height: 18px;
  background: rgba(var(--color-border-rgb), 0.8);
  clip-path: polygon(0 0, 100% 0, 100% 80%, 70% 100%, 0 100%);
  transition: all 0.25s ease;
}
.why-us__progress-dot.is-active {
  height: 28px;
  background: var(--gradient-accent);
  box-shadow: 0 0 12px rgba(var(--color-accent-rgb), 0.45);
}
.why-us__card {
  position: sticky;
  top: 22px;
  padding: 26px 28px 28px;
  border: 1px solid rgba(var(--color-border-rgb), 0.75);
  background: linear-gradient(
      140deg,
      rgba(var(--color-surface-rgb), 1),
      rgba(var(--color-surface-rgb), 0.96),
      rgba(var(--color-surface-rgb), 0.9)
    ),
    repeating-linear-gradient(
      135deg,
      rgba(var(--color-border-rgb), 0.16) 0 1px,
      transparent 1px 12px
    );
  box-shadow: 0 18px 44px rgba(15, 23, 42, 0.16);
  clip-path: polygon(
    var(--cut-size) 0,
    100% 0,
    100% calc(100% - var(--cut-size)),
    calc(100% - var(--cut-size)) 100%,
    0 100%,
    0 var(--cut-size)
  );
  opacity: 0.86;
  transform: translateY(10px)
    translateX(calc((var(--card-index) - var(--active-index)) * 6px));
  filter: saturate(0.82);
  transition: transform 0.35s ease, opacity 0.35s ease, box-shadow 0.35s ease,
    filter 0.35s ease;
}
.why-us__card::before {
  content: "";
  position: absolute;
  inset: 0;
  padding: 1px;
  background: linear-gradient(
    140deg,
    rgba(var(--color-primary-rgb), 0.6),
    rgba(var(--color-secondary-rgb), 0.32),
    rgba(var(--color-accent-rgb), 0.48)
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
.why-us__card::after {
  content: "";
  position: absolute;
  top: 10px;
  right: 14px;
  width: 46px;
  height: 6px;
  background: var(--gradient-accent);
  opacity: 0.7;
  clip-path: polygon(0 0, 100% 0, 88% 100%, 0 100%);
}
.why-us__card.is-active {
  opacity: 1;
  transform: translateY(0) translateX(0);
  border-color: rgba(var(--color-primary-rgb), 0.6);
  box-shadow: 0 26px 62px rgba(15, 23, 42, 0.2);
  filter: saturate(1);
}
.why-us__card:last-child {
  z-index: 999;
}
.why-us__card-head {
  display: flex;
  align-items: center;
  gap: 1.4vw;
}
.why-us__card-index {
  width: 44px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: "Unbounded", sans-serif;
  font-size: clamp(14px, 1.3vw, 18px);
  color: var(--color-text);
  background: linear-gradient(
    135deg,
    rgba(var(--color-primary-rgb), 0.22),
    rgba(var(--color-accent-rgb), 0.12)
  );
  border: 1px solid rgba(var(--color-border-rgb), 0.9);
  box-shadow: inset 0 0 0 1px rgba(var(--color-primary-rgb), 0.12);
  clip-path: polygon(
    var(--cut-size-sm) 0,
    100% 0,
    100% calc(100% - var(--cut-size-sm)),
    calc(100% - var(--cut-size-sm)) 100%,
    0 100%,
    0 var(--cut-size-sm)
  );
}
.why-us__card-title {
  font-size: clamp(18px, 1.8vw, 24px);
  letter-spacing: 0.3px;
}
.why-us__card-description {
  margin-top: 14px;
  font-size: clamp(14px, 1.2vw, 17px);
  color: var(--color-text-secondary);
}
.why-us__card-list {
  margin-top: 18px;
  display: grid;
  gap: 12px;
  color: var(--color-text);
  padding-left: 0;
  list-style: none;
}
.why-us__card-list li {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: start;
  gap: 12px;
}
.why-us__card-dot {
  width: 9px;
  height: 9px;
  margin-top: 6px;
  background: var(--gradient-accent);
  box-shadow: 0 0 0 6px rgba(var(--color-accent-rgb), 0.12);
  clip-path: polygon(0 0, 100% 0, 100% 70%, 70% 100%, 0 100%);
}
.why-us__cta {
  margin-top: 28px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.4vw;
}
.why-us__testimonial {
  display: inline-flex;
  align-items: center;
  gap: 0.6vw;
  padding: 10px 16px;
  background: rgba(var(--color-primary-rgb), 0.08);
  border: 1px solid rgba(var(--color-border-rgb), 0.7);
  color: var(--color-text-secondary);
  font-weight: 600;
  font-size: clamp(13px, 1vw, 15px);
  text-transform: uppercase;
  clip-path: polygon(
    var(--cut-size-sm) 0,
    100% 0,
    100% calc(100% - var(--cut-size-sm)),
    calc(100% - var(--cut-size-sm)) 100%,
    0 100%,
    0 var(--cut-size-sm)
  );
}
@media (max-width: 768px) {
  .why-us__scroller {
    height: auto;
    padding: 8px;
  }

  .why-us__card {
    position: relative;
    top: 0;
    padding: 22px 20px 24px;
    opacity: 1;
    transform: none;
  }

  .why-us__card-head {
    gap: 12px;
  }

  .why-us__scroller-progress {
    display: none;
  }

  .why-us__cta {
    gap: 12px;
  }
}
</style>
