<script setup lang="ts">
const { t } = useI18n()
const { contactData, copyEmail, copyPhone, copyFeedback, isClipboardSupported } =
  useContactInfoActions()

const formData = reactive({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)
const error = ref<string | null>(null)

const handleCopyEmail = async () => {
  await copyEmail()
}

const handleCopyPhone = async () => {
  await copyPhone()
}

const handleSubmit = () => {
  if (!import.meta.client || isSubmitting.value) return
  isSubmitting.value = true
  error.value = null

  const subject = encodeURIComponent(`DAAP: ${formData.name || 'Kontakt'}`)
  const body = encodeURIComponent(
    `${formData.message}\n\nEmail: ${formData.email}`
  )

  window.location.href = `mailto:${contactData.email}?subject=${subject}&body=${body}`
  isSubmitted.value = true
  window.setTimeout(() => {
    isSubmitted.value = false
  }, 2400)
  window.setTimeout(() => {
    isSubmitting.value = false
  }, 350)
}
</script>

<template>
  <section id="contact" class="contact-section">
    <div class="contact-section__container">
      <header class="contact-section__header">
        <h2 class="contact-section__title">{{ t('contact.title') }}</h2>
        <p class="contact-section__subtitle">
          {{ t('contact.subtitle') }}
        </p>
      </header>

      <div class="contact-section__content">
        <div class="contact-section__contact-card">
          <div class="contact-card__header">
            <h3 class="contact-card__title">
              {{ t('contact.info.title') }}
            </h3>
            <div class="contact-card__accent-line" />
          </div>

          <div class="contact-section__info-items">
            <div class="contact-item">
              <div class="contact-item__icon-wrapper">
                <div class="contact-item__icon">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    class="contact-item__icon-svg"
                  >
                    <path
                      d="M4 6.5h16v11H4z"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.6"
                    />
                    <path
                      d="m4 7 8 6 8-6"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.6"
                    />
                  </svg>
                </div>
              </div>
              <div class="contact-item__content">
                <span class="contact-item__label">{{ t('contact.info.email') }}</span>
                <div class="contact-item__value-row">
                  <a
                    :href="`mailto:${contactData.email}`"
                    class="contact-item__value"
                  >
                    {{ contactData.email }}
                  </a>
                  <button
                    v-if="isClipboardSupported"
                    class="contact-item__copy-btn"
                    :class="{ 'contact-item__copy-btn--copied': copyFeedback.email }"
                    :aria-label="t('contact.info.copyEmail')"
                    type="button"
                    @click="handleCopyEmail"
                  >
                    <svg
                      v-if="!copyFeedback.email"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      class="contact-item__copy-icon"
                    >
                      <rect
                        x="7"
                        y="7"
                        width="11"
                        height="11"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.6"
                      />
                      <rect
                        x="4"
                        y="4"
                        width="11"
                        height="11"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.6"
                        opacity="0.65"
                      />
                    </svg>
                    <svg
                      v-else
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      class="contact-item__copy-icon"
                    >
                      <path
                        d="M5 12.5 10 17l9-10"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-item__icon-wrapper">
                <div class="contact-item__icon">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    class="contact-item__icon-svg"
                  >
                    <path
                      d="M6 4h4l1.2 4.2-2.1 1.6a10.6 10.6 0 0 0 4.9 4.9l1.6-2.1L20 14v4c0 .6-.4 1-1 1A16 16 0 0 1 4 5c0-.6.4-1 1-1z"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div class="contact-item__content">
                <span class="contact-item__label">{{ t('contact.info.phone') }}</span>
                <div class="contact-item__value-row">
                  <a
                    :href="`tel:${contactData.phoneRaw}`"
                    class="contact-item__value"
                  >
                    {{ contactData.phone }}
                  </a>
                  <button
                    v-if="isClipboardSupported"
                    class="contact-item__copy-btn"
                    :class="{ 'contact-item__copy-btn--copied': copyFeedback.phone }"
                    :aria-label="t('contact.info.copyPhone')"
                    type="button"
                    @click="handleCopyPhone"
                  >
                    <svg
                      v-if="!copyFeedback.phone"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      class="contact-item__copy-icon"
                    >
                      <rect
                        x="7"
                        y="7"
                        width="11"
                        height="11"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.6"
                      />
                      <rect
                        x="4"
                        y="4"
                        width="11"
                        height="11"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.6"
                        opacity="0.65"
                      />
                    </svg>
                    <svg
                      v-else
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      class="contact-item__copy-icon"
                    >
                      <path
                        d="M5 12.5 10 17l9-10"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-item__icon-wrapper">
                <div class="contact-item__icon">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    class="contact-item__icon-svg"
                  >
                    <path
                      d="M12 21s6-5.4 6-10a6 6 0 1 0-12 0c0 4.6 6 10 6 10Z"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.6"
                    />
                    <circle
                      cx="12"
                      cy="11"
                      r="2.4"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.6"
                    />
                  </svg>
                </div>
              </div>
              <div class="contact-item__content">
                <span class="contact-item__label">{{ t('contact.info.address') }}</span>
                <span class="contact-item__value contact-item__value--static">
                  {{ t('contact.info.addressValue') }}
                </span>
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-item__icon-wrapper">
                <div class="contact-item__icon">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    class="contact-item__icon-svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="8"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.6"
                    />
                    <path
                      d="M12 7v5l3 2"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div class="contact-item__content">
                <span class="contact-item__label">
                  {{ t('contact.info.responseTime') }}
                </span>
                <span class="contact-item__value contact-item__value--static">
                  {{ t('contact.info.responseValue') }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="contact-section__form-card">
          <div class="form-card__header">
            <h3 class="form-card__title">
              {{ t('contact.form.cardTitle') }}
            </h3>
            <div class="form-card__accent-line" />
          </div>

          <form class="contact-section__form" @submit.prevent="handleSubmit">
            <div class="form-field">
              <label for="contact-name" class="form-label">
                {{ t('contact.form.name') }}
              </label>
              <input
                id="contact-name"
                v-model="formData.name"
                type="text"
                :placeholder="t('contact.form.namePlaceholder')"
                class="form-input"
                required
              />
            </div>

            <div class="form-field">
              <label for="contact-email" class="form-label">
                {{ t('contact.form.email') }}
              </label>
              <input
                id="contact-email"
                v-model="formData.email"
                type="email"
                :placeholder="t('contact.form.emailPlaceholder')"
                class="form-input"
                required
              />
            </div>

            <div class="form-field">
              <label for="contact-message" class="form-label">
                {{ t('contact.form.message') }}
              </label>
              <textarea
                id="contact-message"
                v-model="formData.message"
                :placeholder="t('contact.form.messagePlaceholder')"
                class="form-textarea"
                rows="5"
                required
              />
            </div>

            <div v-if="error" class="form-message form-message--error">
              {{ error }}
            </div>

            <div v-if="isSubmitted" class="form-message form-message--success">
              {{ t('contact.form.success') }}
            </div>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="form-submit"
            >
              <span>
                {{
                  isSubmitting
                    ? t('contact.form.submitting')
                    : t('contact.form.submit')
                }}
              </span>
              <svg
                v-if="!isSubmitting"
                viewBox="0 0 24 24"
                aria-hidden="true"
                class="form-submit__icon"
              >
                <path
                  d="M5 12h12m0 0-4-4m4 4-4 4"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "@/assets/styles/mixins" as *;
.contact-section {
  position: relative;
  padding: 0;
  overflow-x: hidden;
  width: 100%;
  max-width: 100%;
  --contact-cut: clamp(2vh, 2.2vw, 3vh);
  --contact-icon-size: clamp(3.6vh, 3vw, 5vh);
  --contact-icon-size-sm: clamp(2.8vh, 2.6vw, 4vh);
  --contact-copy-size: clamp(2.6vh, 2.2vw, 3.4vh);
  --contact-accent-height: clamp(0.4vh, 0.5vw, 0.6vh);
}

.contact-section__container {
  position: relative;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 32px;
  box-sizing: border-box;

  @include mobile {
    padding: 0 20px;
  }

  @include tablet {
    padding: 0 28px;
  }
}

.contact-section__header {
  text-align: center;
  margin-bottom: 28px;
}

.contact-section__title {
  font-family: $font-family-heading;
  font-size: clamp(1.6rem, 4.5vw, 3.2rem);
  font-weight: 900;
  line-height: 0.95;
  margin: 0 0 12px 0;
  letter-spacing: -0.04em;
  color: var(--color-text);
  text-transform: uppercase;
  position: relative;
  transform: skewX(-2deg);
  text-shadow:
    3px 3px 0 var(--color-primary),
    6px 6px 0 rgba(var(--color-secondary-rgb), 0.5);
  border-bottom: 4px solid var(--color-secondary);
  padding-bottom: 6px;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    right: -15px;
    width: 0;
    height: 0;
    border-left: 15px solid var(--color-secondary);
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
  }

  @include mobile {
    font-size: 1.4rem;
    margin: 0 0 8px 0;
    border-bottom-width: 2px;
    padding-bottom: 4px;
    text-shadow:
      2px 2px 0 var(--color-primary),
      4px 4px 0 rgba(var(--color-secondary-rgb), 0.5);

    &::after {
      bottom: -2px;
      right: -8px;
      border-left-width: 8px;
      border-top-width: 2px;
      border-bottom-width: 2px;
    }
  }
}

.contact-section__subtitle {
  font-family: $font-family-base;
  font-size: clamp(0.85rem, 1.6vw, 1rem);
  color: var(--color-text-secondary);
  margin: 12px auto 0;
  max-width: 70%;
  line-height: 1.5;
  font-weight: 400;

  @include mobile {
    display: none;
  }
}

.contact-section__content {
  display: grid;
  grid-template-columns: 1.35fr 0.65fr;
  gap: 2vh;
  align-items: stretch;
  position: relative;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  min-width: 0;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(var(--color-border) 1px, transparent 1px),
      linear-gradient(90deg, var(--color-border) 1px, transparent 1px);
    background-size: 4vh 4vh;
    opacity: 0.1;
    pointer-events: none;
    z-index: 0;
  }

  @include tablet {
    grid-template-columns: 1fr;
    gap: 2vh;
  }

  @include mobile {
    grid-template-columns: 1fr;
    gap: 1.5vh;
  }
}

