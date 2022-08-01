<template>
  <div class="hero">
    <h2>CSS</h2>
  </div>
</template>

<style scoped>
h2 {
  border: none;
  text-align: center;
}
.hero {
  box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
  height: 180px;
  background: url('https://source.unsplash.com/WLUHO9A_xik/1600x900') no-repeat
    center;
}

.hero::before {
  content: '';
}
</style>
