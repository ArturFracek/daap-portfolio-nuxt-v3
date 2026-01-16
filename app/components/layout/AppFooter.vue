<template>
  <footer class="app-footer">
    <div class="container app-footer__inner">
      <div class="app-footer__brand">
        <Logo />
        <p>
          {{ t('hero.subheadline') }}
        </p>
      </div>
      <div class="app-footer__links">
        <a v-for="link in links" :key="link.href" :href="link.href">
          {{ link.label }}
        </a>
      </div>
      <div class="app-footer__meta">
        <p>DAAP © {{ year }}</p>
        <div class="app-footer__controls">
          <LanguageSwitch />
          <ThemeToggle />
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { t } = useI18n()
const year = new Date().getFullYear()

const links = computed(() => [
  { href: '#hero', label: t('hero.headline') },
  { href: '#solutions', label: t('solutions.title') },
  { href: '#why-us', label: t('whyUs.title') },
  { href: '#process', label: t('process.title.prefix') },
  { href: '#contact', label: t('contact.title') }
])
</script>

<style scoped lang="scss">
.app-footer {
  padding: 3rem 0;
  border-top: 1px solid rgba(var(--color-border-rgb), 0.6);
  background: rgba(var(--color-surface-rgb), 0.5);
}

.app-footer__inner {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.app-footer__brand p {
  margin-top: 0.75rem;
  color: var(--color-text-secondary);
}

.app-footer__links {
  display: grid;
  gap: 0.5rem;

  a {
    color: var(--color-text-secondary);
    font-weight: 500;

    &:hover {
      color: var(--color-text);
    }
  }
}

.app-footer__meta {
  display: grid;
  gap: 1rem;
  color: var(--color-text-secondary);
}

.app-footer__controls {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
</style>
