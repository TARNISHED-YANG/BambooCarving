<script setup>
import { onMounted,onUnmounted,ref,reactive} from 'vue';
import HistoryHeader from '@/components/history/HistoryHeader.vue'
import historyMainTitle from '@/assets/history/header/bigtitle_1.png'

//传给查看更多按钮部分
import ShowMoreBtn from '@/components/history/ShowMore.vue'
import time1 from '@/assets/history/popup/tImg1.png'
import time2 from '@/assets/history/popup/tImg2.png'
import time3 from '@/assets/history/popup/tImg3.png'
import time4 from '@/assets/history/popup/tImg4.png'

import cel101 from '@/assets/history/popup/cImg101.png'
import cel102 from '@/assets/history/popup/cImg102.png'
import cel201 from '@/assets/history/popup/cImg201.png'
import cel202 from '@/assets/history/popup/cImg202.png'
import cel301 from '@/assets/history/popup/cImg301.png'
import cel302 from '@/assets/history/popup/cImg302.png'
import cel303 from '@/assets/history/popup/cImg303.png'
import cel304 from '@/assets/history/popup/cImg305.png'//暂时用下面的图
import cel305 from '@/assets/history/popup/cImg305.png'
import cel401 from '@/assets/history/popup/cImg401.png'
import cel402 from '@/assets/history/popup/cImg402.png'
import cel403 from '@/assets/history/popup/cImg402.png'//暂时用上面的图代替

