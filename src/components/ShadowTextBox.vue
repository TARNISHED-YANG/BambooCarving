<script setup>
import { computed } from 'vue';
const props =defineProps({
  text: { type: String, default: "怎么没文本" },// 接收文本参数
  direct: { type: String, default: "left" }, // left 或 right
  name:{type:String,default:"杨宇哲"},//姓名
  time:{type:String,default:"0"}//出生年月日
})
const boxStyle = computed(() => {
  return props.direct === "left"
    ? { left: '6.18%', right: 'auto' }
    : { right: '6.18%', left: 'auto' }
})
const nameStyle =computed(() => {
  return props.direct === "left"
    ? { 'margin-left': '5%', 'margin-right': 'auto' }
    : { 'margin-right': '0%', 'margin-left': 'auto' }
})
</script>

<template>
    <div class="shadow_box">
        <div class="skew_bar"></div>
        <div class="text_box" :style="boxStyle">
          <div class="name_time" :style="nameStyle">
            <template v-if="props.direct === 'left'">
              <span class="name" >{{ name }}</span>
              <span class="time" >{{ time }}</span>
            </template>
            <template v-else>
              <span class="time" >{{ time }}</span>
              <span class="name">{{ name }}</span>
            </template>
          </div>
          <div class="intro">{{ text }}</div>
        </div>
       

    </div>
</template>

<style scoped>
.shadow_box{
    position: relative;  
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden; /* 防止倾斜条超出容器 */
}
.skew_bar {
  position: absolute;
  width: 200%;                   /* 占容器宽度一半 */
  height: 57%;                 /* 高度占满容器 */
  background-color: rgba(0, 0, 0, 0.5); /* 半透明黑色 */
  transform: rotate(-5deg);     /* 倾斜 5 度 */
  top: 20%;
  z-index: 0;                   /* 背景在文字下方 */
}
.text_box{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  max-width: 61.8%;          /* 最大宽度，避免文字贴边 */
}
.intro{
  position: relative; 
  color: white;              /* 文字颜色白色 */
  text-align: justify;        /*两段对齐*/
  font-size: 1.3rem;           /* 字体大小 */

  margin: 0 auto;            /* 自动水平居中 */
  line-height: 1.6;          /* 增加行高，阅读更舒适 */
  padding: 0 20px;           /* 给左右增加一些内边距，防止在窄屏上紧贴边缘 */
  word-wrap: break-word;      /* 遇到长单词或链接自动换行 */
  box-sizing: border-box;    /* 让 padding 包含在宽度内 */
  z-index: 2;
}
.name_time {
  width:30%;
  position: relative;  
  display: flex;           /* 横向排列 */
  align-items: flex-end;   /* 底部对齐 */
  z-index: 1;
}

.name {
  font-size: 4rem;       /* 名字字号 */
  color:white;
}

.time {
  font-size: 1rem;      
  color: white;            
}

</style>