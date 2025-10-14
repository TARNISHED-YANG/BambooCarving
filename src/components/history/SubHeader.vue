<script setup>
defineProps({
  origin: { type: String, required: true },
  celebrity: { type: String, required: true },
  subImg: { type: String, required: true },
  header_info: {
    type: Object,
    required: true,
  },
  y:{type:Number,required:true}//到顶部距离
})
</script>

<template>
  <div class="container"
    :style="{
      position:'absolute',
      top:y+'px'}"
  >
    <img :src="origin" alt="左上历史" class="small_img top_left" />
    <img :src="celebrity" alt="右上名人" class="small_img top_right" />
    <div class="middle">
      <div class="sub_wrapper">
        <h1 class="main_title">{{ header_info.chiIntro }}</h1>

        <img :src="subImg" alt="角标时间" class="subscript" />
      </div>
      <p class="eng_intro">{{ header_info.engIntro }}</p>
      <p class="description">{{ header_info.textIntro }}</p>
    </div>
  </div>
</template>

<style scoped>
@font-face {
  font-family: 'Font1';
  src: url('@/assets/Fonts/ZiTiQuanXinYiJiXiangSong-2 字体圈欣意吉祥宋 Regular.ttf') format('truetype');
}
@font-face {
  font-family: 'Font2';
  src: url('@/assets/Fonts/MinionVariableConcept-Roman.otf') format('opentype');
}
@font-face {
  font-family: 'Font3';
  src: url('@/assets/Fonts/细体-思源黑体7号.otf') format('opentype');
}
.container {
  left:50%;
  transform:translateX(-50%);
  width: 83.3vw;/*1200px*/
  height: 34.7vw;/*500px*/
}
.small_img {
  position: absolute;
  top: 0;
  height: 41.5px;
  object-fit: contain;
}
.top_left {
  left: 0;
}
.top_right {
  right: 0;
}
.middle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 80%;
  height:100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 35px;
}
/* 定位角标的容器 */
.sub_wrapper {
  position: relative;
  display: flex;
  justify-content: center;
}
.main_title {
  color:white;
  font-size: 74px;
  letter-spacing: -0.05em;
  writing-mode: vertical-rl;
  margin: 0;
  font-family: 'Font1';
}
.subscript {
  position: absolute;
  bottom: -10px; /* 超出主标题底部一点 */
  right: -20px; /* 超出主标题左侧一点（竖排文字右侧对应横排左侧） */
  width: 30px;
  height: 30px;
}

.eng_intro {
  color:white;
  font-size: 26px;
  margin: 0;
  white-space: pre-line; /*使换行符生效*/
  font-family: 'Font2';
}

.description {
  color:white;
  font-size: 12px;
  line-height: 1.8;
  max-width: 500px;
  margin: 0;
  text-indent: 2em;
  text-align: justify;
  font-family: 'Font3';
}
</style>
