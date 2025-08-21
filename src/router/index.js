import { createRouter, createWebHistory } from 'vue-router'
import test from "@/views/test.vue"
import lab from "@/views/lab.vue"
import show from "@/views/show.vue"

const routes = [
  { path: '/', component: test },
  { path: '/lab', component: lab },
  { path: '/show', component: show },
]

const router = createRouter({
  // 这里加上仓库名作为基础路径，如果你的仓库名是 my-vue-site，就写 '/my-vue-site/'
  history: createWebHistory('/BambooCarving/'),
  routes
})

export default router
