<template>
  <Card variant="glass" class="contact-form">
    <h3>{{ t('contact.form.cardTitle') }}</h3>
    <form @submit.prevent="handleSubmit">
      <label>
        <span>{{ t('contact.form.name') }}</span>
        <input v-model="form.name" :placeholder="t('contact.form.namePlaceholder')" required />
      </label>
      <label>
        <span>{{ t('contact.form.email') }}</span>
        <input
          v-model="form.email"
          type="email"
          :placeholder="t('contact.form.emailPlaceholder')"
          required
        />
      </label>
      <label>
        <span>{{ t('contact.form.message') }}</span>
        <textarea
          v-model="form.message"
          rows="4"
          :placeholder="t('contact.form.messagePlaceholder')"
          required
        />
      </label>
      <Button variant="primary" size="lg" type="submit">
        {{ t('contact.form.submit') }}
      </Button>
    </form>
  </Card>
</template>

<script setup lang="ts">
const { t } = useI18n()

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const handleSubmit = () => {
  if (!import.meta.client) return
  const subject = encodeURIComponent(`DAAP: ${form.name}`)
  const body = encodeURIComponent(`${form.message}\n\nEmail: ${form.email}`)
  window.location.href = `mailto:kontakt@daap.pro?subject=${subject}&body=${body}`
}
</script>

<style scoped lang="scss">
.contact-form {
  display: grid;
  gap: 1rem;
}

form {
  display: grid;
  gap: 1rem;
}

label {
  display: grid;
  gap: 0.35rem;

  span {
    font-size: 0.8rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-text-secondary);
  }
}

input,
textarea {
  border: 1px solid rgba(var(--color-border-rgb), 0.6);
  background: rgba(var(--color-surface-rgb), 0.7);
  border-radius: 0;
  padding: 0.75rem 1rem;
  color: var(--color-text);
}
</style>
