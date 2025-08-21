<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  imgs:    { type: Array, required: true }, // 图片数组（至少 1 个）
  names:   { type: Array, required: true }, // 名称数组
  datas:   { type: Array, required: true }, // 数据数组
  intros:  { type: Array, required: true }, // 介绍数组

  mainHeightVh: { type: Number, default: 40 },
  smallRatio:   { type: Number, default: 0.285 },
  mainRatio:    { type: Number, default: 5 / 3 },
});

const currentIndex = ref(0);
const n = computed(() => props.imgs.length);

// 大图与对应文字（直接索引，假设长度一致）
const mainImg = computed(() => props.imgs[currentIndex.value]);
const mainName = computed(() => props.names[currentIndex.value]);
const mainData = computed(() => props.datas[currentIndex.value]);
const mainIntro = computed(() => props.intros[currentIndex.value]);

// 侧栏索引（当前之后的最多 3 张）
const sideIndices = computed(() => {
  const arr = [];
  const maxSide = Math.min(3, n.value - 1);
  for (let i = 1; i <= maxSide; i++) arr.push((currentIndex.value + i) % n.value);
  return arr;
});
const sideImgs = computed(() => sideIndices.value.map(i => props.imgs[i]));

// 切换函数
const next_slide = () => { currentIndex.value = (currentIndex.value + 1) % n.value; };
const prev_slide = () => { currentIndex.value = (currentIndex.value - 1 + n.value) % n.value; };
const onClickSide = (idx) => { currentIndex.value = sideIndices.value[idx]; };

// 尺寸
const main_height = computed(() => props.mainHeightVh);
const main_width  = computed(() => main_height.value * props.mainRatio);
const small_height = computed(() => main_height.value * props.smallRatio);
const small_width  = computed(() => main_width.value * props.smallRatio);
</script>

<template>
  <div class="CirPicWrapper">
    <div class="CirPic">
      <div class="main_pic" :style="{ width: main_width + 'vh', height: main_height + 'vh' }">
        <img :src="mainImg" alt="Main" />
        <div class="text_box">
          <div class="name text">{{ mainName }}</div>
          <div class="data text">{{ mainData }}</div>
          <div class="intro text">{{ mainIntro }}</div>
        </div>
        <!--底部小圆圈，当索引号相等时，将状态改为激活-->
        <div class="dots_container">
          <span
            v-for="(dot, idx) in n"
            :key="idx"
            class="dot"
            :class="{ active: idx === currentIndex }" 
            @click="currentIndex = idx"
          ></span>
        </div>
      </div>

      <div class="side_pics" v-if="sideImgs.length">
        <div
          v-for="(img, idx) in sideImgs"
          :key="sideIndices[idx]"
          class="small_pic"
          :style="{ width: small_width + 'vh', height: small_height + 'vh' }"
          @click="onClickSide(idx)"
        >
          <img :src="img" alt="Side" />
        </div>
      </div>
    </div>

    <div class="arrow_container">
      <button class="arrow left" @click="prev_slide" :disabled="n <= 1">Prev</button>
      <button class="arrow right" @click="next_slide" :disabled="n <= 1">Next</button>
    </div>
  </div>
</template>


<style scoped>
.CirPicWrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.CirPic {
  position: relative;
  display: inline-block;
}

/* 图片样式保持不变 */
.main_pic {
  border-radius: 0px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.25);
}
.main_pic img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.side_pics {
  position: absolute;
  top: 50%;
  right: -20%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.small_pic {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 3px 8px rgba(0,0,0,0.25);
}
.small_pic img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.text_box{
  width: 35%;
  height: 80%;
  display: flex;
  position: absolute;
  background-color: rgba(0,0,0,0.25);
  color:white;
  flex-direction: column;
  top:5%;
  left:2%;
}
.text_box .text{
  margin-left:20%;
  max-width: 75%;
}
.text_box .name{
  margin-left:22%;
  padding-top:30%;
  margin-bottom: 1.5%;
  color: white;
  font-size: 1.5rem;
}
.text_box .data{
  margin-left:22%;
  color: white;
  font-size: 1.2rem;
  margin-bottom:7%;
}
.text_box .intro{
  color: white;
  font-size: 1rem;
  text-align: justify;
}
/* 箭头容器 */
.arrow_container {
  width: 100%;           /* 宽度占满父容器 */
  display: flex;
  justify-content: center;  /* 水平居中 */
  margin-top: 5vh;
  gap: 2rem;
}

.arrow {
  background: rgba(0,0,0,0.5);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
}
.dots_container {
  position: absolute;
  bottom: 10px;         /* 距离底部 10px */
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.8rem;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: background 0.3s, transform 0.3s;
}

.dot.active {
  background: #333;   /* 当前图片高亮 */
  transform: scale(1.2);
}
</style>

