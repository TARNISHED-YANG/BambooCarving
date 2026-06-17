<script setup>
import LinkGame from '@/components/game/LinkGame.vue'
</script>

<template>
  <main class="bamboo-game-page" aria-label="竹艺连连看小游戏">
    <LinkGame />
  </main>
</template>

<style scoped>
.bamboo-game-page {
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  background: #030303;
}
</style>
