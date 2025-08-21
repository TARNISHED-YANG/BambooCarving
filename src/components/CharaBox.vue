<template>
  <div class="CharaBox">
    <motion.div
        class="TextBox"
        :initial="{ x: -200, opacity: 0 }"
        :whileInView="{ x: 0, opacity: 1 }"
        :transition="{ duration: 0.8, ease: 'easeOut' }"
        :inViewOptions="{
          amount: 0.2,                 // 需要 60% 可见才触发；可用 0~1、'some'、'all'
          margin: '0px 0px -20% 0px',  // 收紧底边界，得再多滚一点才算“进入”
          once: true                   // 触发一次后不再反向
        }"
      >
      {{ text }}
    </motion.div>

    <div class="ImgWrapper">
      <img :src="imgSrc" alt="图片" class="ImgBox" />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { motion } from "motion-v";
const props = defineProps({
  text: {
    type: String,
    default: "这里是文字区域"
  },
  imgSrc: {
    type: String,
    default: ""
  }
});
</script>

<style scoped>
.CharaBox {
  width: 100%;
  height: 800px;
  display: flex;
  background-color: aquamarine;
}

.TextBox {
  width: 55%;
  height: 100%;
  background-color: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ImgWrapper {
  width: 45%;
  height: 100%;
  overflow: hidden; /* 超出部分隐藏 */
  position: relative;
}

.ImgBox {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}


.ImgBox:hover {
  transform: scale(1.1); 
}
</style>