.contact-section__contact-card {
  position: relative;
  background: var(--color-surface);
  border: 4px solid var(--color-secondary);
  border-radius: 0;
  padding: 24px 22px;
  box-shadow:
    8px 8px 0 rgba(var(--color-secondary-rgb), 0.3),
    16px 16px 0 rgba(var(--color-secondary-rgb), 0.1);
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 5;
  overflow: hidden;
  clip-path: polygon(
    0 0,
    calc(100% - var(--contact-cut)) 0,
    100% var(--contact-cut),
    100% 100%,
    0 100%
  );
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  min-width: 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: var(--contact-cut);
    height: var(--contact-cut);
    background: var(--color-primary);
    clip-path: polygon(0 0, 100% 0, 100% 100%);
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 10px,
      rgba(var(--color-secondary-rgb), 0.03) 10px,
      rgba(var(--color-secondary-rgb), 0.03) 20px
    );
    pointer-events: none;
    z-index: 0;
  }

  &:hover {
    transform: translate(-4px, -4px);
    box-shadow:
      12px 12px 0 rgba(var(--color-secondary-rgb), 0.4),
      24px 24px 0 rgba(var(--color-secondary-rgb), 0.15);
    border-color: var(--color-primary);
  }

  @include tablet {
    padding: 22px 18px;
    clip-path: none;
    border-width: 3px;
    box-shadow:
      4px 4px 0 rgba(var(--color-secondary-rgb), 0.3),
      8px 8px 0 rgba(var(--color-secondary-rgb), 0.1);

    &::before {
      display: none;
    }
  }

  @include mobile {
    padding: 14px 16px;
    clip-path: none;
    border-width: 2px;
    box-shadow:
      2px 2px 0 rgba(var(--color-secondary-rgb), 0.3),
      4px 4px 0 rgba(var(--color-secondary-rgb), 0.1);

    &::before {
      display: none;
    }
  }
}

