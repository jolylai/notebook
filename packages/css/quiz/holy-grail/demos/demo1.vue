<template>
  <header>Header</header>
  <section class="main">
    <div class="content">Content</div>
    <div class="left">Left</div>
    <div class="right">Right</div>
  </section>
  <footer>Footer</footer>
</template>

<style scoped>
.main {
  overflow: hidden;
}
.main > div {
  float: left;
  height: 229px;
}
.left,
.right {
  width: 120px;
}
</style>
