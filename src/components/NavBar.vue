<template>
    <nav class = "NavBar">
        <ul>
            <li><router-link to="/">测试</router-link></li>
            <li><router-link to="/lab">实验室</router-link></li>
            <li><router-link to="/show">展示</router-link></li>
        </ul>
    </nav>
</template>

<script setup>

</script>

<style scoped>
.NavBar{
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height: 50px;
    background-color: black;
    color: white;
    padding:0px 0px;
    z-index:100;
}
.NavBar ul{
    list-style: none;
    margin:0;
    padding:0;
    display:flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    gap:200px;
}
.NavBar a{
    color:white;
    text-decoration: none;
    font-weight: bold;
}
.NavBar a:hover {
  text-decoration: underline;
}
</style>