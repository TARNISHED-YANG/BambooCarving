<!-- 这是每个时期查看更多按钮 -->
<script setup>
import { ref } from 'vue'
import PeriodPopup from '@/components/history/PeriodPopup.vue'
const showPopup = ref(false)
const togglePopup = () => {
  showPopup.value = !showPopup.value
}
 defineProps({
  period_info: {
    type: Object,
    required: true,
  }, //同时期数组
  icons_info: {
    type: Object,
    required: true,
  }, //弹窗通用图标
  topDistance:{
    type: Number,
    required:true
  }//查看更多按钮到顶部的距离
})
</script>

<template>
  <button
  @click="togglePopup"
  class="works_btn"
  :style="{top:topDistance+'px'}">查看更多</button>
  <PeriodPopup
    v-if="showPopup"
    @closePopup="togglePopup"
    :period="period_info"
    :icons="icons_info"
  />
</template>

<style scoped>
.works_btn {
  position:absolute;
  right:8.3%;/*120px*/
  height:40px;

  padding: 0 24px;
  font-size: 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  box-sizing: border-box; /* 确保 padding 不影响宽度，避免按钮被挤出 */
  line-height: 40px;
}
</style>
