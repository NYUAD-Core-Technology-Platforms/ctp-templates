<!--
  CtpFooter — slim hairline footer on content slides.
  Eyebrow label on the left (deck title in all-caps tracked sans), tabular
  mono page number on the right. No decorative dots — design language is
  restrained.
-->
<template>
  <div class="ctp-footer">
    <div class="ctp-footer__left ctp-eyebrow">{{ deckTitle }}</div>
    <div class="ctp-footer__right">
      <span v-if="author" class="ctp-footer__author">{{ author }}</span>
      <span class="ctp-footer__sep" v-if="author">·</span>
      <span class="ctp-footer__page">{{ $slidev.nav.currentPage }} / {{ $slidev.nav.total }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { configs } from '@slidev/client'
import { computed } from 'vue'

const cfg = configs as Record<string, any>
const deckTitle = computed(() => cfg.title || 'CTP Workshop')
const author = computed(() => cfg.author || '')
</script>

<style scoped>
.ctp-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--s-3);
  border-top: 1px solid var(--hairline);
  font-family: var(--font-sans);
  font-size: var(--t-caption);
  color: var(--fg3);
}

.ctp-footer__left {
  /* inherits .ctp-eyebrow styling — uppercase tracked sans, violet */
}

.ctp-footer__right { display: flex; align-items: center; gap: var(--s-2); }

.ctp-footer__author {
  font-weight: 500;
  color: var(--fg2);
}

.ctp-footer__sep { opacity: 0.4; }

.ctp-footer__page {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  color: var(--fg2);
}
</style>
