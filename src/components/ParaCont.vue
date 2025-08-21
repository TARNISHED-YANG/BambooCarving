<template>
  <!-- 背景容器 -->
  <div
    class="paracont"
    ref="bgRef" 
    :style="{ 
      'background-image': `url(${bgSrc})`,  // 背景图片
      'background-position-y': positionY + 'px',  // 背景 Y 轴偏移量
      height: height + 'vh'  // 容器高度
    }"
  >
    <slot></slot> <!-- 插槽，可以在背景上放文字或其他内容 -->
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

// ------------------- Props -------------------
// 用于传入组件外部参数
const props = defineProps({
  bgSrc: { type: String, required: true },   // 背景图片路径
  height: { type: Number, default: 500 },   // 背景高度，默认500px
  speed: { type: Number, default: 0.5 }     // 视差速度比例，默认0.5
});

// ------------------- 响应式变量 -------------------
const positionY = ref(0);  // 当前背景 Y 轴偏移量
const bgRef = ref(null);   // 背景元素的引用
const Y0 = ref(0);         // 初始背景位置（offsetTop * speed）

// ------------------- 滚动事件处理 -------------------
const handleScroll = () => {
  // 获取滚动条距离顶部的距离
  const scrollTop =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop;

  // 计算当前背景位置，实现视差滚动
  positionY.value = Y0.value - scrollTop * props.speed;
};

// ------------------- 生命周期 -------------------
onMounted(() => {
  // 页面挂载完成后，获取背景元素的初始位置
  if (bgRef.value) {
    Y0.value = bgRef.value.offsetTop * props.speed;  // 初始位置乘以速率比例
  }
  // 注册滚动监听，每次滚动都更新背景位置
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  // 组件卸载前移除滚动监听，防止内存泄漏
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
/* 背景容器样式 */
.paracont {
  width: 100%;                 /* 宽度100% */
  background-repeat: no-repeat; /* 背景不重复 */
  background-attachment: fixed; /* 背景固定，实现视差滚动，非常重要 */
  background-size: cover;       /* 背景覆盖整个容器 */
  position: relative;           /* 相对定位 */
  overflow: hidden;             /* 隐藏溢出部分 */
  display: flex;
  justify-content: center;
  align-items: center;
  
}
</style>
