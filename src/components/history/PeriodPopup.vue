<!-- 这是多余作品的弹窗组件，点击查看更多显示，即ShowMore的子组件 -->
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
      <div class="show_part">
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
  </div>
</template>

<style scoped>
.popup_box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 83.333vw; /*1200px*/
  height: 45.139vw; /*650px*/
  background-size: cover;
  background-position: center;
  overflow: hidden;
  z-index: 100;
  box-sizing: border-box;
  border: 0.5px solid rgba(255,255,255,0.8);
  border-radius: 4px;
}
.content_part {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 91.7%; /*1100px*/
  height: 84.6%; /*550px*/
}
.close_btn {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  cursor: pointer;
  width:34px;
  height:auto;
  padding: 0;
  background: transparent;
  z-index: 10;
}
.close_btn img {
  width: 100%;
  height: 100%;
  object-fit: contain;
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
  height: auto;
  width: 27px;
}
.left_arrow {
  left: 0;
  transform: translateY(-50%) rotate(180deg);
}
.right_arrow {
  right: 0;
  transform: translateY(-50%);
}
.show_part {
  position: absolute;
  left:50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: space-between; /* 左右两端对齐，中间自动分配 */
  width: calc(100% * 8 / 11); /* 800px */
  height: 100%;
  padding: 0;
  box-sizing: border-box;
  gap:48px;
}

.time_part {
  width: 29.25%; /* 234px */
  height: auto;
  display: flex;
  align-items: center;
}
.time_part img {
  width: 100%;
  height: auto;
  object-fit: contain;
}

/* 中间：作品展示 */
.work_part {
  width:29.25%; /* 234px */
  height:86.55%; /* 476px */
  display: flex;
  align-items: center;
  justify-content: center;
}
.work_part img {
  max-width:100%;
  max-height:100%;
  height:auto;
  width:auto;
  object-fit: contain; /* 保持图片比例，不拉伸 */
}


.celebrity_part {
  width: 29.5%; /* 236px */
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.celebrity_part img {
  height:34px;
  width:auto;
  object-fit: contain;
  margin-bottom: 10px; /* 头像与文字间距 */
}
.intro {
  width: 100%;
  box-sizing: border-box;
}
.intro p {
  text-indent: 2em;
  line-height: 20px;
  font-size: 12px;
  color: white;
  text-align: justify;
  white-space: pre-line; /* 换行符生效 */
}
</style>
