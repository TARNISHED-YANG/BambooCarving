<!-- 这是节点组件，左边用left，右边用right控制组件形态 -->
<script setup>
import { ref , onMounted} from 'vue'
 defineProps({
  // 位置属性
  x: Number,
  y: Number,
  id: Number,
  // 控制组件形态：'left' 或 'right'
  position: { type: String, required: true, validator: (val) => ['left', 'right'].includes(val) },
  // 图片和文本属性
  TimeImg: { type: String, required: true },
  WorkImg: { type: String, required: true },
  NameImg: { type: String, required: true },
  CeleIntro: { type: String, required: true },
})

const rectRef = ref(null)
// const timeImgRef = ref(null)
// const workImgRef = ref(null)
// const nameImgRef = ref(null)
onMounted(() => {
  // 使用 requestAnimationFrame 触发淡入
  setTimeout(() => {
    if (rectRef.value) {
      rectRef.value.style.opacity = 1
    }
  }, 50)
})
</script>

<template>
  <div
    ref="rectRef"
    class="rect"
    :class="{ 'rect-left': position === 'left', 'rect-right': position === 'right' }"
    :style="{
      top: y + 'px',
      ...(position === 'left' ? { left: x + 'px' } : {}),
      opacity:0,
      transition: 'opacity 1s ease',
      zIndex:10
    }"
  >
    <!-- 左侧布局结构 -->
    <template v-if="position === 'left'">
      <img :src="TimeImg" alt="时间" class="time_img" />
      <img :src="WorkImg" alt="作品" class="work_img" />
      <div class="name_part">
        <img :src="NameImg" alt="名称" class="name_img" />
        <p class="cele_intro">{{ CeleIntro }}</p>
      </div>
    </template>

    <!-- 右侧布局结构 -->
    <template v-if="position === 'right'">
      <div class="images_part">
        <img :src="TimeImg" alt="时间" class="time_img" ref="timeImgRef" />
        <img :src="WorkImg" alt="作品" class="work_img" ref="workImgRef" />
        <img :src="NameImg" alt="名称" class="name_img" ref="nameImgRef" />
      </div>
      <p class="cele_intro">{{ CeleIntro }}</p>
    </template>
  </div>
</template>

<style scoped>
.rect {
  position: absolute;
  /* opacity: 0;
  transition: opacity 1s ease; */
  z-index: 10;
  padding: 0;
  box-sizing: border-box;
}

/* 左侧布局样式 */
.rect-left {
  width: calc(100vw * 803 / 1440);
  height: calc(100vw * 0.2);
  display: flex;
  align-items: flex-end;
}

.rect-left .time_img {
  margin-right: 15px;
  width: 20.51%;
  height: auto;
}

.rect-left .work_img {
  margin-right: 20px;
  height: 96.18%;
  width: auto;
}

.rect-left .name_part {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  gap: 35px;
  align-items: flex-start;
}

/* 右侧布局样式 */
.rect-right {
  left: 50%;
  transform: translateX(-50%);
  min-height:auto;
  display: flex;
  flex-direction: column;
  gap: 35px;
  width:max-content;
  max-width: 100%;
}

.rect-right .images_part {
  display: flex;
  align-items: flex-end;
  gap: 15px;
  width:max-content;
}

.rect-right .time_img {
  width: 164.7px;
  height: auto;
}

.rect-right .work_img {
  height: 277px;
  width: auto;
}

/* 共用样式 */
.name_img {
  height: 44.5px;
  width: auto;
  object-fit: contain;
}

.cele_intro {
  font-size: 12px;
  line-height: 18px;
  text-indent: 2em;
  color: #fff;
  margin: 0;
  white-space: pre-line; /* 使换行符生效 */
}
.rect-right .cele_intro {
  max-width: calc(100vw * 0.35);/*这里后续还是要改动的，导致最后不那么精致*/
}
</style>
