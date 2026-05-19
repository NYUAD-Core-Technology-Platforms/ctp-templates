<!--
  layout: default
  Everyday content slide. White surface, body slot, hairline footer.
-->
<template>
  <div class="slidev-layout ctp-default">
    <div class="ctp-default__body">
      <slot />
    </div>
    <CtpFooter />
  </div>
</template>

<style scoped>
.ctp-default {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: var(--bg1);
  padding: var(--s-6) var(--s-7) var(--s-4);
}

.ctp-default__body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--s-3);
  min-height: 0;
}
</style>