.contact-section__form-card {
  position: relative;
  background: var(--color-surface);
  border: 4px solid var(--color-primary);
  border-radius: 0;
  padding: 24px 22px;
  box-shadow:
    -8px 8px 0 rgba(var(--color-primary-rgb), 0.3),
    -16px 16px 0 rgba(var(--color-primary-rgb), 0.1);
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 6;
  overflow: hidden;
  clip-path: polygon(
    var(--contact-cut) 0,
    100% 0,
    100% 100%,
    0 100%,
    0 var(--contact-cut)
  );
  margin-left: -30px;
  box-sizing: border-box;
  width: calc(100% + 2vw);
  max-width: 100%;
  min-width: 0;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: var(--contact-cut);
    height: var(--contact-cut);
    background: var(--color-secondary);
    clip-path: polygon(0 0, 0 100%, 100% 100%);
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 10px,
      rgba(var(--color-primary-rgb), 0.03) 10px,
      rgba(var(--color-primary-rgb), 0.03) 20px
    );
    pointer-events: none;
    z-index: 0;
  }

  &:hover {
    transform: translate(4px, -4px);
    box-shadow:
      -12px 12px 0 rgba(var(--color-primary-rgb), 0.4),
      -24px 24px 0 rgba(var(--color-primary-rgb), 0.15);
    border-color: var(--color-accent);
  }

  @include tablet {
    width: 100%;
    margin-left: 0;
    clip-path: none;
    padding: 22px 18px;
    border-width: 3px;
    box-shadow:
      -4px 4px 0 rgba(var(--color-primary-rgb), 0.3),
      -8px 8px 0 rgba(var(--color-primary-rgb), 0.1);

    &::before {
      display: none;
    }
  }

  @include mobile {
    width: 100%;
    margin-left: 0;
    clip-path: none;
    padding: 14px 16px;
    border-width: 2px;
    box-shadow:
      -2px 2px 0 rgba(var(--color-primary-rgb), 0.3),
      -4px 4px 0 rgba(var(--color-primary-rgb), 0.1);

    &::before {
      display: none;
    }
  }
}

