<!-- 这是多余作品的弹窗组件，点击查看更多显示 -->
<script setup>
const props = defineProps({
  period: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  icons: {
    type: Object,
    required: true,
    default: () => ({}),
  },
})

//轮播动效（待定）
import { ref } from 'vue'
const curWork = ref(0)
const LeftClick = () => {
  curWork.value = (curWork.value - 1 + props.period.works.length) % props.period.works.length
}
const RightClick = () => {
  curWork.value = (curWork.value + 1) % props.period.works.length
}

const emit = defineEmits(['closePopup'])
const handleClose = () => {
  emit('closePopup')
  curWork.value = 0 //关闭时重置索引
}
</script>

<template>
  <div class="popup_box" :style="{ backgroundImage: `url(${icons.bgImg})` }">
    <div class="content_part">
      <button class="close_btn" @click="handleClose">
        <img :src="icons.closeBtn" alt="关闭弹窗" v-if="icons.closeBtn" />
      </button>
      <button class="arrow_btn left_arrow" @click="LeftClick" v-if="period.works.length > 1">
        <img :src="icons.leftBtn" alt="上一页" />
      </button>
      <button class="arrow_btn right_arrow" @click="RightClick" v-if="period.works.length > 1">
        <img :src="icons.leftBtn" alt="下一页" />
      </button>
      <div class="time_part"><img :src="period.timeImg" alt="左侧朝代" /></div>
      <div class="work_part"><img :src="period.works[curWork].workImg" alt="中间作品" /></div>
      <div class="celebrity_part">
        <img :src="period.works[curWork].celImg" alt="右边人物" />
        <div class="intro">
          <p>{{ period.works[curWork].celIntro }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.popup_box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 83.3vw; /*1200px*/
  height: 45.14vw; /*650px*/
  background-size: cover;
  background-position: center;
  overflow: hidden;
  z-index: 100;
  box-sizing: border-box;
}
.content_part {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 91.67%; /*1100px*/
  height: 84.62%; /*550px*/
}
.close_btn {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  cursor: pointer;
  width: auto;
  height: 40px;
  padding: 0;
  background: transparent;
  z-index: 10;
}
.close_btn img {
  width: 100%;
  height: 100%;
  object-fit: contain; /*？*/
}
.arrow_btn {
  position: absolute;
  top: 50%;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
}
.arrow_btn img {
  width: auto;
  height: 40px;
}
.left_arrow {
  left: 0;
  transform: translateY(-50%) rotate(180deg);
}
.right_arrow {
  right: 0;
  transform: translateY(-50%);
}
.time_part {
  position: absolute;
  top: 30%; /*自由发挥，应该是224px*/
  left: 10%; /*自由发挥，应该是150px*/
  width: auto;
  height: 180px;
}
.work_part {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: auto;
  height: 86.55%; /* 476px */
}
.time_part img,
.work_part img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.celebrity_part {
  position: absolute;
  right: 13.64%; /*150px*/
  top: 50%;
  transform: translateY(-50%);
  width: 21.45%; /*236px*/
  height: auto;
}
.celebrity_part img {
  width: 100%;
  height: auto;
}
.intro {
  position: relative;
  left: 0;
  bottom: 0;
  box-sizing: border-box; /* 盒模型计算包含内边距，避免宽度溢出 */
}
.intro p {
  text-indent: 2em;
  line-height: 20px;
  font-size: 12px;
  color: white;
  text-align: justify;
  width: 100%;
}
</style>
