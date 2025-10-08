<!-- 这是等待完成的轨道节点组件 -->
<script setup>
import { ref, onMounted } from 'vue'
defineProps({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  //其他额外属性（待添加）
})
const rectRef = ref(null)
onMounted(() => {
  setTimeout(() => {
    if (rectRef.value) {
      rectRef.value.style.opacity = '1'
    }
  }, 50)
})
</script>

<template>
  <div
    ref="rectRef"
    class="rect"
    :style="{
      position: 'absolute',
      left: x + 'px',
      top: y + 'px',
      width: '400px',
      height: '200px',
      background: 'rgba(255,165,0)',
      border: '2px solid orange',
      opacity: 0,
      transition: 'opacity 1s ease',
      zIndex: 10,
    }"
  ></div>
</template>

<style scoped></style>