import work101 from '@/assets/history/popup/wImg101.png'
import work102 from '@/assets/history/popup/wImg102.jpg'
import work201 from '@/assets/history/popup/wImg201.png'
import work202 from '@/assets/history/popup/wImg202.png'
import work301 from '@/assets/history/popup/wImg301.png'
import work302 from '@/assets/history/popup/wImg302.png'
import work303 from '@/assets/history/popup/wImg303.png'
import work304 from '@/assets/history/popup/wImg305.png'//暂时用下面的图
import work305 from '@/assets/history/popup/wImg305.png'
import work401 from '@/assets/history/popup/wImg401.png'
import work402 from '@/assets/history/popup/wImg402.png'
import work403 from '@/assets/history/popup/wImg402.png'//暂时用上面的图代替
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
        celIntro: '',
      }
    ],
  },
  // 高峰
  {
    pId: 2,
    timeImg: time2,
    y:8800,
    works: [
      {
        wId: 201,
        celImg: cel201,
        workImg: work201,
        celIntro:
          '与周颢齐名的还有周笠和施天章，时称“嘉定三艺人”。周笠，号牧山，周颢之侄，刻竹作画，两者都精；',
      },
      {
        wId: 202,
        celImg: cel202,
        workImg: work202,
        celIntro: '施天章，号焕文，工绘画，刻竹师承封氏技法，巧若天工，为一代圆雕大师，后被雍正皇帝召入宫内，所刻人物，古意浑厚，无人能及。',
      }
    ],
  },
  // 活跃
  {
    pId: 3,
    timeImg: time3,
    y:5000,
    works: [
      {
        wId: 301,
        celImg: cel301,
        workImg: work301,
        celIntro:
          '沈汉川、 沈大生昆仲 沈兼、沈尔望昆仲\n“三朱”的第一代传人沈汉川、沈大生昆仲；第二代沈兼、沈尔望昆仲都是杰出的传承者。沈氏家族世代从医，又世代刻竹，活跃于明末清初，其作品风格直逼三朱，又有超越。沈大生、沈兼更是其中的翘楚。沈大生，明末清初竹刻家。字仲旭，又字禹门，号禹川，江苏嘉定（今属上海市）人。诗画洒脱不凡，得朱氏真传，技法已超越朱氏。上海博物馆藏有沈大生浮雕《庭园读书图》笔筒一件。',
      },
      {
        wId: 302,
        celImg: cel302,
        workImg: work302,
        celIntro: '沈兼，字两之，号天净道人。工诗善画，精于篆刻，沈氏刀法犀利劲挺，老辣爽利，各种雕法混合使用，锋芒四露。清代前期和中期，有一大批竹人效法沈兼。他们的作品一般不留姓名，有的伪称小松、三松之类。他们为竹人之寒士，天天操刀，穷而后工，故他们的作品也熟能生巧，精益求精，如今存世的无名氏作品，大都出于他们之手。',
      },
      {
        wId: 303,
        celImg: cel303,
        workImg: work303,
        celIntro: '侯崤曾，字晋瞻，抗清志士侯峒曾族弟，明亡后，以遗民自居，经年不入城，潜心刻竹，将满腔悲愤融入竹刻，风格奇古高雅，他特别擅长刻制诗筒，后来诗筒集诗成为文人雅集的一种风尚。诗筒，也成为当时竹刻艺术中最重要的品种。',
      },
      {
        wId: 304,
        celImg: cel304,
        workImg: work304,
        celIntro: '诗筒\n明清易代之际，嘉定的文人士大夫经历和感受着时代变迁。王泰际、赵洪范、陆元辅、苏渊及吴梅村，汇集在嘉定东城侯玄汸（抗清志士侯岐曾之子）的秬园，开明月之堂，集岁寒之友，以侯崤曾的手制竹刻诗筒，传故国之思，诗和诗筒堪称双璧。诗筒也成为当时竹刻艺术品种最重要的品种。与沈大生、侯崤曾同时代的还有一位传奇式的竹刻家秦一爵。',
      },
      {
        wId: 305,
        celImg: cel305,
        workImg: work305,
        celIntro: '与沈大生、侯崤曾同时代的还有一位传奇式的竹刻家秦一爵。秦一爵也师法朱氏，但有创新意识，因其平日极为看重自身的技艺，轻易不肯为人雕刻，故世传作品极少。',
      },
    ],
  },
  // 全盛
    {
    pId: 4,
    timeImg: time4,
    y:6900,
    works: [
      {
        wId: 401,
        celImg: cel401,
        workImg: work401,
        celIntro:
          '封锡爵，清代竹刻家。字晋侯。嘉定（今属上海市）马陆人。封氏先人皆工诗善书，代有闻人，至锡爵辈始以竹刻传世。其性淡泊，平日常家居杜门，经年不入城市而潜心竹刻，长于竹根圆雕，格调高雅。有代表作竹雕《晚菘形笔筒》传世（藏故宫博物院）。',
      },
      {
        wId: 402,
        celImg: cel402,
        workImg: work402,
        celIntro: '清代雍正、乾隆时期，顾珏是另辟蹊径的大家。顾珏的刻竹继承“三朱”、“三沈”的神韵，但他传承而不泥古，独创刻露精深，细入毫发的风格。顾珏的创作态度极为严谨，《竹人录》说他“一器必经二载而成。”顾珏的作品在其生前已价格高昂。',
      },
      {
        wId: 403,
        celImg: cel403,
        workImg: work403,
        celIntro: '',
      }
    ],
  },
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
import subScript1 from '@/assets/history/sub_header/subscript1.png'
import subScript2 from '@/assets/history/sub_header/subscript1.png'//暂时用上图代替
import subScript3 from '@/assets/history/sub_header/subscript1.png'
import subScript4 from '@/assets/history/sub_header/subscript1.png'
import subScript5 from '@/assets/history/sub_header/subscript1.png'
import subScript6 from '@/assets/history/sub_header/subscript1.png'
const subHeadImg = {
  lHead: leftHeading,
  rHead: rightHeading,

}
const headers = [
  {
    id: 1,
    chiIntro: '创始之际',
    engIntro: 'AT THE \nFOUNDING',
    y: 936,
    subTime: subScript1,
    textIntro:
      '嘉定竹刻是中华工艺美术史中的一枝奇葩，至今已有近五百余年历史。嘉定竹刻以刀为工具，以竹子为载体，将书、画、诗、文、印融为一体，赋予竹子以新的生命，有明显的地域性和鲜明的原创性，作品蕴含有淡淡的书卷气和金石味，风雅绝俗，是历代文人的雅玩。',
  },
    {
    id: 2,
    chiIntro: '活跃时期',
    engIntro: 'AT THE \nFOUNDING',
    y: 3108,
    subTime: subScript2,
    textIntro:
      '',
  },
    {
    id: 3,
    chiIntro: '全盛时期',
    engIntro: 'AT THE \nFOUNDING',
    y: 5180,
    subTime: subScript3,
    textIntro:
      '',
  },
  {
    id: 4,
    chiIntro: '高峰时期',
    engIntro: 'AT THE \nFOUNDING',
    y: 7052,
    subTime: subScript4,
    textIntro:
      '',
  },
    {
    id: 5,
    chiIntro: '趋于衰落',
    engIntro: 'AT THE \nFOUNDING',
    y: 9024,
    subTime: subScript5,
    textIntro:
      '',
  },
  {
    id: 6,
    chiIntro: '已经式微',
    engIntro: 'AT THE \nFOUNDING',
    y: 10800,
    subTime: subScript6,
    textIntro:
      '',
  }
]

