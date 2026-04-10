<!-- 这是历史渊源部分的开头标题 -->
<script setup>
import { ref, onMounted } from 'vue'

import backImg1 from '@/assets/history/header/background_1.png'
import backImg2 from '@/assets/history/header/background_2.png'
import subTitle from '@/assets/history/header/Subheading_1.png'
import enTitle from '@/assets/history/header/bigtitle_2.png'
import arrowIcon from '@/assets/history/header/icon_1.png'

defineProps({
  mainTitle: { type: String, required: true },
})

const mTitleShow = ref(false)
const arrowShow = ref(false)
const bg2Show = ref(true)

onMounted(() => {
  setTimeout(() => {
    mTitleShow.value = true
    bg2Show.value = false
  }, 0)
  setTimeout(() => {
    arrowShow.value = true
  }, 1500)
})
</script>

<template>
  <div class="intro_box">
    <div
      class="background_layer first_layer"
      :style="{ backgroundImage: `url(${backImg1})` }"
    ></div>
    <div
      class="background_layer second_layer"
      :class="{ fade_out: !bg2Show }"
      :style="{ backgroundImage: `url(${backImg2})` }"
    ></div>
    <div class="content_part">
      <img :src="subTitle" alt="副标题" class="sub_title" />

      <img :src="mainTitle" alt="主标题" :class="{ fade_in: mTitleShow }" class="main_title" />
      <img :src="enTitle" alt="英文标题" class="english_title" />

      <img :src="arrowIcon" alt="向下箭头" :class="{ fade_in: arrowShow }" class="arrow" />
    </div>
  </div>
</template>

<style scoped>
/* 基础计算：1vw = 1440px的1% = 14.4px */
.intro_box {
  position: relative;
  width: 100vw;
  /* max-width: 1440px; 宽屏也不留空隙*/
  height: calc(100vw * 177/288); /*885px*/
  overflow: hidden;
  /* margin: 0 auto; 水平居中 */
}
.background_layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}
.first_layer {
  z-index: 1;
}
.second_layer {
  z-index: 2;
  opacity: 1;
  transition: opacity 2.5s ease-in-out;
}
.fade_out {
  opacity: 0;
}
.content_part {
  position: relative;
  z-index: 3;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; /* 仅负责水平居中 */
}

/* 所有元素用绝对定位控制垂直距离，继承Flex的水平居中 */
.sub_title {
  position: absolute;
  top: 14.3503%;
  height: auto;
  width: 12.9167%;
}
.main_title {
  position: absolute;
  top: 38.08%;
  width: 53.75%;
  height: auto;
  opacity: 0;
  transition: opacity 2s ease-in-out;
}
.english_title {
  position: absolute;
  top: 43.164%;
  width: auto;
  height: 70px;/*英文宽度？*/
}
.arrow {
  position: absolute;
  bottom: 10.565%;
  width: 6.8056%;
  height: auto;
  opacity: 0;
  transition: opacity 2s ease-in-out;
}
.fade_in {
  opacity: 1;
}
</style>
