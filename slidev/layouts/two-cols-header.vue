<!--
  layout: two-cols-header
  Header row + two columns separated by a hairline. Hairline-as-divider is
  consistent with the NYUAD design language.

  Slots: default (header), left, right.
-->
<template>
  <div class="slidev-layout ctp-two-cols">
    <div class="ctp-two-cols__header">
      <slot />
    </div>
    <div class="ctp-two-cols__grid">
      <div class="ctp-two-cols__col">
        <slot name="left" />
      </div>
      <div class="ctp-two-cols__col ctp-two-cols__col--right">
        <slot name="right" />
      </div>
    </div>
    <CtpFooter />
  </div>
</template>

<style scoped>
.ctp-two-cols {
  /* Same pattern as .ctp-default, claim full slide height so the grid can
     expand and the footer pins to the bottom. */
  height: 100%;
  min-height: 100%;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  background: var(--bg1);
  padding: var(--s-6) var(--s-7) var(--s-4);
}

.ctp-two-cols__header {
  margin-bottom: var(--s-4);
  padding-bottom: var(--s-3);
  border-bottom: 1px solid var(--hairline);
}

.ctp-two-cols__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--s-7);
  flex: 1 1 0;
  min-height: 0;
}

.ctp-two-cols__col {
  display: flex;
  flex-direction: column;
  gap: var(--s-2);
  overflow: hidden;
}

.ctp-two-cols__col--right {
  border-left: 1px solid var(--hairline);
  padding-left: var(--s-7);
}
</style>
