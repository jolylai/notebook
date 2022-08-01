<template>
  <ul>
    <li
      title="click to copy color"
      v-for="(color, index) in colors"
      :key="color"
      :style="`background-color: ${color}`"
      @click="copyToClipboard(color)"
    >
      <span>
        {{ `${name}-${index + 1}` }}
      </span>
      <span>
        {{ color }}
      </span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { presetDarkPalettes } from '@ant-design/colors'

type Color = {
  name: string
  count: number
}

type PaletteProps = {
  color: Color
}

const props = defineProps<PaletteProps>()

const name = props.color.name

const colors = presetDarkPalettes[name]

const copyToClipboard = (str: string) => {
  const el = document.createElement('textarea')
  el.value = str
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  document.body.appendChild(el)

  const getSelection = document.getSelection()

  const selected =
    getSelection && getSelection.rangeCount > 0
      ? getSelection.getRangeAt(0)
      : false
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
  if (selected) {
    getSelection && getSelection.removeAllRanges()
    getSelection && getSelection.addRange(selected)
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  padding-left: 0;
  color: #fff;
}
li {
  width: 100%;
  padding: 8px 16px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}

li:hover {
  width: calc(100% + 20px);
  transition: 0.4s ease-out width;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
}
</style>
