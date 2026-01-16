<template>
  <div class="logo">
    <svg
      class="logo__mark"
      viewBox="0 0 48 48"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="daap-logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2563eb" />
          <stop offset="100%" stop-color="#7c3aed" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#daap-logo-gradient)" />
      <path
        d="M16 30V18h8c3.5 0 6 2.4 6 6s-2.5 6-6 6h-8z"
        fill="white"
      />
      <path
        d="M20 22v4h4c1.2 0 2-0.8 2-2s-0.8-2-2-2h-4z"
        fill="#1e1b4b"
      />
    </svg>
    <span class="logo__text">daap</span>
  </div>
</template>

<style scoped lang="scss">
.logo {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--color-text);
  font-weight: 700;
  letter-spacing: -0.02em;
}

.logo__mark {
  width: 40px;
  height: 40px;
}

.logo__text {
  font-size: 1.2rem;
  text-transform: lowercase;
}
</style>