.contact-section__info-items {
  display: flex;
  flex-direction: column;
  gap: 2vh;
  width: 100%;
}

.contact-section__form {
  display: flex;
  flex-direction: column;
  gap: 2vh;
  width: 100%;
}

.contact-card__header,
.form-card__header {
  margin-bottom: 16px;
}

.contact-card__title,
.form-card__title {
  font-family: $font-family-heading;
  font-size: clamp(0.9rem, 1.8vw, 1.1rem);
  font-weight: 700;
  margin-bottom: 10px;
  letter-spacing: -0.01em;
  background: linear-gradient(
    135deg,
    var(--color-text) 0%,
    var(--color-secondary) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.form-card__title {
  background: linear-gradient(
    135deg,
    var(--color-text) 0%,
    var(--color-primary) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.contact-card__accent-line,
.form-card__accent-line {
  width: 25%;
  height: var(--contact-accent-height);
  background: var(--color-secondary);
  border-radius: 0;
  margin-top: 6px;
  transform: skewX(-20deg);
  box-shadow: 3px 3px 0 var(--color-primary);
  position: relative;
}

.form-card__accent-line {
  background: var(--color-primary);
  transform: skewX(20deg);
  box-shadow: -3px 3px 0 var(--color-accent);
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 2vh;
  padding: 12px 0;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateX(4px);
  }

  @include mobile {
    gap: 1.4vh;
    padding: 8px 0;

    &:hover {
      transform: none;
    }
  }
}

.contact-item__icon {
  width: var(--contact-icon-size);
  height: var(--contact-icon-size);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-surface);
  border: 3px solid var(--color-secondary);
  border-radius: 0;
  color: var(--color-secondary);
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  box-shadow:
    3px 3px 0 rgba(var(--color-secondary-rgb), 0.4),
    inset 2px 2px 0 rgba(var(--color-secondary-rgb), 0.1);
  clip-path: polygon(
    0 0,
    calc(100% - var(--contact-notch)) 0,
    100% var(--contact-notch),
    100% 100%,
    var(--contact-notch) 100%,
    0 calc(100% - var(--contact-notch))
  );

  &:hover {
    transform: translate(-2px, -2px) scale(1.05);
    border-color: var(--color-primary);
    box-shadow:
      6px 6px 0 rgba(var(--color-primary-rgb), 0.5),
      inset 2px 2px 0 rgba(var(--color-primary-rgb), 0.15);
    background: var(--color-secondary);
    color: var(--color-surface);
  }

  @include mobile {
    width: var(--contact-icon-size-sm);
    height: var(--contact-icon-size-sm);
    border-width: 2px;
    box-shadow:
      2px 2px 0 rgba(var(--color-secondary-rgb), 0.4),
      inset 1px 1px 0 rgba(var(--color-secondary-rgb), 0.1);
  }
}

.contact-item__icon-svg {
  width: clamp(1.8vh, 1.4vw, 2.4vh);
  height: clamp(1.8vh, 1.4vw, 2.4vh);
}

.contact-item__content {
  flex: 1;
  min-width: 0;
  max-width: 100%;
  overflow-wrap: break-word;
  word-wrap: break-word;
}

.contact-item__label {
  font-family: $font-family-base;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-secondary);
  margin-bottom: 8px;
  display: block;
}

.contact-item__value-row {
  display: flex;
  align-items: center;
  gap: 1.5vh;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  flex-wrap: wrap;
}

.contact-item__value {
  font-family: $font-family-base;
  font-size: clamp(0.85rem, 1.6vw, 1rem);
  font-weight: 600;
  color: var(--color-text);
  word-break: break-word;
  overflow-wrap: break-word;
  text-decoration: none;
  transition: all 0.2s ease;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      var(--color-secondary) 0%,
      transparent 100%
    );
    transition: width 0.3s ease;
  }

  &:hover:not(.contact-item__value--static) {
    color: var(--color-secondary);

    &::after {
      width: 100%;
    }
  }
}

