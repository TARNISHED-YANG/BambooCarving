<script setup>
import HistoryHeader from '@/components/history/HistoryHeader.vue'
import bImg1 from '@/assets/history/header/background_1.png'
import bImg2 from '@/assets/history/header/background_2.png'
import sTitle from '@/assets/history/header/Subheading_1.png'
import cTitle from '@/assets/history/header/bigtitle_1.png'
import eTitle from '@/assets/history/header/bigtitle_2.png'
import aIcon from '@/assets/history/header/icon_1.png'
const headData = {
  backImg1: bImg1,
  backImg2: bImg2,
  subTitle: sTitle,
  mainTitle: cTitle,
  enTitle: eTitle,
  arrowIcon: aIcon,
}
import PeriodSection from '@/components/history/PeriodSection.vue'
import time1 from '@/assets/history/popup/text image_1.png'
import cel101 from '@/assets/history/popup/text image_2.png'
import cel102 from '@/assets/history/popup/text image_2.png'
import work101 from '@/assets/history/popup/work images_1.png'
import work102 from '@/assets/test.jpg'
const periods = [
  {
    pId: 1,
    timeImg: time1,
    works: [
      {
        wId: 101,
        celImg: cel101,
        workImg: work101,
        celIntro:
          '朱樱三子朱稚征，号三松，活跃于万历朝，画工远山淡石，尤长画驴，竹刻上精益求精，声名远播，自三松，朱氏技法始传授他姓，加之嘉定工匠争相模仿，当世便真赝杂出，图为原刻并乾隆帝题诗称赏。朱鹤、朱缨、朱稚征史称“竹刻三朱”。经过朱氏三代的开创打造，嘉定竹刻的样式和风格已基本确立。',
      },
      {
        wId: 102,
        celImg: cel102,
        workImg: work102,
        celIntro: '后续人物介绍',
      }, //添加同时期更多作品...
    ],
  },
  {
    pId: 2,
    timeImg: time1,
    works: [
      {
        wId: 201,
        celImg: cel101,
        workImg: work101,
        celIntro: '',
      },
    ],
  }, //添加更多时期...
]
import popupBg from '@/assets/history/popup/background_1.png'
import lArrow from '@/assets/history/popup/icon_2.png'
import closeBtn from '@/assets/history/popup/icon_1.png'
const ComIcons = {
  bgImg: popupBg,
  leftBtn: lArrow,
  closeBtn: closeBtn,
}
</script>

<template>
  <HistoryHeader
    :backImg1="headData.backImg1"
    :backImg2="headData.backImg2"
    :subTitle="headData.subTitle"
    :mainTitle="headData.mainTitle"
    :enTitle="headData.enTitle"
    :arrowIcon="headData.arrowIcon"
  ></HistoryHeader>
  <div class="periods">
    <PeriodSection
      v-for="period in periods"
      :key="period.pId"
      :period_info="period"
      :icons_info="ComIcons"
    />
  </div>
</template>

<style scoped>
.periods {
  margin-top: 1000px; /*待定*/
  display: flex;
  flex-direction: column;
}
</style>
