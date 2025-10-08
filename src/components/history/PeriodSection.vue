<!-- 这是每个朝代展示部分 -->
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
})
</script>

<template>
  <button @click="togglePopup" class="works_btn">查看更多</button>
  <PeriodPopup
    v-if="showPopup"
    @closePopup="togglePopup"
    :period="period_info"
    :icons="icons_info"
  />
</template>

<style scoped>
.works_btn {
  padding: 12px 24px;
  font-size: 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
