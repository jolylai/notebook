<template>
  <ul class="ul">
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>
</template>

<style scoped>
ul {
  padding: 0;
  margin: 0;
  list-style: none;
  overflow: hidden;
}
li {
  float: left;
  width: 16px;
  height: 16px;
  margin-top: 8px;
  margin-right: 8px;
  background: #7198a3;
}
li:nth-of-type(3) {
  clear: left;
}
</style>
