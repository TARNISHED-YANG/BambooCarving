import { createRouter, createWebHistory } from 'vue-router'
import test from "../views/test.vue"
import lab from "../views/lab.vue"
import show from "@/views/show.vue"
const routes = [
  { path: '/', component: test },
  { path: '/lab', component: lab },
  { path: '/show', component: show },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
