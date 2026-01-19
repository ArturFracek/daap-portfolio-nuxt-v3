<template>
  <Card variant="outline" class="contact-info">
    <h3>{{ t('contact.info.title') }}</h3>
    <div class="contact-info__item">
      <span>{{ t('contact.info.email') }}</span>
      <div class="contact-info__row">
        <a :href="`mailto:${contactData.email}`">{{ contactData.email }}</a>
        <button
          v-if="isClipboardSupported"
          type="button"
          @click="copyEmail"
        >
          {{ copyFeedback.email ? t('contact.form.copied') : t('contact.form.copy') }}
        </button>
      </div>
    </div>
    <div class="contact-info__item">
      <span>{{ t('contact.info.phone') }}</span>
      <div class="contact-info__row">
        <a :href="`tel:${contactData.phoneRaw}`">{{ contactData.phone }}</a>
        <button
          v-if="isClipboardSupported"
          type="button"
          @click="copyPhone"
        >
          {{ copyFeedback.phone ? t('contact.form.copied') : t('contact.form.copy') }}
        </button>
      </div>
    </div>
    <div class="contact-info__item">
      <span>{{ t('contact.info.address') }}</span>
      <p>{{ t('contact.info.addressValue') }}</p>
    </div>
    <div class="contact-info__item">
      <span>{{ t('contact.info.responseTime') }}</span>
      <p>{{ t('contact.info.responseValue') }}</p>
    </div>
  </Card>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { contactData, copyEmail, copyPhone, copyFeedback, isClipboardSupported } =
  useContactInfoActions()
</script>

<style scoped lang="scss">
.contact-info {
  display: grid;
  gap: 1rem;
}

.contact-info__item {
  display: grid;
  gap: 0.35rem;
  color: var(--color-text-secondary);

  span {
    font-size: 0.8rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  a {
    color: var(--color-text);
    font-weight: 600;
  }
}

.contact-info__row {
  display: flex;
  gap: 0.75rem;
  align-items: center;

  button {
    border: 1px solid rgba(var(--color-border-rgb), 0.7);
    background: transparent;
    border-radius: 0;
    padding: 0.2rem 0.6rem;
    font-size: 0.75rem;
    cursor: pointer;
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
}
</style>
