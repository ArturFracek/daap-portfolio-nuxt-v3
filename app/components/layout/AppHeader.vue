<template>
  <header class="app-header">
    <div class="container app-header__inner">
      <div class="app-header__brand">
        <Logo />
      </div>
      <nav class="app-header__nav" aria-label="Primary">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="app-header__link"
        >
          {{ link.label }}
        </a>
      </nav>
      <div class="app-header__actions">
        <LanguageSwitch />
        <ThemeToggle />
        <Button variant="primary" size="sm" to="#contact">
          {{ t("contact.title") }}
        </Button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const { t } = useI18n();

const links = computed(() => [
  { href: "#hero", label: t("hero.featureBadge1") },
  { href: "#solutions", label: t("solutions.title") },
  { href: "#why-us", label: t("whyUs.title") },
  { href: "#process", label: t("process.title.prefix") },
  { href: "#contact", label: t("contact.title") },
]);
</script>

<style scoped lang="scss">
.app-header {
  position: sticky;
  top: 0;
  z-index: 20;
  backdrop-filter: blur(18px) saturate(140%);
  background: linear-gradient(
    120deg,
    rgba(var(--color-surface-rgb), 0.95) 0%,
    rgba(var(--color-surface-rgb), 0.82) 100%
  );
  border-bottom: 1px solid rgba(var(--color-border-rgb), 0.55);
  box-shadow: 0 1.6vh 3.8vh rgba(15, 23, 42, 0.08);
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
        70% 120% at 0% 0%,
        rgba(var(--color-primary-rgb), 0.18),
        transparent 65%
      ),
      radial-gradient(
        60% 140% at 100% 0%,
        rgba(var(--color-accent-rgb), 0.14),
        transparent 70%
      );
    pointer-events: none;
    opacity: 0.9;
  }
}

.app-header__inner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 9vh;
  padding: 12px 0;
  gap: 2.4vw;
}

.app-header__brand {
  display: flex;
  align-items: center;
  gap: 1vw;
  flex: 0 0 auto;
  width: clamp(140px, 14vw, 200px);
}

.app-header__nav {
  display: flex;
  align-items: center;
  gap: 2.2vw;
  padding: 6px 12px;
  border-radius: 0;
  background: rgba(var(--color-surface-rgb), 0.6);
  border: 2px solid rgba(var(--color-border-rgb), 0.55);
  box-shadow: inset 0 0 1.6vh rgba(255, 255, 255, 0.25);
  font-size: clamp(12px, 0.9vw, 15px);
  letter-spacing: 0.02em;
  clip-path: polygon(
    var(--cut-size-sm) 0,
    100% 0,
    100% calc(100% - var(--cut-size-sm)),
    calc(100% - var(--cut-size-sm)) 100%,
    0 100%,
    0 var(--cut-size-sm)
  );

  @media (max-width: 1200px) {
    gap: 1.8vw;
  }
}

.app-header__link {
  position: relative;
  color: var(--color-text-secondary);
  font-weight: 700;
  text-transform: uppercase;
  transition: color 200ms ease;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -0.7vh;
    width: 100%;
    height: 0.2vh;
    border-radius: 0;
    background: linear-gradient(
      90deg,
      var(--color-accent) 0%,
      rgba(var(--color-primary-rgb), 0.9) 100%
    );
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 200ms ease;
  }

  &:hover {
    color: var(--color-text);
  }

  &:hover::after {
    transform: scaleX(1);
  }
}

.app-header__actions {
  display: flex;
  align-items: center;
  gap: 1.2vw;
  padding: 6px;
  border-radius: 0;
  background: rgba(var(--color-surface-rgb), 0.55);
  border: 2px solid rgba(var(--color-border-rgb), 0.55);
  box-shadow: inset 0 0 1.6vh rgba(255, 255, 255, 0.2);
  clip-path: polygon(
    var(--cut-size-sm) 0,
    100% 0,
    100% calc(100% - var(--cut-size-sm)),
    calc(100% - var(--cut-size-sm)) 100%,
    0 100%,
    0 var(--cut-size-sm)
  );

  :deep(.language-switch),
  :deep(.theme-toggle) {
    background: transparent;
    border-color: rgba(var(--color-border-rgb), 0.4);
  }

  :deep(.button--primary) {
    box-shadow: 0 1.6vh 3.4vh rgba(var(--color-primary-rgb), 0.32);
  }
}

@media (max-width: 960px) {
  .app-header__nav {
    display: none;
  }
}

@media (max-width: 768px) {
  .app-header__inner {
    min-height: 7vh;
    padding: 10px 0;
    gap: 16px;
  }
}

@media (max-width: 640px) {
  .app-header__actions {
    gap: 2vw;
    padding: 4px;
  }

  .app-header__actions :deep(.button--primary) {
    display: none;
  }
}
</style>
