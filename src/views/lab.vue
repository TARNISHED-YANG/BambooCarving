<script setup>
import HistoryHeader from '@/components/history/HistoryHeader.vue'
import labMainTitle from '@/assets/part2/big_title.png'
// import ParaCont from '@/components/ParaCont.vue';
// import BgImg1 from "@/assets/Demo1/bg1.png"
// import BgImg2 from "@/assets/Demo1/bg2.png"
// import ShadowTextBox from '@/components/ShadowTextBox.vue';
// import CirPic1 from '@/components/CirPic.vue';
// import WImg1 from "@/assets/Demo1/work1.png";
// import WImg2 from "@/assets/Demo1/work2.png";
// import WImg3 from "@/assets/Demo1/work3.png";
// import WImg4 from "@/assets/Demo1/work4.png";
// import First_bg from "@/assets/Demo1/bg0.jpg";
// // 准备数据数组，每个元素对应一个 ParaCont
// // 速度为 1 则随页面静止不动，0 则类似固定不动
// const paraItems = [
//   { text: '明代书画家、竹刻家。字清父，号小松，南直隶松江府嘉定（今属上海）人，居清镜塘。朱鹤子。貌古神清，自幼受家庭熏陶，工小篆及行草，画尤长于气韵，长卷小幅，各有异趣。间仿王摩诘（维）诸名家，云树纡曲盘折，尽属化工',
//     name:"朱缨",time:"（1520—1587）",
//    bg: BgImg1, height: 90, speed: 0.3,direct: "left"},
//   { text: '字晋瞻，号芷岩、雪樵，清早期嘉定竹刻转型发展的关键人物。他将南宗绘画技法融入竹刻，首创“以刀代笔”的雕刻技法，开创了文人艺术与工艺美术融合的新境界，被尊为“中国竹刻史上的里程碑式人物”。',
//   name:"周颢",time:"（1685-1773）",
//   bg: BgImg2, height: 90, speed: 0.3,direct: "right"},
// ];

// const imgs   = [WImg1, WImg2, WImg3, WImg4];
// const names  = ["竹根雕折枝蟠桃摆件", "竹根雕八仙乘槎摆件", "竹根雕佛手摆件", "竹根雕牧童戏牛摆件"];
// const datas  = ["【清早期】10cm", "【清】20cm", "【清】12cm", "【明末清初】12cm"];
// const intros = [
//   "取竹根为材，依势刻大蟠桃，以竹鞭作桃枝虬屈处极尽天然之美，桃身一枝环绕，桃叶若迎风作卷舒之状，极类清三代珐琅彩瓷器上工笔画法，一小枝回折上附二小桃。下承一异形乌木座，依形相配线条流畅，一黑一黄相得益彰。",
//   "此竹根雕成槎形。槎，为带枝杈的枯木，可漂浮水上，载人而行。此摆件以圆雕、浮雕、透雕等技法雕刻。八仙人物手持各式法器，形态各异，神态万千。槎的造型如神龙摆尾，飘若游龙。槎下原配乌木底座，海浪翻涌成漩，水浪纹层次分明，细入末毫，似在激流中航行，乘风破浪。",
//   "此件依照竹根天然形制，将光滑的细竹根与糙涩的粗竹根巧妙组合，运用圆雕、透雕等技艺，将果实、茎叶琢刻得惟妙惟肖，佛手上棕点麻皮表现逼真，弯折掩映深浅多变，从不同角度观赏皆有不同效果，极具古典之天然意趣，属于清早期嘉定竹雕作品。",
//   "此竹根雕牧童戏牛摆件，构思巧妙。牧牛二小童，一趴卧牛背，翘首向天若睹浮云飞鸟，一欲攀牛首而上，双手握其角右足抵牛额，仰首相呼。牛则侧首略屈左前脚。小童之天真顽皮，水牛之憨态呼之欲出，使人观之如在眼前几欲忘为雕刻矣！"
// ];
import { onBeforeUnmount, onMounted, ref } from 'vue'

import pageBackground from '@/assets/part2/background.png'
import titleImage from '@/assets/part2/title_1.png'

import work1 from '@/assets/part2/1.png'
import work2 from '@/assets/part2/2.png'
import work3 from '@/assets/part2/3.png'
import work4 from '@/assets/part2/4.png'
import qrCode1 from '@/assets/part2/mini program code_1.jpg'
import qrCode2 from '@/assets/part2/mini program code_2.jpg'
import qrCode3 from '@/assets/part2/mini program code_3.jpg'
import qrCode4 from '@/assets/part2/mini program code_4.jpg'

