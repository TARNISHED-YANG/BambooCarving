<script setup>
import CirPic1 from "@/components/CirPic.vue";

import WImg1 from "@/assets/Demo1/work1.png";
import WImg2 from "@/assets/Demo1/work2.png";
import WImg3 from "@/assets/Demo1/work3.png";
import WImg4 from "@/assets/Demo1/work4.png";

const imgs   = [WImg1, WImg2, WImg3, WImg4];
const names  = ["作品1", "作品2", "作品3", "作品4"];
const datas  = ["尺寸1", "尺寸2", "尺寸3", "尺寸4"];
const intros = [
  "作品1介绍...",
  "作品2介绍...",
  "作品3介绍...",
  "作品4介绍..."
];
</script>

<template>
  <div class="CirPic">
    <CirPic1
      :imgs="imgs"
      :names="names"
      :datas="datas"
      :intros="intros"
      :mainHeightVh="60"
      :smallRatio="0.285"
    />
  </div>
</template>

<style scoped>
.CirPic {
  margin-top: 100px;
  margin-left: 100px;
}
</style>