.contact-item__value--static {
  cursor: default;
}

.contact-item__copy-btn {
  width: var(--contact-copy-size);
  height: var(--contact-copy-size);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-surface);
  border: 2px solid var(--color-secondary);
  border-radius: 0;
  color: var(--color-secondary);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
  box-shadow: 2px 2px 0 rgba(var(--color-secondary-rgb), 0.3);
  clip-path: polygon(
    0 0,
    calc(100% - var(--contact-notch-sm)) 0,
    100% var(--contact-notch-sm),
    100% 100%,
    var(--contact-notch-sm) 100%,
    0 calc(100% - var(--contact-notch-sm))
  );

  &:hover {
    background: var(--color-secondary);
    border-color: var(--color-primary);
    color: var(--color-surface);
    transform: translate(-1px, -1px);
    box-shadow: 3px 3px 0 rgba(var(--color-primary-rgb), 0.4);
  }
}

.contact-item__copy-btn--copied {
  background: var(--color-success);
  border-color: var(--color-success);
  color: #fff;
  box-shadow: 3px 3px 0 rgba(var(--color-success-rgb), 0.4);
}

.contact-item__copy-icon {
  width: clamp(1.4vh, 1.2vw, 1.8vh);
  height: clamp(1.4vh, 1.2vw, 1.8vh);
}

.form-field {
  margin-bottom: 10px;
}

.form-label {
  font-family: $font-family-base;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-secondary);
  margin-bottom: 8px;
  display: block;
}

