<template>
    <div class="inter_area"
    @dragover.prevent
    @drop="onDrop"
    >
      <p>把工具拖到这里哈</p>
      <img :src="currentImage" class="bamboo_img" />
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
const gameStep = ref(1) //State Machine
const isPlayingGif = ref(false) // 是否处于过渡动画中

const currentImage = computed(() => {
  return isPlayingGif.value 
    ? stepAssets[gameStep.value].gif 
    : stepAssets[gameStep.value].static
})

// 定义每个关卡的静态图和过渡 GIF
const stepAssets = {
  1: {
    static: new URL("@/assets/Demo1/bg0.jpg", import.meta.url).href,
    gif: new URL("@/assets/GIF.gif", import.meta.url).href
  },
  2: {
    static: new URL("@/assets/Demo1/bg1.png", import.meta.url).href,
    gif: new URL("@/assets/GIF.gif", import.meta.url).href
  },
  3: {
    static: new URL("@/assets/Demo1/bg2.png", import.meta.url).href,
    gif: new URL("@/assets/GIF.gif", import.meta.url).href
  }
}

function onDrop(event){
    event.preventDefault()
    const obj = event.dataTransfer.getData("text/plain")
    console.log("接收到拖拽：", obj)

    if (gameStep.value === 1 && obj === "A") 
    {
    console.log("✅ 第一步成功，播放 GIF")
    isPlayingGif.value = true
    setTimeout(() => {
      isPlayingGif.value = false
      gameStep.value = 2
      console.log("进入第二步！")
    }, 2000) 
    } 
    else 
    {
    console.log("❌ 错误的工具，请重新尝试")
    }
}

function preloadImages(images) {
  Object.values(images).forEach(state => {
    Object.values(state).forEach(src => {
      const img = new Image()
      img.src = src
    })
  })
}

onMounted(() => {
  preloadImages(stepAssets)
})


</script>
<style scoped>
.inter_area{
    height: 40vh;
    width: 30vw;
    background-color: palegoldenrod;
}
.bamboo_img
{
    object-fit: contain;
    width: 100%;
    height: 100%;
}

</style>