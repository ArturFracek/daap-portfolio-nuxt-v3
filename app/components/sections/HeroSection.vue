<template>
  <section id="hero" class="section hero">
    <GradientBlob class="hero__blob" :size="420" top="-120px" right="-80px" />
    <div class="container hero__inner">
      <div class="hero__content" data-reveal>
        <Badge variant="secondary">{{ t('hero.featureBadge1') }}</Badge>
        <h1 class="hero__title">{{ t('hero.headline') }}</h1>
        <p class="hero__subtitle">{{ t('hero.subheadline') }}</p>
        <div class="hero__actions">
          <Button variant="primary" size="lg" to="#contact">
            {{ t('contact.title') }}
          </Button>
          <Button variant="secondary" size="lg" to="#solutions">
            {{ t('solutions.title') }}
          </Button>
        </div>
        <div class="hero__badges">
          <Badge variant="ghost">{{ t('hero.featureBadge1') }}</Badge>
          <Badge variant="ghost">{{ t('hero.featureBadge2') }}</Badge>
          <Badge variant="ghost">{{ t('hero.featureBadge3') }}</Badge>
        </div>
      </div>
      <div class="hero__visual" data-reveal>
        <div class="hero__orbital" aria-hidden="true">
          <span class="hero__orbital-dot hero__orbital-dot--a" />
          <span class="hero__orbital-dot hero__orbital-dot--b" />
          <span class="hero__orbital-dot hero__orbital-dot--c" />
        </div>
        <div class="hero__card">
          <div class="hero__card-header">
            <p class="hero__card-title">DAAP</p>
            <span class="hero__card-pulse" aria-hidden="true" />
          </div>
          <p class="hero__card-subtitle">{{ t('solutions.integration.description') }}</p>
          <ConnectionLines />
          <div class="hero__card-tags">
            <span class="hero__tag">{{ t('hero.featureBadge1') }}</span>
            <span class="hero__tag">{{ t('hero.featureBadge2') }}</span>
            <span class="hero__tag">{{ t('hero.featureBadge3') }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>

<style scoped lang="scss">
.hero {
  position: relative;
  overflow: hidden;
  min-height: 70vh;
}

.hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 8% 10%, rgba(var(--color-primary-rgb), 0.16), transparent 40%),
    radial-gradient(circle at 90% 20%, rgba(var(--color-secondary-rgb), 0.18), transparent 45%),
    linear-gradient(120deg, rgba(var(--color-text-secondary-rgb), 0.08) 0%, transparent 60%);
  opacity: 0.9;
  pointer-events: none;
}

.hero::after {
  content: "";
  position: absolute;
  width: 120vw;
  height: 60vh;
  left: -10vw;
  top: -10vh;
  background: linear-gradient(140deg, rgba(var(--color-accent-rgb), 0.15), transparent 60%);
  filter: blur(30px);
  opacity: 0.8;
  pointer-events: none;
}

.hero__inner {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  align-items: center;
  gap: 5vw;
  position: relative;
  z-index: 1;
}

.hero__content {
  display: grid;
  gap: 2.2vw;
  z-index: 1;
  max-width: 48vw;
}

.hero__title {
  font-size: clamp(2.8rem, 4.6vw, 5rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.05;
  background: linear-gradient(120deg, var(--color-text) 0%, var(--color-primary) 45%, var(--color-accent) 70%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero__subtitle {
  font-size: clamp(1rem, 1.4vw, 1.35rem);
  max-width: 36vw;
  color: var(--color-text-secondary);
}

.hero__actions {
  display: flex;
  gap: 1.4vw;
  flex-wrap: wrap;
}

.hero__badges {
  display: flex;
  gap: 1vw;
  flex-wrap: wrap;
}

.hero__visual {
  display: flex;
  justify-content: center;
  position: relative;
  min-height: 48vh;
}

.hero__card {
  position: relative;
  width: 40vw;
  min-width: 280px;
  padding: 36px;
  border-radius: 28px;
  background: linear-gradient(
    160deg,
    rgba(var(--color-surface-rgb), 0.92),
    rgba(var(--color-surface-rgb), 0.65)
  );
  border: 1px solid rgba(var(--color-border-rgb), 0.45);
  box-shadow:
    0 30px 60px rgba(var(--color-primary-rgb), 0.16),
    inset 0 0 40px rgba(var(--color-accent-rgb), 0.08);
  backdrop-filter: blur(18px);
}

.hero__card-title {
  font-size: clamp(1.2rem, 1.6vw, 1.7rem);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero__card-subtitle {
  margin-top: 12px;
  margin-bottom: 24px;
  font-size: clamp(0.95rem, 1.1vw, 1.1rem);
  color: var(--color-text-secondary);
}

.hero__card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1vw;
}

.hero__card-pulse {
  width: 1vw;
  height: 1vw;
  min-width: 8px;
  min-height: 8px;
  border-radius: 999px;
  background: var(--gradient-primary);
  box-shadow: 0 0 18px rgba(var(--color-primary-rgb), 0.4);
  animation: heroPulse 2.8s ease-in-out infinite;
}

.hero__card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8vw;
  margin-top: 2vw;
}

.hero__tag {
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  background: rgba(var(--color-primary-rgb), 0.12);
  color: var(--color-text);
  border: 1px solid rgba(var(--color-primary-rgb), 0.18);
}

.hero__orbital {
  position: absolute;
  width: 26vw;
  height: 26vw;
  right: -2vw;
  top: -4vh;
  border-radius: 50%;
  border: 1px dashed rgba(var(--color-border-rgb), 0.6);
  opacity: 0.6;
  animation: heroOrbit 18s linear infinite;
}

.hero__orbital-dot {
  position: absolute;
  width: 0.8vw;
  height: 0.8vw;
  min-width: 6px;
  min-height: 6px;
  border-radius: 50%;
  background: var(--gradient-accent);
  box-shadow: 0 0 12px rgba(var(--color-accent-rgb), 0.4);
}

.hero__orbital-dot--a {
  top: 8%;
  left: 18%;
}

.hero__orbital-dot--b {
  right: 12%;
  top: 40%;
}

.hero__orbital-dot--c {
  bottom: 12%;
  left: 45%;
}

@keyframes heroPulse {
  0%,
  100% {
    transform: scale(0.9);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
}

@keyframes heroOrbit {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 1024px) {
  .hero__content {
    max-width: 100%;
  }

  .hero__subtitle {
    max-width: 100%;
  }

  .hero__card {
    width: 80vw;
  }

  .hero__orbital {
    width: 40vw;
    height: 40vw;
    right: 4vw;
  }
}

@media (max-width: 768px) {
  .hero__actions {
    gap: 3vw;
  }

  .hero__badges {
    gap: 2.6vw;
  }

  .hero__card-tags {
    gap: 2.4vw;
  }

  .hero__card {
    width: 92vw;
    padding: 28px;
  }

  .hero__orbital {
    width: 52vw;
    height: 52vw;
    top: -2vh;
  }
}
</style>
