<script setup>
import { computed } from 'vue';

// ------------------ Props ------------------
const props = defineProps({
  mainImg: { type: String, required: true },        // 大图路径
  sideImgs: { type: Array, required: true },       // 小图路径数组，长度 >= 3
  mainHeightVh: { type: Number, default: 40 },     // 大图高度，vh 单位
  smallRatio: { type: Number, default: 0.285 },    // 小图比例
  mainRatio: { type: Number, default: 5/3 },        // 大图宽高比
  name:{type:String,default:"竹根雕折枝蟠桃摆件"},
  data:{type:String,default:"【清早期】10cm"},
  intro:{type:String,default:"取竹根为材，依势刻大蟠桃，以竹鞭作桃枝虬屈处极尽天然之美，桃身一枝环绕，桃叶若迎风作卷舒之状，极类清三代珐琅彩瓷器上工笔画法，一小枝回折上附二小桃。下承一异形乌木座，依形相配线条流畅，一黑一黄相得益彰。"}

});

// ------------------ 计算尺寸 ------------------
const main_height = computed(() => props.mainHeightVh);           // 高度 vh 单位
const main_width = computed(() => main_height.value * props.mainRatio); // 根据比例算宽度
const small_height = computed(() => main_height.value * props.smallRatio);
const small_width = computed(() => main_width.value * props.smallRatio);

// ------------------ 箭头函数 ------------------
const prev_slide = () => {
  console.log("prev_slide");
}
const next_slide = () => {
  console.log("next_slide");
}
</script>

<template>
  <div class="CirPicWrapper">
    <!-- 图片部分 -->
    <div class="CirPic">
      <div 
        class="main_pic" 
        :style="{ width: main_width + 'vh', height: main_height + 'vh' }"
      >
        <img :src="mainImg" alt="Main Image">
        <div class="text_box">
          <div class="name text">
            {{ name }}
          </div>
          <div class="data text">
            {{ data }}
          </div>
          <div class="intro text">
            {{ intro }}
          </div>
        </div>
      </div>
      

      <div class="side_pics">
        <div 
          v-for="(img, index) in sideImgs.slice(0,3)" 
          :key="index" 
          class="small_pic"
          :style="{ width: small_width + 'vh', height: small_height + 'vh' }"
        >
          <img :src="img" alt="Side Image">
        </div>
      </div>
    </div>

    <!-- 箭头部分 -->
    <div class="arrow_container">
      <button class="arrow left" @click="prev_slide">Prev</button>
      <button class="arrow right" @click="next_slide">Next</button>
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
</style>
