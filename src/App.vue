<script setup>
  import NavBar from "./components/NavBar.vue";
  import { onMounted } from "vue";

onMounted(() => {
  // 引入 SDK
  const script = document.createElement("script");
  script.src = "https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.2.0-beta.10/libs/cn/index.js";
  script.async = true;
  /*
userInfo: {
      id: '12345',
      url: 'https://lf-coze-web-cdn.coze.cn/obj/coze-web-cn/obric/coze/favicon.1970.png',
      nickname: 'UserA',
    },
  */
  script.onload = () => {
    // 初始化 Coze WebChat 悬浮窗
    new window.CozeWebSDK.WebChatClient({
      config: {
        bot_id: "7487948961794293801", // 换成你的 bot id
      },
      componentProps: {
        title: "竹刻问答系统",   // 窗口标题
      },
      auth: {
          type: "token",
          token: "pat_WFdN8PdmWGs4pSXAF54je0zMLdvEqssrMOPyYsefvSJDGW379Do2oM8OR5D63kZ2", // 直接写死 PAT（仅测试用）
          onRefreshToken: function () {
            return "pat_WFdN8PdmWGs4pSXAF54je0zMLdvEqssrMOPyYsefvSJDGW379Do2oM8OR5D63kZ2"; // 测试时写死，后续要改成后端获取
          },
      },
      ui: {
      base: {
          icon: 'https://static.vecteezy.com/system/resources/previews/020/816/485/original/portfolio-icon-for-your-website-mobile-presentation-and-logo-design-free-vector.jpg',
          layout: 'pc',
          zIndex: 1000,
      }
    },
    });
  };
  document.body.appendChild(script);
});
</script>

<template>
   <div id="app">
    <NavBar /> 
    <router-view /> 
  </div>
</template>

<style>
body, html {
  margin: 0;
  padding: 0;
}
</style>