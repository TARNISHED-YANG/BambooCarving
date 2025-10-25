<template>
  <ToolBar class="tool_bar"></ToolBar>
  <InteractionArea></InteractionArea>
  <LinkGame></LinkGame>
</template>

<script setup>
import ToolBar from '@/components/game/ToolBar.vue';
import InteractionArea from '@/components/game/InteractionArea.vue';
import LinkGame from '@/components/game/LinkGame.vue'
</script>

<style scoped>
.tool_bar
{
  margin-top:100px;
}
</style>