// 引入合并后的轨道节点组件
import OrbitNode from '@/components/history/TrackNode.vue'

// 左侧节点图片资源
import tImgLeft1 from '@/assets/history/node/headline1.png'
import wImgLeft1 from '@/assets/history/node/image1.jpg'
import nImgLeft1 from '@/assets/history/node/subheading1.png'
import tImgLeft2 from '@/assets/history/node/headline2.png'
import wImgLeft2 from '@/assets/history/node/image2.jpg'
import nImgLeft2 from '@/assets/history/node/subheading2.png'
import tImgLeft3 from '@/assets/history/node/headline3.png'
import wImgLeft3 from '@/assets/history/node/image3.jpg'
import nImgLeft3 from '@/assets/history/node/subheading3.png'
import tImgLeft4 from '@/assets/history/node/headline4.png'
import wImgLeft4 from '@/assets/history/node/image4.jpg'
import nImgLeft4 from '@/assets/history/node/subheading4.png'
import tImgLeft5 from '@/assets/history/node/headline6.png'
import wImgLeft5 from '@/assets/history/node/image5.jpg'
import nImgLeft5 from '@/assets/history/node/subheading5.png'

// 右侧节点图片资源
import tImgRight1 from '@/assets/history/node/headline1.png'//时间是直接用公用node文件夹下的
import wImgRight1 from '@/assets/history/nodeT2/image1.jpg'
import nImgRight1 from '@/assets/history/nodeT2/subheading1.png'
import tImgRight2 from '@/assets/history/node/headline2.png'
import wImgRight2 from '@/assets/history/nodeT2/image2.jpg'
import nImgRight2 from '@/assets/history/nodeT2/subheading2.png'
import tImgRight3 from '@/assets/history/node/headline3.png'
import wImgRight3 from '@/assets/history/nodeT2/image3.jpg'
import nImgRight3 from '@/assets/history/nodeT2/subheading3.png'
import tImgRight4 from '@/assets/history/node/headline4.png'
import wImgRight4 from '@/assets/history/nodeT2/image4.jpg'
import nImgRight4 from '@/assets/history/nodeT2/subheading4.png'
import tImgRight5 from '@/assets/history/node/headline5.png'
import wImgRight5 from '@/assets/history/nodeT2/image5.jpg'
import nImgRight5 from '@/assets/history/nodeT2/subheading5.png'
import tImgRight6 from '@/assets/history/node/headline6.png'
import wImgRight6 from '@/assets/history/nodeT2/image6.jpg'
import nImgRight6 from '@/assets/history/nodeT2/subheading6.png'

