<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

defineOptions({
  name: 'TestLandingPage',
})

import HistoryHeader from '@/components/history/HistoryHeader.vue'

import pageFooter from '@/assets/part3/background.png'
import heroTitle from '@/assets/part3/big_title.png'
import exploreButton from '@/assets/part3/button.png'
import gameButton from '@/assets/part3/button_1.png'
import exhibitionHall from '@/assets/part3/exhibition hall.png'
import gameTitle from '@/assets/part3/game.png'
import exhibitionText from '@/assets/part3/text.png'
import exhibitionTitle from '@/assets/part3/title.png'
import sectionTitle from '@/assets/part3/title_2.png'
import collectionPreview from '@/assets/part3/资源 51@3x.png'
import workshopPreview from '@/assets/part3/workshop_cover.png'
import workshopTitle from '@/assets/part3/workshop_title.png'

const gameEntries = [
  {
    to: '/bamboo-game',
    label: '点击进入竹艺连连看',
    preview: collectionPreview,
    imageTitle: gameTitle,
    titleAlt: '竹艺连连看',
  },
  {
    to: '/workshop-game',
    label: '点击进入竹艺工坊',
    preview: workshopPreview,
    imageTitle: workshopTitle,
    titleAlt: '竹艺工坊',
  },
]

const gameSectionRef = ref(null)
const gameVisible = ref(false)
let gameObserver = null

const fadeTargets = ref([])
let fadeObserver = null

const setFadeTarget = (el) => {
  if (el && !fadeTargets.value.includes(el)) {
    fadeTargets.value.push(el)
  }
}

onMounted(() => {
  if (gameSectionRef.value) {
    gameObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        gameVisible.value = true
        gameObserver?.disconnect()
      },
      {
        threshold: 0.22,
        rootMargin: '0px 0px -10% 0px',
      },
    )

    gameObserver.observe(gameSectionRef.value)
  }

  fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-fade-visible')
        fadeObserver?.unobserve(entry.target)
      })
    },
    {
      threshold: 0.18,
      rootMargin: '0px 0px -8% 0px',
    },
  )

  fadeTargets.value.forEach((el) => {
    fadeObserver?.observe(el)
  })
})

onBeforeUnmount(() => {
  gameObserver?.disconnect()
  fadeObserver?.disconnect()
})
</script>

<template>
  <div class="test-page" :style="{ backgroundImage: `url(${pageFooter})` }">
    <HistoryHeader :main-title="heroTitle" />

    <main class="landing-main">
      <div class="landing-column">
        <a
          href="https://cloud.chan3d.com/scenes/34SlFzwsRfqmLjIU0IChJU5rZSN/index.html"
          class="feature-card"
          aria-label="进入线上展厅"
        >
          <img :src="exhibitionHall" alt="竹语嘉艺线上展厅" class="feature-card__image" />

          <div class="feature-card__overlay">
            <img
              :src="exhibitionTitle"
              alt="线上展厅"
              class="feature-card__title fade-seq"
              :ref="setFadeTarget"
            />
            <img
              :src="exploreButton"
              alt="探索更多"
              class="feature-card__button fade-seq fade-delay-1"
              :ref="setFadeTarget"
            />
          </div>
        </a>

        <img
          :src="exhibitionText"
          alt="线上展厅说明"
          class="feature-copy-image"
        />

        <section
          ref="gameSectionRef"
          class="game-block"
          :class="{ 'is-visible': gameVisible }"
          aria-label="竹刻小游戏"
        >
          <img :src="sectionTitle" alt="竹刻小游戏" class="game-block__section-title" />

          <div class="game-block__entries">
            <router-link
              v-for="entry in gameEntries"
              :key="entry.to"
              :to="entry.to"
              class="game-block__entry"
              :aria-label="entry.label"
            >
              <div class="game-block__stack">
                <img :src="entry.preview" :alt="`${entry.titleAlt}预览`" class="game-block__preview" />
                <img
                  v-if="entry.imageTitle"
                  :src="entry.imageTitle"
                  :alt="entry.titleAlt"
                  class="game-block__title fade-seq"
                  :ref="setFadeTarget"
                />
                <h3
                  v-else
                  class="game-block__title game-block__text-title fade-seq"
                  :ref="setFadeTarget"
                >
                  {{ entry.textTitle }}
                </h3>
                <img
                  :src="gameButton"
                  alt="点击进入"
                  class="game-block__cta fade-seq fade-delay-1"
                  :ref="setFadeTarget"
                />
              </div>
            </router-link>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<style scoped>
@font-face {
  font-family: 'GameEntryTitle';
  src: url('@/assets/Fonts/ZiTiQuanXinYiJiXiangSong-2 字体圈欣意吉祥宋 Regular.ttf') format('truetype');
  font-display: block;
}

.test-page {
  width: 100vw;
  min-height: 100vh;
  height: 241.6435vw;
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100% auto;
  color: #f7f6f1;
  overflow-x: hidden;
}

.landing-main {
  position: relative;
  padding: 68px 0 0;
}

