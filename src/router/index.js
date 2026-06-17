import { createRouter, createWebHistory } from 'vue-router'
import test from "@/views/test.vue"
import lab from "@/views/lab.vue"
import show from "@/views/show.vue"
import history from "@/views/history.vue"
import bambooGame from "@/views/bambooGame.vue"
import workshopGame from "@/views/workshopGame.vue"

const routes = [
  { path: '/', component: test },
  { path: '/lab', component: lab },
  { path: '/show', component: show },
  { path: '/history', component: history },
  { path: '/bamboo-game', component: bambooGame },
  { path: '/workshop-game', component: workshopGame }
]

const router = createRouter({
  // 这里加上仓库名作为基础路径，如果你的仓库名是 my-vue-site，就写 '/my-vue-site/'
  history: createWebHistory('/BambooCarving/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    return {
      left: 0,
      top: 0,
      behavior: 'auto',
    }
  }//保证每个界面从头开始
})

export default router
