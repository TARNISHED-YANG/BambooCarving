<template>
    <div class="gallery">
        <h3>Bamboo Carving</h3>

        <div class="grids">
            <div v-for="item in items"
            :key="item.id"
            class ="card"
            >
                <img 
                :src="item.image"
                :alt="'作品'+item.id"
                loading="lazy"
                class = "pic"
                >
                </img>
                <div class="meta">
                    <div class="title">{{ item.id }}</div>
                    <div class="sub">{{ item.category }}</div>
                </div>
            </div>
        </div>

        <div v-if ="items.length === 0" class="empty">暂无图片</div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
const items =ref([])
const items_test =[
{
    id:1,
    image:new URL('@/assets/Demo1/work1.png',import.meta.url).href,
    category:'花鸟'
},
{
    id:2,
    image:new URL('@/assets/Demo1/work2.png',import.meta.url).href,
    category:'鱼虫'
},
{
    id:3,
    image:new URL('@/assets/Demo1/work3.png',import.meta.url).href,
    category:'牛马'
},
{
    id:4,
    image:new URL('@/assets/Demo1/work2.png',import.meta.url).href,
    category:'鱼虫'
},
{
    id:5,
    image:new URL('@/assets/Demo1/work3.png',import.meta.url).href,
    category:'牛马'
}
]
// load everything for test
onMounted(async()=>{
    const res = await fetch("http://127.0.0.1:5000/api/images")
    items.value = await res.json()
})

</script>

<style scoped>
.gallery{
    padding:12px;
    max-width: 1300px;
    min-width: 1000px;
    margin:0 auto;
    background-color: aqua;
}

h3{
    margin: 0 0 12px 0;
}

.grids{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 10px;
    justify-items: center;
}

.card{
    background-color: #000;
    border: 1px solid #eee;
    border-radius: 6px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 240px;
    width: 240px;
}
.pic{
    height: 80%;
    width: auto;
    object-fit: contain;
    margin-bottom: -10px;
}
.meta{
    font-size: 1rem;
    color: wheat;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap:4px;
}
.empty {
  grid-column: 1 / -1;
  text-align: center;
  color: #999;
  padding: 24px;
}
</style>