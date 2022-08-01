<template>
  <span ref="span" :class="{ float: isFloat }">块状化</span>
  <div>
    <div>display计算值为: {{ display }}</div>
    <button @click="toggleFloat">
      {{ isFloat ? '去除浮动' : '设置浮动' }}
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const isFloat = ref(false)
const span = ref()
const display = ref('inline')

const getComputedDisplay = el => {
  if (!(el instanceof Element)) return ''
  return window.getComputedStyle(el).display
}

watch(isFloat, isFloat => {
  display.value = getComputedDisplay(span.value)
})

const toggleFloat = () => {
  isFloat.value = !isFloat.value
}
</script>

<style scoped>
.float {
  float: left;
}
</style>
