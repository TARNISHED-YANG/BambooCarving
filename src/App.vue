<script setup>
  import NavBar from "./components/NavBar.vue";
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