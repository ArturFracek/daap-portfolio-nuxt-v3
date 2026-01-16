<template>
  <section id="contact" class="section contact">
    <div class="container contact__inner">
      <SectionHeading
        :title="t('contact.title')"
        :subtitle="t('contact.subtitle')"
        align="left"
      />
      <div class="contact__grid">
        <ContactInfo data-reveal />
        <ContactForm data-reveal />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>

<style scoped lang="scss">
.contact {
  background: rgba(var(--color-surface-rgb), 0.5);
}

.contact__inner {
  display: grid;
  gap: 2rem;
}

.contact__grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}
</style>
