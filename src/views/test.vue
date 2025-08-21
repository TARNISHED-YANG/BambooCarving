<script setup>
import CharaBox from "../components/CharaBox.vue"
import Img1 from "@/assets/test.jpg"
import Img2 from "@/assets/test.jpg"
import Img3 from "@/assets/test.jpg"


// 角色信息数组
const characters = [
  { text: "这是角色 1 的介绍", imgSrc: Img1 },
  { text: "这是角色 2 的介绍", imgSrc: Img2 },
  { text: "这是角色 3 的介绍", imgSrc: Img3 },
]
</script>

<template>
  <div class="chara-list">
    <CharaBox
      v-for="(chara, index) in characters"
      :key="index"
      :text="chara.text"
      :imgSrc="chara.imgSrc"
    />
  </div>
</template>

<style scoped>
    .chara-list{
        margin-top:50px;
    }
</style>
