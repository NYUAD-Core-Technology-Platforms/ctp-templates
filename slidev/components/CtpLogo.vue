<!--
  CtpLogo — official NYUAD lockup.
  Uses the real PNG asset from the design system. For dark backgrounds, the
  `white` prop applies `brightness(0) invert(1)` so the violet logo reads as
  white, matching the design-system guidance.

  The accompanying CTP wordmark is rendered as small all-caps tracked sans
  underneath, per the eyebrow type style.
-->
<template>
  <div class="ctp-logo" :class="{ 'ctp-logo--white': white }">
    <img
      class="ctp-logo__img"
      :src="resolvedSrc"
      alt="NYU Abu Dhabi"
      :style="white ? 'filter: brightness(0) invert(1);' : ''"
    />
    <div class="ctp-logo__sub" v-if="!minimal">Core Technology Platforms</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  /** Render as white (for dark/violet backgrounds) */
  white?: boolean
  /** Hide the CTP sublabel */
  minimal?: boolean
  /** Override the logo path. Default points to the bundled brand asset. */
  src?: string
}>(), {
  src: 'brand/nyuad-logo.png',
})

// Prefix Vite's base URL so the asset resolves whether the deck is served at
// the domain root (PDF export, local preview) OR under a sub-path (GitHub
// Pages project sites, e.g. /repo/NN-slug/). A bare "/brand/..." would point
// at the domain root and 404 on a sub-path deploy.
const resolvedSrc = computed(() => {
  const s = props.src
  if (/^(https?:|data:|blob:)/.test(s)) return s          // leave full URLs alone
  const base = import.meta.env.BASE_URL || '/'             // always ends with "/"
  return base + s.replace(/^\//, '')                       // join, dropping any leading slash
})
</script>

<style scoped>
.ctp-logo {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--s-2);
}

.ctp-logo__img {
  height: 32px;
  width: auto;
  display: block;
}

.ctp-logo__sub {
  font-family: var(--font-sans);
  font-size: var(--t-eyebrow);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: var(--tracked);
  color: var(--fg2);
}

.ctp-logo--white .ctp-logo__sub { color: var(--violet-200); }
</style>