import illustration1 from '@/assets/part2/illustration_1.png'
import illustration1Hover from '@/assets/part2/illustration_1_1.png'
import illustration2 from '@/assets/part2/illustration_2.png'
import illustration2Hover from '@/assets/part2/illustration_2_1.png'
import illustration3 from '@/assets/part2/illustration_3.png'
import illustration3Hover from '@/assets/part2/illustration_3_1.png'
import illustration4 from '@/assets/part2/illustration_4.png'
import illustration4Hover from '@/assets/part2/illustration_4_1.png'
import illustration5 from '@/assets/part2/illustration_5.png'
import illustration5Hover from '@/assets/part2/illustration_5_1.png'

const works = [
  {
    src: work1,
    qrCode: qrCode1,
    name: '《清无款竹雕采药老人》',
    alt: '清无款竹雕采药老人',
  },
  {
    src: work2,
    qrCode: qrCode2,
    name: '《竹雕蜂猴笔架》',
    alt: '竹雕蜂猴笔架',
  },
  {
    src: work3,
    qrCode: qrCode3,
    name: '《“三松泉石”竹雕松树纹笔筒》',
    alt: '三松泉石竹雕松树纹笔筒',
  },
  {
    src: work4,
    qrCode: qrCode4,
    name: '《竹根雕三多如意》',
    alt: '竹根雕三多如意',
  },
]

const createIllustration = (
  src,
  hoverSrc,
  alt,
  offset,
  baseWidth,
  baseHeight,
  hoverWidth,
  hoverHeight,
) => ({
  src,
  hoverSrc,
  alt,
  offset,
  baseRatio: Number((baseWidth / baseHeight).toFixed(6)),
  hoverRatio: Number((hoverWidth / hoverHeight).toFixed(6)),
})

const illustrations = [
  createIllustration(illustration1, illustration1Hover, '圆雕工艺', '70px', 1696, 4739, 4130, 4738),
  createIllustration(illustration2, illustration2Hover, '浮雕工艺', '0px', 1697, 4738, 4130, 4738),
  createIllustration(illustration3, illustration3Hover, '阴刻工艺', '70px', 1697, 4738, 4138, 4738),
  createIllustration(illustration4, illustration4Hover, '透雕工艺', '0px', 1696, 4739, 4130, 4738),
  createIllustration(illustration5, illustration5Hover, '留青工艺', '70px', 4131, 4738, 4131, 4739),
]

const titleRef = ref(null)
const titleVisible = ref(false)
const activeIllustration = ref(null)
const lastIllustrationIndex = illustrations.length - 1
const collapsedEdgeRatio = illustrations[0].baseRatio
const baseWidthRatios = illustrations.map((item) => item.baseRatio)
const basePrefixRatios = baseWidthRatios.reduce((list, ratio, index) => {
  const prev = index === 0 ? 0 : list[index - 1] + baseWidthRatios[index - 1]
  list.push(prev)
  return list
}, [])
const baseTotalRatio = baseWidthRatios.reduce((sum, ratio) => sum + ratio, 0)

let observer = null

const setActiveIllustration = (index) => {
  activeIllustration.value = index
}

const clearActiveIllustration = () => {
  activeIllustration.value = null
}

const handleIllustrationFocusOut = (event) => {
  if (event.currentTarget.contains(event.relatedTarget)) return
  clearActiveIllustration()
}

const getCurrentWidthRatios = () => {
  const widths = [...baseWidthRatios]
  const activeIndex = activeIllustration.value

  if (activeIndex === null) return widths

  const activeItem = illustrations[activeIndex]
  const expansionDelta = activeItem.hoverRatio - activeItem.baseRatio

  widths[activeIndex] = activeItem.hoverRatio

  if (activeIndex < lastIllustrationIndex) {
    widths[lastIllustrationIndex] = Math.max(
      illustrations[lastIllustrationIndex].baseRatio - expansionDelta,
      collapsedEdgeRatio,
    )
  }

  return widths
}

const getCurrentPrefixRatio = (widths, index) =>
  widths.slice(0, index).reduce((sum, ratio) => sum + ratio, 0)

const isCompressedEdgeCard = (index) => {
  const widths = getCurrentWidthRatios()
  return widths[index] < illustrations[index].baseRatio
}

