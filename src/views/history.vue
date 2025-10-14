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
//传给查看更多按钮部分
import ShowMoreBtn from '@/components/history/ShowMore.vue'
import time1 from '@/assets/history/popup/text image_1.png'
import cel101 from '@/assets/history/popup/text image_2.png'
import cel102 from '@/assets/history/popup/text image_2.png'
import work101 from '@/assets/history/popup/work images_1.png'
import work102 from '@/assets/test.jpg'
const periods = [
  {
    pId: 1,
    timeImg: time1,
    y:3000,
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
    y:5000,
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
//传给SubHeader的部分
import SubHeader from '@/components/history/SubHeader.vue'
import leftHeading from '@/assets/history/sub_header/subheading_1.png'
import rightHeading from '@/assets/history/sub_header/subheading_2.png'
import subScript from '@/assets/history/sub_header/subscript.png'
const subHeadImg = {
  lHead: leftHeading,
  rHead: rightHeading,
  subTime: subScript,
}
const headers = [
  {
    id: 1,
    chiIntro: '创始之际',
    engIntro: 'AT THE \nFOUNDING',
    y: 1000,/*936?*/
    textIntro:
      '嘉定竹刻是中华工艺美术史中的一枝奇葩，至今已有近五百余年历史。嘉定竹刻以刀为工具，以竹子为载体，将书、画、诗、文、印融为一体，赋予竹子以新的生命，有明显的地域性和鲜明的原创性，作品蕴含有淡淡的书卷气和金石味，风雅绝俗，是历代文人的雅玩。',
  }, //更多二级标题
]

// 引入合并后的轨道节点组件
import OrbitNode from '@/components/history/TrackNode.vue'

// 左侧节点图片资源
import tImgLeft from '@/assets/history/node/headline.png'
import wImgLeft from '@/assets/history/node/image_1.jpg'
import nImgLeft from '@/assets/history/node/subheading.png'

// 右侧节点图片资源
import tImgRight from '@/assets/history/nodeT2/headline.png'
import wImgRight from '@/assets/history/nodeT2/image_2.jpg'
import nImgRight from '@/assets/history/nodeT2/subheading.png'

// 左侧节点数据
const leftNodes = [
  {
    id: 1,
    position: 'left',  // 指定为左侧布局
    x: 100,
    y: 1800,
    TimeImg: tImgLeft,
    WorkImg: wImgLeft,
    NameImg: nImgLeft,
    CeleIntro:
      '朱鹤是嘉定竹刻的原创者，活跃于明代正德、嘉靖年间，祖籍华亭（今上海市 松江区）。\n朱鹤迁入定居嘉定后，在嘉定文人雅士的影响和鼓励下，以书画艺术融入竹刻，以刀代笔开创了以透雕、深雕为特征的深刻技法，能于竹之分寸之间，拓展游刃空间， 刻山水、人物、楼阁、鸟兽，皆因势象形，因形造境，风格简老朴茂。',
  },
]

// 右侧节点数据
const rightNodes = [
  {
    id: 1,
    position: 'right',  // 指定为右侧布局
    y: 2500,
    TimeImg: tImgRight,
    WorkImg: wImgRight,
    NameImg: nImgRight,
    CeleIntro:
      '朱缨，号小松，胜父一筹，绘画造诣更高，善圆雕，擅长竹刻神像佛像师法吴道子，1966年上海宝山县明朱守成墓，出土小松款刘阮入天台香筒，为可信度高之原刻作品，活跃于明嘉靖晚期到隆庆。',
  },
]
</script>

<template>
  <div class="container">
    <div class="background"></div>
    <div class="content">
      <HistoryHeader
        :backImg1="headData.backImg1"
        :backImg2="headData.backImg2"
        :subTitle="headData.subTitle"
        :mainTitle="headData.mainTitle"
        :enTitle="headData.enTitle"
        :arrowIcon="headData.arrowIcon"
      ></HistoryHeader>
        <SubHeader
          v-for="header in headers"
          :key="header.id"
          :y="header.y"
          :header_info="header"
          :origin="subHeadImg.lHead"
          :celebrity="subHeadImg.rHead"
          :subImg="subHeadImg.subTime"
        />
        <!-- 先放这里看效果 -->
           <OrbitNode
            v-for="node in [...leftNodes, ...rightNodes]"
            :key="node.id"
            :position="node.position"
            :x="node.x"
            :y="node.y"
            :TimeImg="node.TimeImg"
            :WorkImg="node.WorkImg"
            :NameImg="node.NameImg"
            :CeleIntro="node.CeleIntro"
          />
        <!-- <TrackNode1
          v-for="node in nodesT1"
          :key="node.id"
          :x="node.x"
          :y="node.y"
          :TimeImg="node.tImg"
          :WorkImg="node.wImg"
          :NameImg="node.nImg"
          :CeleIntro="node.cIntro"
        />
        <TrackNode2
          v-for="node in nodesT2"
          :key="node.id"
          :x="node.x"
          :y="node.y"
          :TimeImg="node.tImg"
          :WorkImg="node.wImg"
          :NameImg="node.nImg"
          :CeleIntro="node.cIntro"
        /> -->

      <div class="buttons">
        <ShowMoreBtn
          v-for="period in periods"
          :key="period.pId"
          :topDistance="period.y"
          :period_info="period"
          :icons_info="ComIcons"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container{
  position:relative;
  width:100vw;
}
.background{
  position:absolute;
  top:0;
  left:0;
  width:100vw;
  background-color: black;
  height:12932px;/*?*/
  z-index:1;
}
.content{
  position:relative;
  width:100vw;
  z-index: 10;
}
.buttons {
  margin-top: 1000px; /*待定*/
  /* display: flex;
  flex-direction: column; */
}
</style>
