<!--
  layout: cover
  Editorial title slide. White surface, NYUAD lockup top-left, eyebrow, big
  serif title from the user's `# Title` in markdown, hairline rule, meta.

  Slots:
    - eyebrow : label above the title
    - default : markdown containing `# Title`
    - meta    : presenter, date, location

  Don't wrap the default slot in an <h1>: that would nest with the markdown's
  own <h1> and the parser would demote one of them to <h2>.
-->
<template>
  <div class="slidev-layout ctp-cover">
    <CtpLogo class="ctp-cover__logo" />

    <div class="ctp-cover__content">
      <div class="ctp-cover__eyebrow">
        <slot name="eyebrow">
          <span class="ctp-tag">CTP Upscaling · NYUAD</span>
        </slot>
      </div>

      <div class="ctp-cover__title">
        <slot />
      </div>

      <hr class="ctp-cover__rule" />

      <div class="ctp-cover__meta">
        <slot name="meta" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.ctp-cover {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: var(--s-7) var(--s-8);
  background: var(--bg1);
}

.ctp-cover__logo { margin-bottom: var(--s-7); }

.ctp-cover__content {
  display: flex;
  flex-direction: column;
  max-width: 85%;
}

.ctp-cover__eyebrow { margin-bottom: var(--s-5); }

.ctp-cover__title :deep(h1) {
  font-family: var(--font-serif);
  font-size: var(--t-display);
  font-weight: 700;
  line-height: var(--lh-tight);
  letter-spacing: -0.01em;
  color: var(--fg1);
  text-transform: none;
  margin: 0;
  text-wrap: pretty;
}

.ctp-cover__rule {
  border: 0;
  border-top: 1px solid var(--hairline);
  margin: var(--s-6) 0 var(--s-4);
  width: 100%;
}

.ctp-cover__meta {
  font-family: var(--font-sans);
  font-size: var(--t-small);
  color: var(--fg2);
  line-height: var(--lh-normal);
}
.ctp-cover__meta :deep(p) { margin: 0.2em 0; }
</style>