const getIllustrationStyle = (item, index) => {
  const widths = getCurrentWidthRatios()
  const currentTotalRatio = widths.reduce((sum, ratio) => sum + ratio, 0)
  const currentPrefixRatio = getCurrentPrefixRatio(widths, index)
  const shiftRatio =
    currentPrefixRatio -
    currentTotalRatio / 2 -
    (basePrefixRatios[index] - baseTotalRatio / 2)
  const isActive = activeIllustration.value === index

  return {
    '--offset': item.offset,
    '--slot-ratio': item.baseRatio,
    '--shift-x': `calc(${shiftRatio} * var(--panel-height))`,
    '--visual-scale-x': widths[index] / item.baseRatio,
    '--visual-counter-scale-x': item.baseRatio / widths[index],
    '--media-width': `${(widths[index] / item.baseRatio) * 100}%`,
    '--raise-y': isActive ? '-12px' : '0px',
    zIndex: isActive ? 20 : 1,
  }
}

onMounted(() => {
  if (!titleRef.value) return

  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return
      titleVisible.value = true
      observer?.disconnect()
    },
    {
      threshold: 0.35,
      rootMargin: '0px 0px -8% 0px',
    },
  )

  observer.observe(titleRef.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>

  <div class="lab-page" :style="{ backgroundImage: `url(${pageBackground})` }">
    <HistoryHeader :main-title="labMainTitle" />

    <main class="lab-content">


      <section class="works-section" aria-label="作品展示">
        <div class="works-row">
          <article v-for="item in works" :key="item.alt" class="work-card">
            <div class="work-visual" tabindex="0">
              <img :src="item.src" :alt="item.alt" class="work-image" />
              <img :src="item.qrCode" :alt="`${item.alt}二维码`" class="work-qr" />
            </div>
            <p class="work-name">{{ item.name }}</p>
          </article>
        </div>
      </section>

      <section class="teaching-section" aria-label="嘉定竹刻教学">
        <div ref="titleRef" class="title-box" :class="{ 'is-visible': titleVisible }">
          <img :src="titleImage" alt="嘉定竹刻教学" class="title-image" />
        </div>

        <div
          class="illustration-row"
          @mouseleave="clearActiveIllustration"
          @focusout="handleIllustrationFocusOut"
        >
          <article
            v-for="(item, index) in illustrations"
            :key="item.alt"
            class="illustration-card"
            :class="{
              'is-active': activeIllustration === index,
              'is-compressed-edge': isCompressedEdgeCard(index),
            }"
            :style="getIllustrationStyle(item, index)"
            tabindex="0"
            @mouseenter="setActiveIllustration(index)"
            @focus="setActiveIllustration(index)"
          >
            <div class="illustration-card__visual">
              <div class="illustration-card__media">
                <img :src="item.src" :alt="item.alt" class="illustration-image illustration-image--base" />
                <img
                  :src="item.hoverSrc"
                  alt=""
                  aria-hidden="true"
                  class="illustration-image illustration-image--hover"
                />
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  </div>
  <!-- <div class="CirPic_box" :style="{ backgroundImage: `url(${First_bg})`}">
    <CirPic1 class="CirPic"
    :imgs="imgs"
    :names="names"
    :datas="datas"
    :mainHeightVh="60"
    :intros="intros"
    ></CirPic1>
  </div>
  <div class="Para">
    <ParaCont
      v-for="(item, index) in paraItems"
      :key="index"
      :bg-src="item.bg"
      :height="item.height"
      :speed="item.speed"
    >
      <ShadowTextBox
      :text="item.text"
      :name="item.name"
      :time="item.time"
      class="shadow_box"
      :direct="item.direct"></ShadowTextBox>
    </ParaCont>
  </div> -->
</template>

<style scoped>
@font-face {
  font-family: 'WorkNameTitle';
  src: url('@/assets/Fonts/ZiTiQuanXinYiJiXiangSong-2 字体圈欣意吉祥宋 Regular.ttf') format('truetype');
  font-display: block;
}

.lab-page {
  width: 100vw;
  min-height: 200vh;
  height: 199.19vw;
  overflow-x: hidden;
  /* background-color: #000; */
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100% auto;
}

.lab-content {
  width: 100%;
  margin: 0 auto;
  padding: 20px 0 6vw;
}

