<script setup>
import ParaCont from '@/components/ParaCont.vue';
import BgImg1 from "@/assets/Demo1/bg1.png"
import BgImg2 from "@/assets/Demo1/bg2.png"
import ShadowTextBox from '@/components/ShadowTextBox.vue';
import CirPic1 from '@/components/CirPic.vue';
import WImg1 from "@/assets/Demo1/work1.png";
import WImg2 from "@/assets/Demo1/work2.png";
import WImg3 from "@/assets/Demo1/work3.png";
import WImg4 from "@/assets/Demo1/work4.png";
import First_bg from "@/assets/Demo1/bg0.jpg";
// 准备数据数组，每个元素对应一个 ParaCont
// 速度为 1 则随页面静止不动，0 则类似固定不动  
const paraItems = [
  { text: '明代书画家、竹刻家。字清父，号小松，南直隶松江府嘉定（今属上海）人，居清镜塘。朱鹤子。貌古神清，自幼受家庭熏陶，工小篆及行草，画尤长于气韵，长卷小幅，各有异趣。间仿王摩诘（维）诸名家，云树纡曲盘折，尽属化工',
    name:"朱缨",time:"（1520—1587）",
   bg: BgImg1, height: 90, speed: 0.3,direct: "left"},
  { text: '字晋瞻，号芷岩、雪樵，清早期嘉定竹刻转型发展的关键人物。他将南宗绘画技法融入竹刻，首创“以刀代笔”的雕刻技法，开创了文人艺术与工艺美术融合的新境界，被尊为“中国竹刻史上的里程碑式人物”。', 
  name:"周颢",time:"（1685-1773）",
  bg: BgImg2, height: 90, speed: 0.3,direct: "right"},
];

const imgs   = [WImg1, WImg2, WImg3, WImg4];
const names  = ["竹根雕折枝蟠桃摆件", "竹根雕八仙乘槎摆件", "竹根雕佛手摆件", "竹根雕牧童戏牛摆件"];
const datas  = ["【清早期】10cm", "【清】20cm", "【清】12cm", "【明末清初】12cm"];
const intros = [
  "取竹根为材，依势刻大蟠桃，以竹鞭作桃枝虬屈处极尽天然之美，桃身一枝环绕，桃叶若迎风作卷舒之状，极类清三代珐琅彩瓷器上工笔画法，一小枝回折上附二小桃。下承一异形乌木座，依形相配线条流畅，一黑一黄相得益彰。",
  "此竹根雕成槎形。槎，为带枝杈的枯木，可漂浮水上，载人而行。此摆件以圆雕、浮雕、透雕等技法雕刻。八仙人物手持各式法器，形态各异，神态万千。槎的造型如神龙摆尾，飘若游龙。槎下原配乌木底座，海浪翻涌成漩，水浪纹层次分明，细入末毫，似在激流中航行，乘风破浪。",
  "此件依照竹根天然形制，将光滑的细竹根与糙涩的粗竹根巧妙组合，运用圆雕、透雕等技艺，将果实、茎叶琢刻得惟妙惟肖，佛手上棕点麻皮表现逼真，弯折掩映深浅多变，从不同角度观赏皆有不同效果，极具古典之天然意趣，属于清早期嘉定竹雕作品。",
  "此竹根雕牧童戏牛摆件，构思巧妙。牧牛二小童，一趴卧牛背，翘首向天若睹浮云飞鸟，一欲攀牛首而上，双手握其角右足抵牛额，仰首相呼。牛则侧首略屈左前脚。小童之天真顽皮，水牛之憨态呼之欲出，使人观之如在眼前几欲忘为雕刻矣！"
];
</script>

<template>
  <div class="CirPic_box" :style="{ backgroundImage: `url(${First_bg})`}">
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
  </div>
</template>

<style scoped>
.CirPic_box{
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
}
</style>
