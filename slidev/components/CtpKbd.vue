<!--
  CtpKbd, keyboard key chip. <CtpKbd>Cmd</CtpKbd> <CtpKbd>K</CtpKbd>
-->
<template>
  <kbd class="ctp-kbd"><slot /></kbd>
</template>

<style scoped>
.ctp-kbd {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 0.78em;
  padding: 0.05em 0.45em;
  border: 1px solid var(--hairline);
  border-bottom-width: 2px;
  border-radius: var(--r-1);
  background: var(--bg1);
  color: var(--fg1);
  vertical-align: 1px;
  margin: 0 0.1em;
}
</style>
