<template>
  <svg class="connection-lines" viewBox="0 0 800 400" aria-hidden="true">
    <defs>
      <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#2563eb" stop-opacity="0.2" />
        <stop offset="100%" stop-color="#7c3aed" stop-opacity="0.4" />
      </linearGradient>
    </defs>
    <path
      d="M40 320 C 180 240, 320 260, 460 180 C 540 130, 640 120, 760 80"
      fill="none"
      stroke="url(#line-gradient)"
      stroke-width="2"
    />
    <circle cx="40" cy="320" r="6" fill="rgba(37, 99, 235, 0.5)" />
    <circle cx="460" cy="180" r="6" fill="rgba(124, 58, 237, 0.5)" />
    <circle cx="760" cy="80" r="6" fill="rgba(124, 58, 237, 0.5)" />
  </svg>
</template>

<style scoped lang="scss">
.connection-lines {
  width: 100%;
  height: auto;
  opacity: 0.7;
}
</style>
