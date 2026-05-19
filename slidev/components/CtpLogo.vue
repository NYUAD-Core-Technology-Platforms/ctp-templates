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
      :src="src"
      alt="NYU Abu Dhabi"
      :style="white ? 'filter: brightness(0) invert(1);' : ''"
    />
    <div class="ctp-logo__sub" v-if="!minimal">Core Technology Platforms</div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  /** Render as white (for dark/violet backgrounds) */
  white?: boolean
  /** Hide the CTP sublabel */
  minimal?: boolean
  /** Override the logo path. Default points to /brand/nyuad-logo.png. */
  src?: string
}>(), {
  src: '/brand/nyuad-logo.png',
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