//这里y是最上端到达svg顶部的距离，而不是到页面最上端的距离
const allNodes = [
  {
    id: 1,
    position: 'left',  // 指定为左侧布局
    x: 100,
    y: 915,//创始1
    prog:0.1,
    TimeImg: tImgLeft1,
    WorkImg: wImgLeft1,
    NameImg: nImgLeft1,
    CeleIntro:
      '朱鹤是嘉定竹刻的原创者，活跃于明代正德、嘉靖年间，祖籍华亭（今上海市 松江区）。\n朱鹤迁入定居嘉定后，在嘉定文人雅士的影响和鼓励下，以书画艺术融入竹刻，以刀代笔开创了以透雕、深雕为特征的深刻技法，能于竹之分寸之间，拓展游刃空间， 刻山水、人物、楼阁、鸟兽，皆因势象形，因形造境，风格简老朴茂。',
  },
  {
    id: 2,
    position: 'right',  // 指定为右侧布局
    y: 1615,//创始2
    prog:0.15,
    TimeImg: tImgRight1,
    WorkImg: wImgRight1,
    NameImg: nImgRight1,
    CeleIntro:
      '朱缨，号小松，胜父一筹，绘画造诣更高，善圆雕，擅长竹刻神像佛像师法吴道子，1966年上海宝山县明朱守成墓，出土小松款刘阮入天台香筒，为可信度高之原刻作品，活跃于明嘉靖晚期到隆庆。',
  },
  {
    id: 3,
    position: 'right',  // 指定为右侧布局
    y: 2915,//活跃1
    prog:0.28,
    TimeImg: tImgRight3,
    WorkImg: wImgRight3,
    NameImg: nImgRight3,
    CeleIntro:
      '“嘉定四先生”中的另一位文人雅士 李流芳，不仅与竹人为友，而且自己也参与刻竹。李流芳为明万历举人，书、画、诗、文、印，无一不精。李流芳刻竹摹拟朱鹤风格，但存世作品极少，浙江宁波天一阁藏有李流芳 “行草苏轼词《蝶恋花》臂搁”。从年款“戊子”看，应是明万历十六年（1588），时李流芳14岁，当为李流芳的早年作品。李氏家族与竹刻朱氏有较深的渊源。李流芳的侄子李宜之，晚明秀才，也是一位知名文人，诗文俱佳，李宜之与朱鹤之孙朱稚征（三松）是好友，朱稚征曾为李宜之的私家园林古猗园擘划设计，使古猗园成为江南名园。',
  },
  {
    id: 4,
    position: 'left',  // 指定为左侧布局
    x: 100,
    y: 3715,//活跃2
    prog:0.33,
    TimeImg: tImgLeft3,
    WorkImg: wImgLeft3,
    NameImg: nImgLeft3,
    CeleIntro:
      '“嘉定四先生”之一的 娄坚，也同竹人有密切的关系。娄坚为明万历贡生，诗文俱佳，尤精于书法，称为 “天下绝妙”。娄坚比朱缨小24岁，两人亦师亦友。朱缨十分赏识娄坚的好学和为人， “以小友接之”，少年娄坚经常出入朱缨家问学。朱缨逝世三十年后，娄坚以深情的笔调撰写了 《先友朱清甫先生传》一文，记述了两人的深情厚意。',
  },
  {
    id: 5,
    position: 'left',  // 指定为左侧布局
    x: 100,
    y: 4915,//全盛1
    prog:0.43,
    TimeImg: tImgLeft4,
    WorkImg: wImgLeft4,
    NameImg: nImgLeft4,
    CeleIntro:
      '吴之璠，字鲁珍，号东海道人，江苏嘉定人，继三朱之后，吴之璠是嘉定派竹刻的第一高手。是康熙前期的竹雕名家。吴之璠擅长圆雕、浮雕等各种技法，早年师法三朱，晚年变法，仿洛阳龙门石刻的浅浮雕，首用薄地阳文刻竹。他的作品传世不多，但件件都是精品，时人称之为“鬼斧神工”，乾隆皇帝看了欣喜万分，亲笔在他的作品上题诗：“竹刻由来说鲁珍，藏锋写像传有神。技哉刀笔精神可，于吏吾当斥此人。”吴之璠开创的“薄地阳文”丰富了嘉定竹刻技法，从他学习的后人甚多，最著名的为其女婿朱文右，刻工也精美传神。此外，还有王之羽，也为吴之璠亲手所教，王之羽的作品有乃师之风格，王氏后人刻竹者甚多，王鉴、王质、王玘、王梅邻均为著名竹人，继承了吴之璠的风格。',
  },
  {
    id: 6,
    position: 'right',  // 指定为右侧布局
    y: 5565,//全盛2
    prog:0.48,
    TimeImg: tImgRight4,
    WorkImg: wImgRight4,
    NameImg: nImgRight4,
    CeleIntro:
      '封锡爵、封锡禄、封锡璋三兄弟，是与吴之璠同时代的竹刻大家，号称“封氏三鼎足”，他们都精于圆雕人物，以封锡禄成就最高。后来，他与其弟封锡璋被康熙皇帝召入内廷为皇家刻制作品。封锡禄的圆雕“罗汉像”、“狮子戏球”，都是不可多得的艺术珍品。金元钰在《竹人录》中除了为“封氏三鼎足”列传外，还为封氏家族中的封颖谷、封始镐、封始豳、封始岐立传。此外，又有封文官、封品官、封元官、封云生、封小姐等名列《竹人录》，他们都是封氏后人。封小姐“工刻蟾蜍，当时以一蟾蜍易银一两”，封氏家族把圆雕艺术推向极致。这个时期，王易、周乃始、王屺等也是有相当实力的竹人。',
  },
  {
    id: 7,
    position: 'right',  // 指定为右侧布局
    y: 6815,//高峰1
    prog:0.6,
    TimeImg: tImgRight2,
    WorkImg: wImgRight2,
    NameImg: nImgRight2,
    CeleIntro:
      '这个时期的领军人物是周颢。周颢传世作品件件都是精品。与他同时代的著名学者钱大昕在《周山人传》一文中说周颢“用刀如用笔，不假稿本，自成丘壑，其皴法浓淡坳突，生动浑成，”“松壑云泉图笔筒”、“兰花秘阁”都是绝顶佳品。',
  },
  {
    id: 8,
    position: 'left',  // 指定为左侧布局
    x: 100,
    y: 7515,//高峰2
    prog:0.65,
    TimeImg: tImgLeft2,
    WorkImg: wImgLeft2,
    NameImg: nImgLeft2,
    CeleIntro:
      '清代乾隆时期，著名学者钱大昕与竹人周颢结为忘年交，又续文人与竹人友谊的一段佳话。周颢比钱大昕长43岁，但十分喜欢钱大昕，俩人交流过竹刻艺术，也引发了钱大昕对竹刻的浓厚兴趣，在读书著述之余，钱大昕也操刀刻竹，作品颇为精到传神。周颢逝世后，钱大昕异常悲痛，回忆自己与周颢的深厚友谊，写了 《周山人传》一文，为周颢留下了生动而详实的生平传略。',
  },
  {
    id: 9,
    position: 'left',  // 指定为左侧布局
    x: 100,
    y: 8715,//衰落1
    prog:0.76,
    TimeImg: tImgLeft5,
    WorkImg: wImgLeft5,
    NameImg: nImgLeft5,
    CeleIntro:
      '晚清秀才程庭鹭、程祖庆父子，都擅长书画篆刻，也精于竹刻。嘉定竹刻博物馆藏有程庭鹭的 “松风琴趣图臂搁”，高古简洁，极具文人笔墨韵味。秀才赵鼎奎、周次咸等都是名噪一时的竹刻好手。',
  },
  {
    id: 10,
    position: 'right',  // 指定为右侧布局
    y: 9311,//衰落2
    prog:0.8,
    TimeImg: tImgRight6,
    WorkImg: wImgRight6,
    NameImg: nImgRight6,
    CeleIntro:
      '张学海的圆雕令人瞩目，张学海具有创新意识，擅长大件圆雕，他的圆雕大狮子，精气十足，是他的代表作。',
  },
  {
    id: 11,
    position: 'right',  // 指定为右侧布局
    y: 10615,//式微
    prog:0.9,
    TimeImg: tImgRight5,
    WorkImg: wImgRight5,
    NameImg: nImgRight5,
    CeleIntro:
      '至民国时期，尽管竹刻已经式微，仍有不少文人雅士参与竹刻，流风遗韵，代代不绝。如 万一鹏，精于书画，亦善竹刻，所刻 “竹叶络纬笔筒”藏于嘉定竹刻博物馆，嘉定乡贤 胡厥文先生曾在笔筒题写了长段跋文，称之为 “瑰奇古茂，精雅绝俗。',
  },
]
const rects = reactive([]) //储存已显示的Node数组
let maxProgress = 0;
let speed = 1.05;
let start_ratio = 0.1;
const progress = ref(0)
// // checkpoints与rectParams索引对应，控制每个节点的滚动触发进度
// const checkpoints = [0.2, 0.4]
// const imgs = [Renoir1, Renoir2] // 路径上的小图片
// const shown = [false, false] // 标记节点是否已显示

