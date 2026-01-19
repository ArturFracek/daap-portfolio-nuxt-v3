<script setup lang="ts">
//! Daap Systems Logo Component
//! Uses SVG for scalability and print readiness
//! Design: Two overlapping squares with "daap" text (sharp corners)
</script>

<template>
  <!--! data-allow-mismatch na wrapper div aby uniknąć hydration mismatch -->
  <div class="daap-logo-wrapper" data-allow-mismatch="children,attribute">
    <!--! data-allow-mismatch na SVG i defs aby uniknąć hydration mismatch -->
    <svg
      viewBox="0 -25 200 105"
      xmlns="http://www.w3.org/2000/svg"
      class="daap-logo-svg"
      role="img"
      aria-label="daap logo"
      data-allow-mismatch="attribute,children"
    >
      <!-- Gradient definitions -->
      <defs data-allow-mismatch="children">
        <!-- Gradient for bottom square -->
        <linearGradient id="gradientBottom" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#3672f5;stop-opacity:1" />
          <stop offset="20%" style="stop-color:#2b66e3;stop-opacity:1" />
        </linearGradient>

        <!-- Gradient for top square -->
        <linearGradient id="gradientTop" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#8536f5 ;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#9E86F5;stop-opacity:1" />
        </linearGradient>

        <!-- Glow filter for text - bottom lighting effect -->
        <!-- Extended filter area to prevent clipping -->
        <!--! data-allow-mismatch na filter i elementach SVG aby uniknąć hydration mismatch -->
        <filter id="daap-logo-glow-filter" x="-100%" y="-100%" width="300%" height="300%" data-allow-mismatch="children">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" data-allow-mismatch="attribute" />
          <feOffset in="coloredBlur" dx="0" dy="4" result="offsetBlur" data-allow-mismatch="attribute" />
          <feColorMatrix
            in="offsetBlur"
            type="matrix"
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0.3 0"
            result="glow"
            data-allow-mismatch="attribute"
          />
          <feMerge data-allow-mismatch="children">
            <feMergeNode in="glow" data-allow-mismatch="attribute" />
            <feMergeNode in="SourceGraphic" data-allow-mismatch="attribute" />
          </feMerge>
        </filter>

        <!-- Separate glow filter for dark/cosmic modes with white glow -->
        <!--! data-allow-mismatch na filter i elementach SVG aby uniknąć hydration mismatch -->
        <filter id="daap-logo-glow-filter-dark" x="-100%" y="-100%" width="300%" height="300%" data-allow-mismatch="children">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" data-allow-mismatch="attribute" />
          <feOffset in="coloredBlur" dx="0" dy="0" result="offsetBlur" data-allow-mismatch="attribute" />
          <feColorMatrix
            in="offsetBlur"
            type="matrix"
            values="0 0 0 0 1
                    0 0 0 0 1
                    0 0 0 0 1
                    0 0 0 0.6 0"
            result="glow"
            data-allow-mismatch="attribute"
          />
          <feMerge data-allow-mismatch="children">
            <feMergeNode in="glow" data-allow-mismatch="attribute" />
            <feMergeNode in="SourceGraphic" data-allow-mismatch="attribute" />
          </feMerge>
        </filter>
      </defs>

      <!-- Bottom-left square: sharp corners -->
      <path
        d="M 0 24 L 45 24 L 45 69 L 0 69 Z"
        fill="url(#gradientBottom)"
        class="logo-square logo-square-bottom"
      />

      <!-- Top-right square: sharp corners -->
      <path
        d="M 21 0 L 66 0 L 66 45 L 21 45 Z"
        fill="url(#gradientTop)"
        class="logo-square logo-square-top"
      />

      <!-- Text "daap" -->
      <text
        x="75"
        y="60"
        font-family="Comfortaa, system-ui, sans-serif"
        font-weight="500"
        font-size="54"
        letter-spacing="0px"
        class="logo-text"
      >
        daap
      </text>
    </svg>
  </div>
</template>

<style scoped lang="scss">
.daap-logo-wrapper {
  display: inline-block;
  width: 100%;
  height: fit-content;

  //! Ensure wrapper is visible in all themes
  [data-theme="light"] & {
    opacity: 1;
    visibility: visible;
  }

  [data-theme="dark"] & {
    opacity: 1;
    visibility: visible;
  }

  [data-theme="cosmic"] & {
    opacity: 1;
    visibility: visible;
  }
}

.daap-logo-svg {
  width: 100%;
  height: auto;
  display: block;
  overflow: visible;
  text-align: left;

  //! Ensure SVG is visible in all themes
  [data-theme="light"] & {
    opacity: 1;
    visibility: visible;
  }

  [data-theme="dark"] & {
    opacity: 1;
    visibility: visible;
  }

  [data-theme="cosmic"] & {
    opacity: 1;
    visibility: visible;
  }
}

.logo-square {
  //! Subtle shadow for depth
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  margin-bottom: 4px;

  //! Ensure squares are visible in light mode
  [data-theme="light"] & {
    opacity: 1;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15));
  }

  //! Ensure squares are visible in dark mode
  [data-theme="dark"] & {
    opacity: 1;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  }

  //! Ensure squares are visible in cosmic mode
  [data-theme="cosmic"] & {
    opacity: 1;
    filter: drop-shadow(0 2px 4px rgba(139, 92, 246, 0.2));
  }
}

.logo-text {
  //! Clean, modern text rendering
  font-family: 'Comfortaa', system-ui, sans-serif !important;
  font-weight: 500;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //! Use CSS variable for fill color - adapts to theme
  fill: var(--color-text);

  //! Ensure dark text in light mode (explicit for visibility)
  [data-theme="light"] & {
    fill: var(--color-text); //! #1e293b (dark slate blue)
    filter: url(#daap-logo-glow-filter); //! Subtle dark glow for light mode
  }

  //! Ensure white text in dark mode
  [data-theme="dark"] & {
    fill: var(--color-text); //! #f1f5f9 (white/light gray)
    filter: url(#daap-logo-glow-filter-dark); //! White glow for dark mode
  }

  //! Ensure proper color in cosmic mode
  [data-theme="cosmic"] & {
    fill: var(--color-text); //! #e0e7ff (light purple/white)
    filter: url(#daap-logo-glow-filter-dark); //! White glow for cosmic mode
  }
}
</style>
