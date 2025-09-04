<template>
    <div class="tool_bar">
        <button
        v-for = "tool in tools"
        :key = "tool.id"
        class = "tool"
        type = "button"
        draggable="true"
        @dragstart="onDragStart($event, tool)"
        :aria-label="`拖拽 ${tool.name} 到交互区`"
        title="按住拖拽到交互区"
        >
            <img :src="tool.icon" :alt="tool.name" class="tool_icon" draggable="false" />
            <span class="name">{{ tool.name }}</span>
    </button>
    </div>
</template>

<script setup>
const props = defineProps({
  tools: {
    type: Array,
    default: () => ([
      {
        id: '1',
        name: 'A',
        // 下面写法在 Vite 中可把本地图片打包为 URL；请替换为你的实际资源
        icon: new URL('@/assets/Demo1/work1.png', import.meta.url).href,
      },
      {
        id: '2',
        name: 'B',
        icon: new URL('@/assets/Demo1/work2.png', import.meta.url).href,
      },
      {
        id: '3',
        name: 'C',
        icon: new URL('@/assets/Demo1/work3.png', import.meta.url).href,
      },
    ]),
  },
});

const tools = props.tools;

function onDragStart(e, tool) {
  e.dataTransfer.setData("text/plain", tool.name)  // 用 e，不要用全局 event
  console.log("开始拖拽：", tool.name)
}

</script>

<style scoped>
.tool_bar
{
    width: 100vw;
    height: 30vh;
    background-color: palegoldenrod;
    display: flex;
    justify-content: center; 
    align-items: center; 
    gap:20px;

}
.tool{
    display: flex;
    flex-direction: column;

    align-items: center;
    border: 1px solid #ccc;
    border-radius: 10px;
    background: #fff;
    cursor: grab;
    width: 25vw;            /* 统一按钮大小 */
}
.tool_icon
{
    width: 90%;
    height: auto;
    object-fit: contain;
}
</style>
