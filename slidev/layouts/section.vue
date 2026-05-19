<!--
  layout: section
  Full-bleed divider between major parts of a deck.
    - Deep violet background (NYUAD chrome color).
    - Gold eyebrow with the section number.
    - Big serif display title — produced by the user's `# Title` in markdown.
    - Optional subtitle in violet-200, serif lede style.

  Important: don't wrap the default slot in an <h1>. The markdown `#` already
  produces an <h1>; nesting one inside our own would cause the parser to demote
  it to <h2>, which then picks up h2 styling (uppercase + dark text).

  Slots:
    - number   : eyebrow content (e.g. "PART 01")
    - default  : the markdown that contains `# Title`
    - subtitle : the lede beneath
-->
<template>
  <div class="slidev-layout ctp-section">
    <div class="ctp-section__number" v-if="$slots.number">
      <slot name="number" />
    </div>
    <div class="ctp-section__title">
      <slot />
    </div>
    <div class="ctp-section__subtitle" v-if="$slots.subtitle">
      <slot name="subtitle" />
    </div>
  </div>
</template>

<style scoped>
.ctp-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background: var(--nyuad-deep-violet);
  padding: var(--s-7) var(--s-8);

  /* Re-bind the semantic color tokens locally so every descendant inherits
     light-on-violet treatment automatically. Headings, body, links, hairlines
     all read these vars in their rules in layout.css, so we don't need to
     repeat colors on individual elements. */
  --fg1:      var(--white);
  --fg2:      var(--violet-200);
  --fg3:      var(--violet-300);
  --link:     var(--gold);
  --link-hover: #E8B946;
  --bg2:      var(--violet-800);
  --hairline: var(--violet-700);
  --border:   var(--violet-600);
  color: var(--fg1);
}

.ctp-section__number {
  font-family: var(--font-sans);
  font-size: var(--t-eyebrow);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: var(--tracked);
  color: var(--gold);
  margin-bottom: var(--s-5);
}

/* Style the markdown-generated <h1> via :deep() — slot content lives in the
   parent's CSS scope, so plain scoped selectors don't reach it. */
.ctp-section__title :deep(h1) {
  font-family: var(--font-serif);
  font-size: var(--t-display);
  font-weight: 700;
  line-height: var(--lh-tight);
  letter-spacing: -0.01em;
  color: var(--white);
  text-transform: none;
  margin: 0;
  max-width: 90%;
  text-wrap: pretty;
}

.ctp-section__subtitle {
  margin-top: var(--s-5);
  font-family: var(--font-serif);
  font-size: var(--t-body-lg);
  font-weight: 400;
  line-height: var(--lh-relaxed);
  color: var(--violet-200);
  max-width: 70%;
}
.ctp-section__subtitle :deep(p) { margin: 0; color: var(--violet-200); }
</style>