import Renoir1 from '@/assets/Renoir.jpeg'
import Renoir2 from '@/assets/Renoir2.jpeg'
const checkpoints = allNodes.map(node => node.prog) // 根据allNodes动态生成触发进度点
const imgs = [Renoir1, Renoir2,Renoir1, Renoir2,Renoir1, Renoir2,Renoir1, Renoir2,Renoir1, Renoir2,Renoir1] //路径上
const shown = reactive(allNodes.map(()=>false))// 标记节点是否已显示

onMounted(() => {
  const container = document.querySelector('.svg-container')
  const path = document.getElementById('highlightPath')
  if (!path) return
  const pathLength = path.getTotalLength()
  path.style.strokeDasharray = pathLength
  path.style.strokeDashoffset = pathLength
  const onScroll = () => {
    const rect = path.getBoundingClientRect() //路径的边界矩形
    const windowHeight = window.innerHeight
    // const viewportTop = 0
    const viewportBottom = windowHeight
    const elementTop = rect.top
    // const elementBottom = rect.bottom
    const scrollRange = rect.height + windowHeight
    const scrolled = viewportBottom - elementTop - windowHeight * start_ratio //计算滚动距离
    maxProgress = Math.max(scrolled * speed, maxProgress) //更新最大滚动进度
    progress.value = Math.min(Math.max(maxProgress / scrollRange, 0), 1) //归一化到0-1范围
    path.style.strokeDashoffset = pathLength * (1 - progress.value)
        // 遍历每个节点，判断是否达到滚动触发条件
    checkpoints.forEach((triggerProgress, i) => {
      if (progress.value >= triggerProgress && !shown[i]) {
        const currentParam = allNodes[i]
        // 1. 绘制SVG路径上的小图片（按pathRatio计算位置）
        const point = path.getPointAtLength(pathLength * currentParam.prog)

        const img = document.createElement('img')
        img.style.opacity = 0
        img.src = imgs[i]
        img.style.position = 'absolute'
        img.style.width = '40px'
        img.style.height = '40px'
        img.style.left = `${point.x - 20}px`
        img.style.top = `${point.y - 20}px`
        img.style.transition = 'opacity 0.7s ease'
        container.appendChild(img)
        setTimeout(() => (img.style.opacity = 1), 50)

        // 2. 添加MyRect组件数据（直接使用手动配置的x/y）
        rects.push({
          id: currentParam.id,
          // 直接使用rectParams中自定义的x/y，不再依赖路径点位偏移
          x: currentParam.x,
          y: currentParam.y,
          // 传递其他组件参数
          position: currentParam.position,
          TimeImg: currentParam.TimeImg,
          WorkImg: currentParam.WorkImg,
          NameImg: currentParam.NameImg,
          CeleIntro: currentParam.CeleIntro,
        })

        shown[i] = true // 标记该节点已显示，避免重复添加
      }
    })
  }
  window.addEventListener('scroll', onScroll)
  onScroll() //初始化调用一次
  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })
})
</script>