.form-input,
.form-textarea {
  width: 100%;
  max-width: 100%;
  padding: 14px 16px;
  background: var(--color-surface);
  border: 3px solid var(--color-border);
  border-radius: 0;
  font-family: $font-family-base;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-text);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  box-shadow: inset 2px 2px 0 rgba(var(--color-border-rgb), 0.2);
  clip-path: polygon(
    0 0,
    calc(100% - var(--contact-notch)) 0,
    100% var(--contact-notch),
    100% 100%,
    var(--contact-notch) 100%,
    0 calc(100% - var(--contact-notch))
  );
  box-sizing: border-box;
  min-width: 0;

  &::placeholder {
    color: var(--color-text-secondary);
    opacity: 0.6;
  }

  &:focus {
    outline: none;
    background: var(--color-surface);
    border: 3px solid var(--color-primary);
    box-shadow:
      4px 4px 0 rgba(var(--color-primary-rgb), 0.4),
      inset 2px 2px 0 rgba(var(--color-primary-rgb), 0.1);
    transform: translate(-1px, -1px);
    clip-path: polygon(
      0 0,
      calc(100% - var(--contact-notch-lg)) 0,
      100% var(--contact-notch-lg),
      100% 100%,
      var(--contact-notch-lg) 100%,
      0 calc(100% - var(--contact-notch-lg))
    );
  }

  &:hover:not(:focus) {
    border-color: var(--color-primary);
    box-shadow: inset 2px 2px 0 rgba(var(--color-primary-rgb), 0.15);
  }
}

.form-textarea {
  height: 12vh;
  min-height: 120px;
  resize: vertical;
  line-height: 1.5;
}

.form-message {
  display: flex;
  align-items: center;
  gap: 1.4vh;
  padding: 10px 16px;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.form-message--error {
  background: rgba(var(--color-error-rgb), 0.15);
  border: 1px solid rgba(var(--color-error-rgb), 0.3);
  color: var(--color-error);
}

.form-message--success {
  background: rgba(var(--color-success-rgb), 0.15);
  border: 1px solid rgba(var(--color-success-rgb), 0.3);
  color: var(--color-success);
}

.form-submit {
  width: 100%;
  padding: 14px 20px;
  margin-top: 10px;
  background: var(--color-primary);
  border: 4px solid var(--color-primary);
  border-radius: 0;
  font-family: $font-family-base;
  font-size: clamp(0.85rem, 1.5vw, 1rem);
  font-weight: 900;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.6vh;
  position: relative;
  overflow: visible;
  box-shadow:
    4px 4px 0 var(--color-accent),
    8px 8px 0 rgba(var(--color-primary-rgb), 0.3);
  clip-path: polygon(
    0 0,
    calc(100% - var(--contact-edge)) 0,
    100% var(--contact-edge),
    100% 100%,
    var(--contact-edge) 100%,
    0 calc(100% - var(--contact-edge))
  );

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: var(--contact-edge);
    height: var(--contact-edge);
    background: var(--color-accent);
    clip-path: polygon(0 0, 100% 0, 100% 100%);
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: var(--contact-edge);
    height: var(--contact-edge);
    background: var(--color-secondary);
    clip-path: polygon(0 0, 0 100%, 100% 100%);
    z-index: 1;
  }

  &:hover:not(:disabled) {
    transform: translate(-3px, -3px);
    box-shadow:
      9px 9px 0 var(--color-accent),
      18px 18px 0 rgba(var(--color-primary-rgb), 0.4);
    background: var(--color-accent);
    border-color: var(--color-accent);

    .form-submit__icon {
      transform: translateX(4px);
    }
  }

  &:active:not(:disabled) {
    transform: translate(-1px, -1px);
    box-shadow:
      3px 3px 0 var(--color-accent),
      6px 6px 0 rgba(var(--color-primary-rgb), 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
}

.form-submit__icon {
  width: clamp(1.6vh, 1.3vw, 2.2vh);
  height: clamp(1.6vh, 1.3vw, 2.2vh);
  transition: transform 0.3s ease;
}

:global(.dark) .contact-section__contact-card,
:global(.dark) .contact-section__form-card {
  background: linear-gradient(
    135deg,
    rgba(var(--color-surface-rgb), 0.95) 0%,
    rgba(var(--color-surface-rgb), 0.85) 100%
  );
  border-color: rgba(var(--color-border-rgb), 0.5);
}

@media (prefers-reduced-motion: reduce) {
  .contact-section__contact-card:hover,
  .contact-section__form-card:hover,
  .contact-item:hover,
  .contact-item__icon:hover,
  .form-submit:hover:not(:disabled) {
    transform: none;
  }
}
</style>
