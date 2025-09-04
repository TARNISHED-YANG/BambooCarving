<template>
  <ToolBar class="tool_bar"></ToolBar>
  <InteractionArea></InteractionArea>
</template>

<script setup>
import ToolBar from '@/components/game/ToolBar.vue';
import InteractionArea from '@/components/game/InteractionArea.vue';
</script>

<style scoped>
.tool_bar
{
  margin-top:100px;
}
</style>