<template>
  <div class="history_container">
    <div class="background"></div>
    <div class="content">
      <HistoryHeader :main-title="historyMainTitle" />

      <!-- 这是曲线部分，可能还要改动 -->
    <div class="svg-container" style="position: relative">

    <!-- 扩展 viewBox 高度到 12000，匹配节点最大 y 坐标 -->
    <svg viewBox="0 0 1440 11900" xmlns="http://www.w3.org/2000/svg" width="1440" height="11900" class="Path">
      <!-- 黑色底线：延长路径到 y=12000 -->
      <path
        d="M800,50 C50,500 1550,1000 800,1500 C50,2000 1550,2500 800,3000 C50,3500 1550,4000 800,4500 C50,5000 1550,5500 800,6000 C50,6500 1550,7000 800,7500 C50,8000 1550,8500 800,9000 C50,9500 1550,10000 800,10500 C50,11000 1550,11500 800,12000"
        stroke="black"
        fill="none"
        stroke-width="3"
        id="basePath"
      />
      <!-- 橙色高亮路径：同步延长 -->
      <path
        d="M800,50 C50,500 1550,1000 800,1500 C50,2000 1550,2500 800,3000 C50,3500 1550,4000 800,4500 C50,5000 1550,5500 800,6000 C50,6500 1550,7000 800,7500 C50,8000 1550,8500 800,9000 C50,9500 1550,10000 800,10500 C50,11000 1550,11500 800,12000"
        stroke="orange"
        fill="none"
        stroke-width="5"
        id="highlightPath"
      />
    </svg>
           <OrbitNode
            v-for="node in rects"
            :key="node.id"
            :position="node.position"
            :x="node.x"
            :y="node.y"
            :TimeImg="node.TimeImg"
            :WorkImg="node.WorkImg"
            :NameImg="node.NameImg"
            :CeleIntro="node.CeleIntro"

          />
           <!-- v-show="progress >= node.prog" -->
</div>

        <SubHeader
          v-for="header in headers"
          :key="header.id"
          :y="header.y"
          :header_info="header"
          :origin="subHeadImg.lHead"
          :celebrity="subHeadImg.rHead"
        />

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
.history_container{
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
.svg-container{
  /* width:100%;
  display:flex;
  justify-content:center; */
  position:relative;
}
</style>