.works-section {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.works-row {
  padding: 100px 120px 0;
  width: 100vw;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: clamp(60px, 3.8vw, 70px);
  box-sizing: border-box;
}

.work-card {
  flex: 1 1 0;
  min-width: 0;
  overflow: visible;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.work-visual {
  position: relative;
  width: 100%;
  height: 405px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
}

.work-visual:focus-visible {
  outline: none;
}

.work-image,
.work-qr {
  position: absolute;
  left: 50%;
  top: 50%;
  display: block;
  object-fit: contain;
  transform: translate(-50%, -50%);
  transition:
    opacity 0.55s ease,
    filter 0.55s ease;
  will-change: opacity;
}

.work-image {
  max-width: min(100%, 410px);
  max-height: 405px;
  width: auto;
  height: auto;
  opacity: 1;
}

.work-qr {
  width: 278px;
  height: 278px;
  opacity: 0;
  filter: blur(2px);
}

.work-card:hover .work-image,
.work-card:focus-within .work-image {
  opacity: 0;
}

.work-card:hover .work-qr,
.work-card:focus-within .work-qr {
  opacity: 1;
  filter: blur(0);
}

.work-name {
  margin: 28px 0 0;
  min-height: 24px;
  color: #c0d6d2;
  font-family: 'WorkNameTitle', serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.25;
  text-align: center;
  white-space: nowrap;
}

.teaching-section {
  margin-top: 150px;
}

.title-box {
  display: flex;
  justify-content: center;
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.95s ease,
    transform 0.95s ease;
}

.title-box.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.title-image {
  display: block;
  width: 40vw;
  max-width: 100%;
  height: auto;
}

/* ⭐关键：允许卡片放大溢出 */
.illustration-row {
  --panel-height: clamp(400px, 38vw, 720px);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 0;
  margin-top: 180px;
  padding: 0 clamp(28px, 4vw, 72px) 12px;
  overflow: visible;
}

.illustration-card {
  position: relative;
  flex: 0 0 auto;
  width: calc(var(--slot-ratio) * var(--panel-height));
  height: var(--panel-height);
  cursor: pointer;
  transform: translate3d(var(--shift-x), calc(var(--offset) + var(--raise-y)), 0);
  transition:
    transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1),
    z-index 0s linear;
  will-change: transform;
}

.illustration-card__visual {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.03);
  box-shadow:
    0 22px 50px rgba(0, 0, 0, 0.28),
    inset 0 0 0 1px rgba(200, 220, 190, 0.08);
  isolation: isolate;
  transform: scaleX(var(--visual-scale-x));
  transform-origin: left bottom;
  transition:
    transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1),
    box-shadow 0.45s ease;
  will-change: transform;
}

.illustration-card__media {
  position: relative;
  width: var(--media-width);
  height: 100%;
  transform: scaleX(var(--visual-counter-scale-x));
  transform-origin: left bottom;
  will-change: transform;
}

.illustration-card__visual::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 2;
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0.46)),
    linear-gradient(90deg, rgba(0, 0, 0, 0.32), rgba(0, 0, 0, 0.08));
  transition: opacity 0.45s ease;
}

.illustration-card.is-active .illustration-card__visual,
.illustration-card:focus-visible .illustration-card__visual {
  box-shadow:
    0 28px 62px rgba(0, 0, 0, 0.42),
    inset 0 0 0 1px rgba(223, 239, 214, 0.18);
}

.illustration-card.is-active .illustration-card__visual::after,
.illustration-card:focus-visible .illustration-card__visual::after {
  opacity: 0.08;
}

.illustration-card:focus-visible {
  outline: none;
}

.illustration-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-position: center;
  transition:
    opacity 0.45s ease,
    filter 0.55s ease;
  backface-visibility: hidden;
}

.illustration-card.is-compressed-edge .illustration-image {
  object-position: left center;
}

.illustration-image--base {
  object-fit: cover;
  opacity: 1;
  filter: brightness(0.52) saturate(0.88);
}

.illustration-image--hover {
  object-fit: cover;
  opacity: 0;
  filter: brightness(1.06) saturate(1.08);
}

.illustration-card.is-active .illustration-image--base,
.illustration-card:focus-visible .illustration-image--base {
  opacity: 0;
}

.illustration-card.is-active .illustration-image--hover,
.illustration-card:focus-visible .illustration-image--hover {
  opacity: 1;
}

@media (max-width: 900px) {
  .illustration-row {
    --panel-height: clamp(300px, 78vw, 500px);
    margin-top: 84px;
    justify-content: flex-start;
    padding: 0 20px 12px;
    overflow-x: auto;
    overflow-y: visible;
  }

  .illustration-card {
    transform: translate3d(var(--shift-x), 0, 0);
  }

  .illustration-card.is-active,
  .illustration-card:focus-visible {
    transform: translate3d(var(--shift-x), -8px, 0);
  }
}
/* .CirPic_box{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: calc(100vw *0.6);
  margin-top: 50px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

}

.shadow_box{
  width: 100%;
  height: 100%;
} */
</style>