.landing-column {
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.feature-card {
  margin-top: 120px;
  position: relative;
  display: block;
  width: 80%;
  border-radius: 0;
  overflow: visible;
  text-decoration: none;
  box-shadow: none;
  transition: none;
}

.feature-card:hover,
.feature-card:focus-visible {
  transform: none;
  box-shadow: none;
}

.feature-card__image {
  display: block;
  width: 100%;
  height: auto;
}

.feature-card__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  padding: 0 0 66px;
  background: none;
}

.feature-card__title {
  width: 50%;
  height: auto;
  transform: translateY(-18px);
}

.feature-card__button {
  width: 180px;
  height: auto;
}

.feature-copy-image {
  width: 40%;
  margin-top: 100px;
  opacity: 0.88;
}

.game-block {
  width: 100%;
  margin-top: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 0.9s ease,
    transform 0.9s ease;
}

.game-block.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.game-block__section-title {
  width: 40%;
  height: auto;
}

.game-block__entries {
  width: 100vw;
  height: 980px;
  margin-top: 140px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 80px;
  padding: 0 120px;
  box-sizing: border-box;
}

.game-block__entry {
  position: relative;
  flex: 0 0 calc((100vw - 320px) / 2);
  height: 100%;
  display: block;
  border: 0;
  padding: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  text-decoration: none;
}

.game-block__entry:focus-visible {
  outline: none;
}

.game-block__stack {
  position: absolute;
  left: 0;
  bottom: 300px;
  width: 100%;
  transform: none;
  transition: transform 0.28s ease;
}

.game-block__entry:hover .game-block__stack,
.game-block__entry:focus-visible .game-block__stack {
  transform: translateY(-5px);
}

.game-block__preview {
  display: block;
  width: 100%;
  aspect-ratio: 1821 / 1690;
  height: calc(((100vw - 320px) / 2) * 1690 / 1821);
  object-fit: contain;
  filter: drop-shadow(0 14px 24px rgba(0, 0, 0, 0.34));
}

.game-block__title {
  position: absolute;
  left: 50%;
  top: 60%;
  width: auto;
  height: clamp(76px, 6.6vw, 128px);
  transform: translate(-50%, -50%);
  max-width: 72%;
  object-fit: contain;
  z-index: 2;
}

.game-block__text-title {
  margin: 0;
  width: 72%;
  color: rgb(205, 232, 229);
  font-family: 'GameEntryTitle', serif;
  font-size: clamp(46px, 4.4vw, 82px);
  font-weight: 400;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
}

.game-block__cta {
  position: absolute;
  left: 50%;
  top: 80%;
  transform: translate(-50%, -50%);
  display: block;
  width: 180px;
  height: auto;
  z-index: 2;
}

@media (max-width: 900px) {
  .game-block__entries {
    height: auto;
    min-height: 980px;
    flex-direction: column;
    align-items: center;
    gap: 64px;
    padding: 0 24px 120px;
  }

  .game-block__entry {
    width: min(86vw, 560px);
    height: 520px;
    flex: none;
  }

  .game-block__stack {
    bottom: 0;
  }

  .game-block__preview {
    height: calc(min(86vw, 560px) * 1690 / 1821);
  }
}

.game-block__playground {
  width: 100%;
  margin-top: 40px;
  overflow: hidden;
  background: #030303;
}

.game-swap-enter-active,
.game-swap-leave-active {
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
}

.game-swap-enter-from,
.game-swap-leave-to {
  opacity: 0;
  transform: translateY(18px);
}

/* 新增：只给指定元素做依次渐显，不碰父级原有渐显 */
.fade-seq {
  opacity: 0;
  transition:
    opacity 0.85s ease,
    filter 0.85s ease;
  will-change: opacity;
}

.fade-seq.is-fade-visible {
  opacity: 1;
}

.fade-delay-1 {
  transition-delay: 0.28s;
}
</style>

<!-- <style>
.test-page .game-block__playground .link_part {
  width: 100%;
  min-width: 0;
  height: 58vw;
  min-height: 680px;
  max-height: 100vh;
}

.test-page .game-block__playground .game-board {
  width: 66%;
  padding-left: 6%;
}

.test-page .game-block__playground .cell {
  width: 100px;
  height: 100px;
  margin: 20px;
}

.test-page .game-block__playground .cell-halo {
  width: 130px;
  height: 130px;
}

.test-page .game-block__playground .game_header {
  right: 6%;
}

.test-page .game-block__playground .main_title {
  font-size: 100px;
}

.test-page .game-block__playground .time-label {
  font-size: 14px;
}

.test-page .game-block__playground .time-value {
  width: auto;
  min-width: 72px;
  margin-right: 50px;
  font-size: 40px;
}

.test-page .game-block__playground .reset-btn {
  width: 80px;
  font-size: 26px;
}

.test-page .game-block__playground .tip {
  display: none;
}

.test-page .game-block__playground .side_title {
  font-size: 40px;
  letter-spacing: 15px;
}
</style> -->
