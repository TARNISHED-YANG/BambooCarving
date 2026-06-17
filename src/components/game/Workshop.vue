<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'

import smoothStrip from '@/assets/Workshop/光滑竹片.png'
import fenyunArtwork from '@/assets/Workshop/分筠.png'
import edgedArtwork from '@/assets/Workshop/圈边.png'
import finalArtwork from '@/assets/Workshop/成品.png'
import draft1 from '@/assets/Workshop/画稿1.png'
import draft1Edge from '@/assets/Workshop/画稿1edge.png'
import draft2 from '@/assets/Workshop/画稿2.png'
import draft2Edge from '@/assets/Workshop/画稿2edge.png'
import draft3 from '@/assets/Workshop/画稿3.png'
import draft3Edge from '@/assets/Workshop/画稿3edge.png'
import draft4 from '@/assets/Workshop/画稿4.png'
import draft4Edge from '@/assets/Workshop/画稿4edge.png'
import bambooA from '@/assets/Workshop/竹片A.png'
import bambooB from '@/assets/Workshop/竹片B.png'
import bambooC from '@/assets/Workshop/竹片C.png'
import roughBoard from '@/assets/Workshop/粗糙竹片.png'
import chandi1 from '@/assets/Workshop/铲底1.png'
import chandi2 from '@/assets/Workshop/铲底2.png'
import chandi3 from '@/assets/Workshop/铲底3.png'
import outlineGuide from '@/assets/Workshop/圈边edge.png'
import masterPanelAsset from '@/assets/Workshop/其他页面/师傅提示.png'
import taskPanelAsset from '@/assets/Workshop/其他页面/任务提示.png'
import prepVideoAsset from '@/assets/Workshop/其他页面/竹刻游戏视频.mp4'
import shelfBackgroundAsset from '@/assets/Workshop/其他页面/background_1.png'
import stageBackgroundAsset from '@/assets/Workshop/其他页面/background_2.png'
import toolboxAsset from '@/assets/Workshop/其他页面/工具栏/工具箱.png'
import toolLeftBevel from '@/assets/Workshop/其他页面/工具栏/左斜口.png'
import toolRound from '@/assets/Workshop/其他页面/工具栏/圆头刀.png'
import toolSmallFlat from '@/assets/Workshop/其他页面/工具栏/小平口.png'
import toolLargeFlat from '@/assets/Workshop/其他页面/工具栏/大平口.png'
import toolCurved from '@/assets/Workshop/其他页面/工具栏/斜弯口.png'
import toolHalfRound from '@/assets/Workshop/其他页面/工具栏/半圆刀.png'
import toolRightBevel from '@/assets/Workshop/其他页面/工具栏/右斜口.png'
import toolPointed from '@/assets/Workshop/其他页面/工具栏/尖头刀.png'
import brushToolAsset from '@/assets/Workshop/其他页面/工具栏/毛笔.png'
import sandpaperToolAsset from '@/assets/Workshop/其他页面/工具栏/砂纸.png'
import sandpaperDraggedAsset from '@/assets/Workshop/其他页面/工具栏/砂纸拖出后.png'
import introVideoAsset from '@/assets/Workshop/点击“开始游戏”按钮后播放.mov'
import introGuideAsset from '@/assets/Workshop/对话框.png'

defineOptions({ name: 'WorkshopGame' })

const PREP_STEPS = ['修竹', '煮竹', '晾干', '制坯']

const introGuideParagraphs = [
  '欢迎来到竹艺工坊，我是你们的竹刻师傅，痴迷于将寻常竹材，刻出万千意趣。',
  '竹刻是一门藏着东方雅致的传统工艺，以竹为纸、以刀为笔，甄选纹理细密、质地坚韧的老竹，经选材、修竹、描样、雕刻、打磨、上蜡六道工序，将山水、花鸟、诗文等意象，细细镌刻于竹身之上，既保留竹的天然肌理，又赋予其人文温度，一刀一凿间，皆是时光与匠心的沉淀。',
  '接下来就随我体验竹刻工艺，触碰竹的温润，感受刻刀下的匠心之美。',
]

const materialCards = [
  { id: 'A', name: '竹片A', image: bambooA, detail: '有裂纹' },
  { id: 'B', name: '竹片B', image: bambooB, detail: '完整、颜色均匀、表皮好' },
  { id: 'C', name: '竹片C', image: bambooC, detail: '有虫斑或残损' },
]

const toolCatalog = [
  { id: 'sandpaper', name: '砂纸', short: '砂', accent: '#e6bf7d' },
  { id: 'brush', name: '毛笔', short: '笔', accent: '#bf805a' },
  { id: 'knife-large', name: '大号平口刀', short: '大', accent: '#9bc7cf' },
  { id: 'knife-small', name: '小号平口刀', short: '小', accent: '#8db5c2' },
]

const shelfTools = [
  { id: 'left-bevel', name: '左斜口', image: toolLeftBevel, width: 'clamp(34px, 3vw, 56px)', rotate: '-8deg', lift: '18px' },
  { id: 'round-head', name: '圆头刀', image: toolRound, width: 'clamp(34px, 3vw, 56px)', rotate: '-6deg', lift: '20px' },
  { id: 'knife-small', name: '小平口', image: toolSmallFlat, width: 'clamp(34px, 3vw, 56px)', rotate: '-5deg', lift: '18px', actionId: 'knife-small' },
  { id: 'knife-large', name: '大平口', image: toolLargeFlat, width: 'clamp(36px, 3.2vw, 58px)', rotate: '-4deg', lift: '14px', actionId: 'knife-large' },
  { id: 'curved-bevel', name: '斜弯口', image: toolCurved, width: 'clamp(34px, 3vw, 56px)', rotate: '-6deg', lift: '18px' },
  { id: 'half-round', name: '半圆刀', image: toolHalfRound, width: 'clamp(33px, 3vw, 54px)', rotate: '-3deg', lift: '18px' },
  { id: 'right-bevel', name: '右斜口', image: toolRightBevel, width: 'clamp(34px, 3vw, 56px)', rotate: '-7deg', lift: '18px' },
  { id: 'pointed', name: '尖头刀', image: toolPointed, width: 'clamp(34px, 3vw, 56px)', rotate: '-5deg', lift: '18px' },
  { id: 'brush', name: '毛笔', image: brushToolAsset, width: 'clamp(38px, 3vw, 62px)', rotate: '-2deg', lift: '8px', actionId: 'brush' },
  { id: 'sandpaper', name: '砂纸', image: sandpaperToolAsset, width: 'clamp(56px, 4vw, 88px)', rotate: '-4deg', lift: '14px', actionId: 'sandpaper' },
]

const stagePreloadAssets = [
  shelfBackgroundAsset,
  stageBackgroundAsset,
  masterPanelAsset,
  taskPanelAsset,
  toolboxAsset,
  toolLeftBevel,
  toolRound,
  toolSmallFlat,
  toolLargeFlat,
  toolCurved,
  toolHalfRound,
  toolRightBevel,
  toolPointed,
  brushToolAsset,
  sandpaperToolAsset,
  bambooA,
  bambooB,
  bambooC,
]

const stageMeta = {
  intro: {
    title: '竹刻留青工坊',
    english: 'WORKSHOP',
    task: '从选竹到成器，亲手完成一件嘉定竹刻留青作品。',
    tip: '先观其材，再顺其理，竹刻讲究的是顺势而为。',
    craft: '留青工艺以竹青成画、以竹肌成地，讲究留与去之间的层次变化。',
    toolHint: '点击进入工坊，正式开始制作。',
    progressLabel: '工坊准备度',
  },
  select: {
    title: '选材整料',
    english: 'SELECT',
    task: '请选择一块适合留青工艺的竹片。',
    tip: '留青工艺先看竹青，表皮破损会影响最终图案。',
    craft: '竹刻制作前，需要经过选竹、修竹、煮竹、晾干、制坯等准备过程。',
    toolHint: '直接点击竹片进行挑选。',
    progressLabel: '备料进度',
  },
  polish: {
    title: '打磨竹面',
    english: 'POLISH',
    tool: 'sandpaper',
    task: '用砂纸将竹面打磨光滑。',
    tip: '竹面不平，描稿会漂，下刀不稳。',
    craft: '打磨是雕刻前的关键准备步骤。',
    toolHint: '点击砂纸',
    activeHint: '拖住移动，把角角落落都打磨到位',
    successText: '打磨完成，竹面已经平整，可以进行下一步描稿了！',
    progressLabel: '打磨进度',
  },
  sketch: {
    title: '描印画稿',
    english: 'SKETCH',
    tool: 'brush',
    task: '拖动画笔，完成画稿。',
    tip: '先定意境，再动刀。',
    craft: '描印画稿决定图案布局和留青范围。',
    toolHint: '点击毛笔',
    activeHint: '拖住按轨迹移动',
    successText: '画稿完成，图案轮廓已经明确。',
    progressLabel: '描稿进度',
  },
  edge: {
    title: '圈边切边',
    english: 'OUTLINE',
    tool: 'knife-large',
    task: '沿着图案轮廓完成圈边。',
    tip: '刀口朝向要去掉的一边。',
    craft: '圈边是留青工艺中最关键的定界步骤。',
    toolHint: '点击大号平口刀',
    activeHint: '拖住移动',
    successText: '圈边完成，留青边界已经明确。',
    progressLabel: '圈边进度',
  },
  ground: {
    title: '铲底起地',
    english: 'GROUND',
    tool: 'knife-large',
    task: '铲去图案外的竹青，露出竹肌。',
    tip: '图案要留，背景要去。',
    craft: '留青工艺的核心就在于“留图去地”。',
    toolHint: '点击大号平口刀',
    activeHint: '拖住，按竹子的肌理方向移动',
    successText: '铲去图案以外的竹青，露出竹肌作地。',
    progressLabel: '铲底进度',
  },
  refine: {
    title: '分筠修整',
    english: 'REFINE',
    tool: 'knife-small',
    task: '在保留的竹青上刮出深浅层次。',
    tip: '全留为浓墨，半留为淡彩，不留露竹肌。',
    craft: '分筠是留青竹刻的灵魂，通过控制竹皮厚薄来实现“以皮代墨”的笔墨意境。',
    toolHint: '点击小号平口刀',
    activeHint: '拖住移动，精心雕刻角角落落',
    successText: '画面有了远近虚实、阴阳向背，可以进行最后一步了！',
    progressLabel: '分筠进度',
  },
  finish: {
    title: '平底打磨',
    english: 'FINISH',
    tool: 'knife-large',
    task: '整理背景底地，完成最后收尾。',
    tip: '好的作品，不只在图，也在底地是否干净。',
    craft: '平底打磨让成品更整洁、更有层次。',
    toolHint: '点击大号平口刀',
    activeHint: '拖住移动，铲平背景',
    successText: '最后一步也顺利完成了！',
    progressLabel: '收尾进度',
  },
  result: {
    title: '成品展示',
    english: 'FINALE',
    task: '你完成了一件嘉定竹刻留青作品。',
    tip: '留与去之间，正是竹刻之美。',
    craft: '图案以竹青显形，底地以竹肌衬托，作品由此有了清润层次。',
    toolHint: '可以再做一遍，或者返回首页。',
    progressLabel: '完成度',
  },
}

const draftImages = [draft1, draft2, draft3, draft4]
const draftGuideImages = [draft1Edge, draft2Edge, draft3Edge, draft4Edge]
const groundImages = [chandi1, chandi2, chandi3]

const groundArrows = [
  { y: 0.29, startX: 0.11, endX: 0.84 },
  { y: 0.49, startX: 0.08, endX: 0.87 },
  { y: 0.71, startX: 0.14, endX: 0.9 },
]

const refineHotspots = [
  { x: 0.18, y: 0.26, radius: 0.11 },
  { x: 0.43, y: 0.23, radius: 0.1 },
  { x: 0.6, y: 0.48, radius: 0.1 },
  { x: 0.78, y: 0.36, radius: 0.12 },
  { x: 0.84, y: 0.63, radius: 0.12 },
]

const finishZones = [
  { x: 0.08, y: 0.1, width: 0.84, height: 0.18 },
  { x: 0.08, y: 0.72, width: 0.84, height: 0.17 },
  { x: 0.88, y: 0.24, width: 0.1, height: 0.38 },
]

const guideMasks = {
  sketch: [],
  edge: null,
}

const currentStage = ref('intro')
const introVideoPlaying = ref(false)
const introGuideVisible = ref(false)
const introGuideStep = ref(0)
const introGuideTypedParagraphs = ref(introGuideParagraphs.map(() => ''))
const introGuideAnimating = ref(false)
const introGuideFading = ref(false)
const stageTransitionVisible = ref(false)
const hoveredMaterialId = ref('')
const hoveredShelfToolId = ref('')
const selectedMaterialId = ref('')
const selectionPhase = ref('pick')
const selectionShakeId = ref('')
const prepIndex = ref(-1)
const prepVideoProgress = ref(0)
const toolSelected = ref(false)
const interactionLocked = ref(false)
const messageOverride = ref('')
const messageTone = ref('info')

const polishProgress = ref(0)
const sketchTrackIndex = ref(0)
const sketchTrackProgress = ref(0)
const sketchCompletedCount = ref(0)
const edgeProgress = ref(0)
const groundArrowIndex = ref(0)
const groundArrowProgress = ref(0)
const refineProgress = ref(0)
const finishProgress = ref(0)

const boardRef = ref(null)
const guideAssetsReady = ref(false)
const sketchGuideOverlays = ref([])
const pointerState = reactive({
  active: false,
  engaged: false,
  id: null,
  lastX: 0,
  lastY: 0,
  lastTs: 0,
})
const floatingTool = reactive({
  x: 0.5,
  y: 0.5,
})

const queuedTimers = new Set()
let audioContext = null
let stageAssetsPreloadPromise = null

const currentStageMeta = computed(() => stageMeta[currentStage.value])
const currentTool = computed(() => toolCatalog.find(tool => tool.id === currentStageMeta.value.tool) ?? null)
const shelfToolLabel = computed(() => shelfTools.find(tool => tool.id === hoveredShelfToolId.value)?.name ?? '')
const showProgress = computed(() => ['polish', 'sketch', 'edge', 'ground', 'refine', 'finish'].includes(currentStage.value))

const sketchImage = computed(() => {
  if (sketchCompletedCount.value <= 0) return ''
  return draftImages[Math.min(sketchCompletedCount.value - 1, draftImages.length - 1)]
})

const currentSketchDraft = computed(() => draftImages[sketchTrackIndex.value] ?? '')
const currentSketchGuide = computed(() => sketchGuideOverlays.value[sketchTrackIndex.value] ?? '')

const groundImage = computed(() => {
  if (groundArrowIndex.value <= 0) return ''
  return groundImages[Math.min(groundArrowIndex.value - 1, groundImages.length - 1)]
})

const currentGroundArrow = computed(() => groundArrows[groundArrowIndex.value] ?? null)
const floatingToolMeta = computed(() => {
  if (!currentTool.value) return null
  switch (currentTool.value.id) {
    case 'sandpaper': return { src: sandpaperDraggedAsset }
    case 'brush': return { src: brushToolAsset }
    case 'knife-large': return { src: toolLargeFlat }
    case 'knife-small': return { src: toolSmallFlat }
    default: return null
  }
})

const stageProgress = computed(() => {
  switch (currentStage.value) {
    case 'intro': return 0
    case 'select':
      if (selectionPhase.value === 'preparing') return prepVideoProgress.value
      return selectedMaterialId.value ? 1 : 0
    case 'polish': return polishProgress.value
    case 'sketch':
      if (sketchCompletedCount.value >= draftGuideImages.length) return 1
      return (sketchCompletedCount.value + sketchTrackProgress.value) / draftGuideImages.length
    case 'edge': return edgeProgress.value
    case 'ground':
      if (groundArrowIndex.value >= groundArrows.length) return 1
      return (groundArrowIndex.value + groundArrowProgress.value) / groundArrows.length
    case 'refine': return refineProgress.value
    case 'finish': return finishProgress.value
    case 'result': return 1
    default: return 0
  }
})

const currentMessage = computed(() => messageOverride.value || getDefaultMessage())
const currentMessageTone = computed(() => (messageOverride.value ? messageTone.value : getDefaultTone()))

function getMaskBounds(mask) {
  let minX = mask.width
  let minY = mask.height
  let maxX = 0
  let maxY = 0
  let hasOpaquePixel = false

  for (let y = 0; y < mask.height; y += 1) {
    for (let x = 0; x < mask.width; x += 1) {
      if (mask.alpha[y * mask.width + x] <= 24) continue
      hasOpaquePixel = true
      minX = Math.min(minX, x)
      minY = Math.min(minY, y)
      maxX = Math.max(maxX, x)
      maxY = Math.max(maxY, y)
    }
  }

  return hasOpaquePixel
    ? { minX, minY, maxX, maxY }
    : { minX: 0, minY: 0, maxX: mask.width - 1, maxY: mask.height - 1 }
}

function buildMask(source, alpha) {
  return {
    width: source.width,
    height: source.height,
    alpha,
    bounds: getMaskBounds({ width: source.width, height: source.height, alpha }),
  }
}

function createDeltaMask(currentMask, previousMask) {
  if (!previousMask) return buildMask(currentMask, currentMask.alpha)
  const alpha = new Uint8ClampedArray(currentMask.alpha.length)
  let opaquePixels = 0
  for (let index = 0; index < alpha.length; index += 1) {
    const currentAlpha = currentMask.alpha[index]
    const previousAlpha = previousMask.alpha[index]
    if (currentAlpha > 24 && previousAlpha <= 24) {
      alpha[index] = currentAlpha
      opaquePixels += 1
    }
  }
  if (opaquePixels < 1200) return buildMask(currentMask, currentMask.alpha)
  return buildMask(currentMask, alpha)
}

function loadMaskFromAsset(src) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.decoding = 'async'
    image.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = image.naturalWidth
      canvas.height = image.naturalHeight
      const context = canvas.getContext('2d', { willReadFrequently: true })
      if (!context) {
        reject(new Error('Canvas context unavailable.'))
        return
      }
      context.drawImage(image, 0, 0)
      const { data } = context.getImageData(0, 0, canvas.width, canvas.height)
      const alpha = new Uint8ClampedArray(canvas.width * canvas.height)
      for (let index = 0, channel = 3; index < alpha.length; index += 1, channel += 4) {
        alpha[index] = data[channel]
      }
      resolve(buildMask({ width: canvas.width, height: canvas.height }, alpha))
    }
    image.onerror = () => reject(new Error(`Failed to load guide asset: ${src}`))
    image.src = src
  })
}

function createMaskOverlay(mask, color = [229, 109, 0]) {
  const canvas = document.createElement('canvas')
  canvas.width = mask.width
  canvas.height = mask.height
  const context = canvas.getContext('2d')
  if (!context) return ''
  const imageData = context.createImageData(mask.width, mask.height)
  for (let index = 0, channel = 0; index < mask.alpha.length; index += 1, channel += 4) {
    const alpha = mask.alpha[index]
    if (alpha <= 0) continue
    imageData.data[channel] = color[0]
    imageData.data[channel + 1] = color[1]
    imageData.data[channel + 2] = color[2]
    imageData.data[channel + 3] = Math.min(255, Math.round(alpha * 0.9))
  }
  context.putImageData(imageData, 0, 0)
  return canvas.toDataURL('image/png')
}

async function ensureGuideMasksLoaded() {
  if (guideAssetsReady.value || typeof window === 'undefined') return
  try {
    const sketchMasks = await Promise.all(draftGuideImages.map(image => loadMaskFromAsset(image)))
    guideMasks.sketch = sketchMasks.map((mask, index) => createDeltaMask(mask, index > 0 ? sketchMasks[index - 1] : null))
    sketchGuideOverlays.value = guideMasks.sketch.map(mask => createMaskOverlay(mask))
    guideMasks.edge = await loadMaskFromAsset(outlineGuide)
    guideAssetsReady.value = true
  } catch {
    guideMasks.sketch = []
    guideMasks.edge = null
    sketchGuideOverlays.value = []
    guideAssetsReady.value = false
  }
}

function queueTimeout(callback, delay) {
  const id = window.setTimeout(() => {
    queuedTimers.delete(id)
    callback()
  }, delay)
  queuedTimers.add(id)
  return id
}

function waitForIntroGuide(delay) {
  return new Promise(resolve => {
    queueTimeout(resolve, delay)
  })
}

function clearQueuedTimers() {
  queuedTimers.forEach(id => window.clearTimeout(id))
  queuedTimers.clear()
}

function resetPointerState() {
  pointerState.active = false
  pointerState.engaged = false
  pointerState.id = null
  pointerState.lastX = 0
  pointerState.lastY = 0
  pointerState.lastTs = 0
}

function resetSelectionState() {
  hoveredMaterialId.value = ''
  selectedMaterialId.value = ''
  selectionPhase.value = 'pick'
  selectionShakeId.value = ''
  prepIndex.value = -1
  prepVideoProgress.value = 0
}

function clearShelfToolHover(id) {
  if (hoveredShelfToolId.value === id) hoveredShelfToolId.value = ''
}

function handleShelfToolClick(item) {
  if (!currentTool.value || item.actionId !== currentTool.value.id || interactionLocked.value) return
  activateTool(item.actionId)
}

function resetWorkshop() {
  clearQueuedTimers()
  resetPointerState()
  introVideoPlaying.value = false
  introGuideVisible.value = false
  introGuideStep.value = 0
  introGuideTypedParagraphs.value = introGuideParagraphs.map(() => '')
  introGuideAnimating.value = false
  introGuideFading.value = false
  stageTransitionVisible.value = false
  hoveredShelfToolId.value = ''
  resetSelectionState()
  toolSelected.value = false
  interactionLocked.value = false
  messageOverride.value = ''
  messageTone.value = 'info'
  polishProgress.value = 0
  sketchTrackIndex.value = 0
  sketchTrackProgress.value = 0
  sketchCompletedCount.value = 0
  edgeProgress.value = 0
  groundArrowIndex.value = 0
  groundArrowProgress.value = 0
  refineProgress.value = 0
  finishProgress.value = 0
  currentStage.value = 'intro'
}

function enterStage(stage) {
  resetPointerState()
  hoveredShelfToolId.value = ''
  toolSelected.value = false
  interactionLocked.value = false
  messageOverride.value = ''
  messageTone.value = 'info'

  switch (stage) {
    case 'select': resetSelectionState(); break
    case 'polish': polishProgress.value = 0; break
    case 'sketch':
      sketchTrackIndex.value = 0
      sketchTrackProgress.value = 0
      sketchCompletedCount.value = 0
      break
    case 'edge': edgeProgress.value = 0; break
    case 'ground':
      groundArrowIndex.value = 0
      groundArrowProgress.value = 0
      break
    case 'refine': refineProgress.value = 0; break
    case 'finish': finishProgress.value = 0; break
    case 'result': break
    default: break
  }

  currentStage.value = stage

  if (stage === 'sketch' || stage === 'edge') ensureGuideMasksLoaded()
}

function enterStageWithBlackTransition(stage) {
  stageTransitionVisible.value = true

  queueTimeout(() => {
    enterStage(stage)

    queueTimeout(() => {
      stageTransitionVisible.value = false
    }, 360)
  }, 360)
}

async function startWorkshop() {
  await preloadStageAssets()
  enterStage('select')
}

function playIntroVideo() {
  introGuideStep.value = 0
  introGuideTypedParagraphs.value = introGuideParagraphs.map(() => '')
  introGuideAnimating.value = false
  introGuideFading.value = false
  introGuideVisible.value = false
  introVideoPlaying.value = true
}

function finishIntroVideo() {
  if (!introVideoPlaying.value) return
  introVideoPlaying.value = false
  introGuideVisible.value = true
  introGuideStep.value = 0
}

async function advanceIntroGuide() {
  if (introGuideAnimating.value || introGuideFading.value) return

  if (introGuideStep.value >= introGuideParagraphs.length) {
    await waitForIntroGuide(2000)
    introGuideFading.value = true
    await waitForIntroGuide(1000)
    introGuideVisible.value = false
    introGuideFading.value = false
    await startWorkshop()
    return
  }

  const paragraphIndex = introGuideStep.value
  const paragraph = introGuideParagraphs[paragraphIndex]
  introGuideStep.value += 1
  introGuideAnimating.value = true

  for (let charIndex = 1; charIndex <= paragraph.length; charIndex += 1) {
    introGuideTypedParagraphs.value[paragraphIndex] = paragraph.slice(0, charIndex)
    await waitForIntroGuide(32)
  }

  introGuideAnimating.value = false
}

function preloadImage(src) {
  return new Promise(resolve => {
    const image = new Image()
    image.onload = resolve
    image.onerror = resolve
    image.src = src
  })
}

function preloadStageAssets() {
  if (typeof window === 'undefined') return Promise.resolve()
  if (!stageAssetsPreloadPromise) {
    const fontLoads = document.fonts
      ? [
          document.fonts.load('30px 源流明體'),
          document.fonts.load('600 30px 源流明體'),
          document.fonts.load('15px 思源黑体'),
          document.fonts.load('12px 思源黑体'),
          document.fonts.load('20px 字体圈欣意吉祥宋'),
        ].map(promise => promise.catch(() => {}))
      : []
    stageAssetsPreloadPromise = Promise.all([
      ...stagePreloadAssets.map(preloadImage),
      ...fontLoads,
    ]).then(() => undefined)
  }
  return stageAssetsPreloadPromise
}

async function activateTool(toolId) {
  if (!currentTool.value || currentTool.value.id !== toolId || interactionLocked.value) return
  if ((currentStage.value === 'sketch' || currentStage.value === 'edge') && !guideAssetsReady.value) {
    await ensureGuideMasksLoaded()
  }
  toolSelected.value = true
  moveToolToStageAnchor()
  setStageMessage(getToolActivatedMessage(), 'info')
  playFeedbackTone('activate')
}

function setStageMessage(text, tone = 'info', autoClearMs = 0) {
  messageOverride.value = text
  messageTone.value = tone
  if (autoClearMs > 0) {
    queueTimeout(() => {
      if (messageOverride.value === text) {
        messageOverride.value = ''
        messageTone.value = 'info'
      }
    }, autoClearMs)
  }
}

function getDefaultMessage() {
  switch (currentStage.value) {
    case 'intro': return currentStageMeta.value.toolHint
    case 'select':
      if (selectionPhase.value === 'preparing') return prepIndex.value >= 0 ? `整料工序进行中：${PREP_STEPS[prepIndex.value]}` : '正在调度整料工序。'
      if (selectionPhase.value === 'locked') return '选材正确，这块竹片表皮完整，适合留青雕刻。'
      return currentStageMeta.value.task
    case 'polish':
      if (polishProgress.value >= 1) return currentStageMeta.value.successText
      return toolSelected.value ? currentStageMeta.value.activeHint : currentStageMeta.value.toolHint
    case 'sketch':
      if (sketchCompletedCount.value >= draftGuideImages.length) return currentStageMeta.value.successText
      return toolSelected.value ? `轨迹${sketchTrackIndex.value + 1}引导已显示，拖住按图案边缘移动。` : currentStageMeta.value.toolHint
    case 'edge':
      if (edgeProgress.value >= 1) return currentStageMeta.value.successText
      return toolSelected.value ? currentStageMeta.value.activeHint : currentStageMeta.value.toolHint
    case 'ground':
      if (groundArrowIndex.value >= groundArrows.length) return currentStageMeta.value.successText
      return toolSelected.value ? `请沿第${groundArrowIndex.value + 1}道箭头横向拖动。` : currentStageMeta.value.toolHint
    case 'refine':
      if (refineProgress.value >= 1) return currentStageMeta.value.successText
      return toolSelected.value ? currentStageMeta.value.activeHint : currentStageMeta.value.toolHint
    case 'finish':
      if (finishProgress.value >= 1) return currentStageMeta.value.successText
      return toolSelected.value ? currentStageMeta.value.activeHint : currentStageMeta.value.toolHint
    case 'result': return currentStageMeta.value.toolHint
    default: return ''
  }
}

function getDefaultTone() {
  switch (currentStage.value) {
    case 'result': return 'success'
    case 'select': return selectionPhase.value === 'locked' || selectionPhase.value === 'preparing' ? 'success' : 'info'
    default: return stageProgress.value >= 1 ? 'success' : 'info'
  }
}

function getBoardPoint(event) {
  if (!boardRef.value) return null
  const rect = boardRef.value.getBoundingClientRect()
  const x = clamp((event.clientX - rect.left) / rect.width, 0, 1)
  const y = clamp((event.clientY - rect.top) / rect.height, 0, 1)
  return { x, y }
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y)
}

function updateFloatingTool(point) {
  floatingTool.x = point.x
  floatingTool.y = point.y
}

function getMaskAnchor(mask) {
  if (!mask) return { x: 0.5, y: 0.5 }
  const { minX, minY, maxX, maxY } = mask.bounds
  const targetX = Math.round(minX + (maxX - minX) * 0.14)
  const targetY = Math.round(minY + (maxY - minY) * 0.22)
  for (let radius = 0; radius <= 80; radius += 4) {
    for (let offsetY = -radius; offsetY <= radius; offsetY += 4) {
      for (let offsetX = -radius; offsetX <= radius; offsetX += 4) {
        const x = clamp(targetX + offsetX, 0, mask.width - 1)
        const y = clamp(targetY + offsetY, 0, mask.height - 1)
        if (mask.alpha[y * mask.width + x] > 24) {
          return { x: x / (mask.width - 1), y: y / (mask.height - 1) }
        }
      }
    }
  }
  return { x: (minX + maxX) / 2 / (mask.width - 1), y: (minY + maxY) / 2 / (mask.height - 1) }
}

function getStageToolAnchor() {
  switch (currentStage.value) {
    case 'polish': return { x: 0.5, y: 0.5 }
    case 'sketch': return getMaskAnchor(guideMasks.sketch[sketchTrackIndex.value] ?? null)
    case 'edge': return getMaskAnchor(guideMasks.edge)
    case 'ground': return currentGroundArrow.value ? { x: currentGroundArrow.value.startX, y: currentGroundArrow.value.y } : { x: 0.16, y: 0.29 }
    case 'refine': return { x: 0.62, y: 0.48 }
    case 'finish': return { x: 0.84, y: 0.22 }
    default: return { x: 0.5, y: 0.5 }
  }
}

function moveToolToStageAnchor() {
  updateFloatingTool(getStageToolAnchor())
}

function getToolActivatedMessage() {
  switch (currentStage.value) {
    case 'polish': return '砂纸已移动到竹片上，拖住移动，把角角落落都打磨到位'
    case 'sketch': return `毛笔已移动到轨迹${sketchTrackIndex.value + 1}起点，拖住按轨迹移动`
    case 'edge': return '大号平口刀已移动到竹片上，拖住移动'
    case 'ground': return '拖住，按竹子的肌理方向移动'
    case 'refine': return '拖住移动，精心雕刻角角落落'
    case 'finish': return '拖住移动，铲平背景'
    default: return currentStageMeta.value.toolHint
  }
}

function isInsideWorkingBoard(point) {
  return point.x >= 0.05 && point.x <= 0.95 && point.y >= 0.12 && point.y <= 0.88
}

function isInsideAnyHotspot(point) {
  return refineHotspots.some(hotspot => Math.hypot(point.x - hotspot.x, point.y - hotspot.y) <= hotspot.radius)
}

function isInsideAnyFinishZone(point) {
  return finishZones.some(zone =>
    point.x >= zone.x && point.x <= zone.x + zone.width && point.y >= zone.y && point.y <= zone.y + zone.height
  )
}

function isPointOnMask(mask, point, radius = 22, threshold = 24) {
  if (!mask) return false
  const centerX = clamp(Math.round(point.x * (mask.width - 1)), 0, mask.width - 1)
  const centerY = clamp(Math.round(point.y * (mask.height - 1)), 0, mask.height - 1)
  for (let offsetY = -radius; offsetY <= radius; offsetY += 3) {
    for (let offsetX = -radius; offsetX <= radius; offsetX += 3) {
      const x = clamp(centerX + offsetX, 0, mask.width - 1)
      const y = clamp(centerY + offsetY, 0, mask.height - 1)
      if (mask.alpha[y * mask.width + x] > threshold) return true
    }
  }
  return false
}

function isInsideCurrentSketchGuide(point) {
  if (!guideAssetsReady.value) return isInsideWorkingBoard(point)
  return isPointOnMask(guideMasks.sketch[sketchTrackIndex.value] ?? null, point, 28, 24)
}

function isInsideEdgeGuide(point) {
  if (!guideAssetsReady.value) return isInsideWorkingBoard(point)
  return isPointOnMask(guideMasks.edge, point, 22, 24)
}

function canStartSketch(point) {
  return distance(point, getStageToolAnchor()) <= 0.08 || isInsideCurrentSketchGuide(point)
}

function canStartGround(point) {
  const arrow = currentGroundArrow.value
  if (!arrow) return false
  return distance(point, { x: arrow.startX, y: arrow.y }) <= 0.12 || Math.abs(point.y - arrow.y) <= 0.1
}

function completeStage(successText, nextStage) {
  if (interactionLocked.value) return
  interactionLocked.value = true
  toolSelected.value = false
  setStageMessage(successText, 'success')
  playFeedbackTone('success')
  queueTimeout(() => enterStageWithBlackTransition(nextStage), 1000)
}

function accumulateTimedProgress(progressRef, point, distanceDelta, deltaTime, validator, durationMs = 3200) {
  if (interactionLocked.value) return
  if (distanceDelta < 0.0012 || deltaTime <= 0) return
  if (!validator(point)) return
  progressRef.value = clamp(progressRef.value + deltaTime / durationMs, 0, 1)
}

function handleSketchProgress(point, distanceDelta, deltaTime) {
  if (interactionLocked.value) return
  accumulateTimedProgress(sketchTrackProgress, point, distanceDelta, deltaTime, isInsideCurrentSketchGuide, 950)
  if (sketchTrackProgress.value >= 1) {
    const finishedTrack = sketchTrackIndex.value + 1
    sketchCompletedCount.value += 1
    sketchTrackIndex.value += 1
    sketchTrackProgress.value = 0
    pointerState.engaged = false
    playFeedbackTone('success')
    if (sketchCompletedCount.value >= draftGuideImages.length) {
      completeStage(currentStageMeta.value.successText, 'edge')
      return
    }
    if (toolSelected.value) moveToolToStageAnchor()
    setStageMessage(`画稿${finishedTrack}完成，继续描绘轨迹${sketchTrackIndex.value + 1}。`, 'success', 1000)
  }
}

function handleGroundProgress(point) {
  if (interactionLocked.value || !currentGroundArrow.value) return
  const arrow = currentGroundArrow.value
  if (Math.abs(point.y - arrow.y) > 0.12) return
  const progress = clamp((point.x - arrow.startX) / (arrow.endX - arrow.startX), 0, 1)
  groundArrowProgress.value = Math.max(groundArrowProgress.value, progress)
  if (groundArrowProgress.value >= 0.68) {
    const finishedArrow = groundArrowIndex.value + 1
    groundArrowIndex.value += 1
    groundArrowProgress.value = 0
    pointerState.engaged = false
    playFeedbackTone('success')
    if (groundArrowIndex.value >= groundArrows.length) {
      completeStage(currentStageMeta.value.successText, 'refine')
      return
    }
    if (toolSelected.value) moveToolToStageAnchor()
    setStageMessage(`第${finishedArrow}道铲底完成，继续顺着下一道箭头推进。`, 'success', 1000)
  }
}

function handleBoardPointerEnter(event) {
  const point = getBoardPoint(event)
  if (!point) return
  updateFloatingTool(point)
}

function handleBoardPointerDown(event) {
  if (!toolSelected.value || interactionLocked.value) return
  const point = getBoardPoint(event)
  if (!point) return
  boardRef.value?.setPointerCapture?.(event.pointerId)
  updateFloatingTool(point)
  pointerState.active = true
  pointerState.id = event.pointerId
  pointerState.lastX = point.x
  pointerState.lastY = point.y
  pointerState.lastTs = performance.now()

  if (currentStage.value === 'sketch') {
    pointerState.engaged = canStartSketch(point)
    if (!pointerState.engaged) setStageMessage(`请从轨迹${sketchTrackIndex.value + 1}的起点落笔。`, 'warning', 1200)
    return
  }
  if (currentStage.value === 'ground') {
    pointerState.engaged = canStartGround(point)
    if (!pointerState.engaged) setStageMessage('请从箭头起点出发，按箭头方向横向拖动。', 'warning', 1200)
    return
  }
  if (currentStage.value === 'edge') {
    pointerState.engaged = isInsideEdgeGuide(point)
    if (!pointerState.engaged) setStageMessage('请沿图案轮廓落刀，拖住移动。', 'warning', 1200)
    return
  }
  pointerState.engaged = true
}

function handleBoardPointerMove(event) {
  const point = getBoardPoint(event)
  if (!point) return
  updateFloatingTool(point)
  if (!pointerState.active || pointerState.id !== event.pointerId) return

  const currentTs = performance.now()
  const deltaTime = Math.min(currentTs - pointerState.lastTs, 64)
  const distanceDelta = Math.hypot(point.x - pointerState.lastX, point.y - pointerState.lastY)

  pointerState.lastX = point.x
  pointerState.lastY = point.y
  pointerState.lastTs = currentTs

  if (currentStage.value === 'sketch') {
    if (!pointerState.engaged) pointerState.engaged = canStartSketch(point)
    if (pointerState.engaged) handleSketchProgress(point, distanceDelta, deltaTime)
    return
  }
  if (currentStage.value === 'ground') {
    if (!pointerState.engaged) pointerState.engaged = canStartGround(point)
    if (pointerState.engaged) handleGroundProgress(point)
    return
  }
  if (!pointerState.engaged) return

  if (currentStage.value === 'polish') {
    accumulateTimedProgress(polishProgress, point, distanceDelta, deltaTime, isInsideWorkingBoard)
    if (polishProgress.value >= 1) completeStage(currentStageMeta.value.successText, 'sketch')
    return
  }
  if (currentStage.value === 'edge') {
    accumulateTimedProgress(edgeProgress, point, distanceDelta, deltaTime, isInsideEdgeGuide)
    if (edgeProgress.value >= 1) completeStage(currentStageMeta.value.successText, 'ground')
    return
  }
  if (currentStage.value === 'refine') {
    accumulateTimedProgress(refineProgress, point, distanceDelta, deltaTime, isInsideAnyHotspot, 1400)
    if (refineProgress.value >= 1) completeStage(currentStageMeta.value.successText, 'finish')
    return
  }
  if (currentStage.value === 'finish') {
    accumulateTimedProgress(finishProgress, point, distanceDelta, deltaTime, isInsideAnyFinishZone, 1400)
    if (finishProgress.value >= 1) completeStage(currentStageMeta.value.successText, 'result')
  }
}

function handleBoardPointerUp() {
  resetPointerState()
}

function handleBoardPointerCancel() {
  resetPointerState()
}

function getArrowProgressX(arrow) {
  return arrow.startX + (arrow.endX - arrow.startX) * groundArrowProgress.value
}

function handleMaterialHover(id) {
  if (selectionPhase.value !== 'pick') return
  hoveredMaterialId.value = id
}

function clearMaterialHover(id) {
  if (hoveredMaterialId.value === id) hoveredMaterialId.value = ''
}

function selectMaterial(id) {
  if (selectionPhase.value !== 'pick') return
  if (id === 'B') {
    selectedMaterialId.value = id
    selectionPhase.value = 'locked'
    playFeedbackTone('success')
    setStageMessage('选材正确，这块竹片表皮完整，适合留青雕刻。', 'success')
    queueTimeout(() => {
      selectionPhase.value = 'preparing'
      messageOverride.value = ''
      messageTone.value = 'info'
      prepIndex.value = -1
      prepVideoProgress.value = 0
    }, 620)
    return
  }
  selectionShakeId.value = id
  playFeedbackTone('error')
  setStageMessage('这块竹片有损伤，不适合留青工艺，请再考虑考虑。', 'warning', 1500)
  queueTimeout(() => {
    if (selectionShakeId.value === id) selectionShakeId.value = ''
  }, 520)
}

function replayWorkshop() {
  resetWorkshop()
  startWorkshop()
}

function backHome() {
  resetWorkshop()
}

function handlePrepVideoEnded() {
  if (currentStage.value !== 'select' || selectionPhase.value !== 'preparing') return
  prepVideoProgress.value = 1
  setStageMessage('竹料准备完成', 'success')
  queueTimeout(() => enterStageWithBlackTransition('polish'), 700)
}

function handlePrepVideoProgress(event) {
  const video = event.currentTarget
  if (!video?.duration || Number.isNaN(video.duration)) return
  prepVideoProgress.value = clamp(video.currentTime / video.duration, 0, 1)
}

function playFeedbackTone(type) {
  if (typeof window === 'undefined') return
  const AudioContextClass = window.AudioContext || window.webkitAudioContext
  if (!AudioContextClass) return
  if (!audioContext) audioContext = new AudioContextClass()
  if (audioContext.state === 'suspended') audioContext.resume().catch(() => {})
  const start = audioContext.currentTime
  const gainNode = audioContext.createGain()
  gainNode.connect(audioContext.destination)
  gainNode.gain.setValueAtTime(0.0001, start)
  const frequencies = type === 'success' ? [523.25, 659.25] : type === 'error' ? [246.94, 196] : [329.63]
  frequencies.forEach((frequency, index) => {
    const oscillator = audioContext.createOscillator()
    oscillator.type = type === 'error' ? 'triangle' : 'sine'
    oscillator.frequency.setValueAtTime(frequency, start + index * 0.05)
    oscillator.connect(gainNode)
    oscillator.start(start + index * 0.05)
    oscillator.stop(start + 0.18 + index * 0.04)
  })
  gainNode.gain.exponentialRampToValueAtTime(0.1, start + 0.02)
  gainNode.gain.exponentialRampToValueAtTime(0.0001, start + 0.32)
}

onMounted(() => {
  ensureGuideMasksLoaded()
  preloadStageAssets()
})
onBeforeUnmount(() => clearQueuedTimers())
</script>

<template>
  <div class="workshop" :class="{ 'is-stage-view': currentStage !== 'intro' }">
    <div class="workshop__backdrop"></div>
    <div class="stage-preload" aria-hidden="true">
      <img v-for="asset in stagePreloadAssets" :key="asset" :src="asset" alt="" />
      <span class="stage-preload__panel-title">选材整料</span>
      <span class="stage-preload__body">留青工艺先看竹青</span>
      <span class="stage-preload__title">工具提示</span>
    </div>

    <div v-if="currentStage === 'intro'" class="intro-view">
      <button class="intro-start-btn" @click="playIntroVideo">
        <span class="sr-only">开始游戏</span>
      </button>
    </div>

    <div v-if="introVideoPlaying" class="intro-video-layer" aria-label="工坊开场动画">
      <video
        class="intro-video"
        :src="introVideoAsset"
        autoplay
        playsinline
        @ended="finishIntroVideo"
        @error="finishIntroVideo"
      ></video>
    </div>

    <button
      v-if="introGuideVisible"
      type="button"
      class="intro-guide-layer"
      :class="{ 'is-fading': introGuideFading }"
      aria-label="竹艺工坊引导"
      @click="advanceIntroGuide"
    >
      <span class="intro-guide__stage-bg" aria-hidden="true">
        <span class="intro-guide__shelf-bg"></span>
        <span class="intro-guide__main-bg"></span>
      </span>
      <span class="intro-guide__shade" aria-hidden="true"></span>
      <span class="intro-guide__panel">
        <img :src="introGuideAsset" alt="" aria-hidden="true" class="intro-guide__asset" />
        <span class="intro-guide__copy">
          <span
            v-for="(paragraph, index) in introGuideTypedParagraphs"
            :key="introGuideParagraphs[index]"
            class="intro-guide__paragraph"
            :class="{ 'is-visible': index < introGuideStep }"
          >
            {{ paragraph }}
          </span>
        </span>
      </span>
    </button>

    <div
      v-else-if="currentStage !== 'intro'"
      class="stage-layout"
      :class="{ 'stage-layout--selection': currentStage === 'select' }"
    >
      <div class="tool-shelf">
        <div class="tool-shelf__strip"></div>
        <div class="tool-shelf__toolbox">
          <img :src="toolboxAsset" alt="工具箱" />
        </div>
        <div class="tool-shelf__items">
          <button
            v-for="item in shelfTools"
            :key="item.id"
            type="button"
            class="tool-shelf__item"
            :class="{
              'is-current': currentTool && item.actionId === currentTool.id,
              'is-armed': toolSelected && currentTool && item.actionId === currentTool.id,
              'is-clickable': currentTool && item.actionId === currentTool.id && !interactionLocked,
            }"
            :style="{
              '--tool-width': item.width,
              '--tool-rotate': item.rotate,
              '--tool-lift': item.lift,
            }"
            :disabled="Boolean(item.actionId) && interactionLocked && currentTool && item.actionId === currentTool.id"
            @mouseenter="hoveredShelfToolId = item.id"
            @mouseleave="clearShelfToolHover(item.id)"
            @click="handleShelfToolClick(item)"
          >
            <img :src="item.image" :alt="item.name" class="tool-shelf__image" />
            <span class="tool-shelf__tooltip">{{ item.name }}</span>
          </button>
        </div>
        <p v-if="currentTool" class="tool-shelf__hint">
          工具提示
          <span>{{ shelfToolLabel || currentTool.name }}</span>
        </p>
      </div>

      <div class="stage-main">
        <aside class="master-panel">
          <img :src="masterPanelAsset" alt="" class="master-panel__frame" />
          <div class="master-panel__content">
            <h2>{{ currentStageMeta.title }}</h2>
            <p class="master-panel__tip">{{ currentStageMeta.tip }}</p>
            <!-- <div class="master-panel__feedback">
              <p class="master-panel__label">交互说明</p>
              <p class="master-panel__message">{{ currentMessage }}</p>
            </div> -->
          </div>
        </aside>

        <div class="board-area">
          <section v-if="currentStage === 'select'" class="board board--selection">
            <transition name="fade" mode="out-in">
              <div v-if="selectionPhase !== 'preparing'" key="pick" class="material-grid">
                <button
                  v-for="card in materialCards"
                  :key="card.id"
                  class="material-card"
                  :class="{
                    'is-dimmed': hoveredMaterialId && hoveredMaterialId !== card.id,
                    'is-selected': selectionPhase === 'locked' && selectedMaterialId === card.id,
                    'is-ghosted': selectionPhase === 'locked' && selectedMaterialId !== card.id,
                    'is-shaking': selectionShakeId === card.id,
                  }"
                  @mouseenter="handleMaterialHover(card.id)"
                  @mouseleave="clearMaterialHover(card.id)"
                  @click="selectMaterial(card.id)"
                >
                  <img :src="card.image" :alt="card.name" class="material-card__image" />
                </button>
              </div>
              <div v-else key="prepare" class="prep-video">
                <video
                  :src="prepVideoAsset"
                  class="prep-video__media"
                  autoplay
                  muted
                  playsinline
                  @loadedmetadata="handlePrepVideoProgress"
                  @timeupdate="handlePrepVideoProgress"
                  @ended="handlePrepVideoEnded"
                  @error="handlePrepVideoEnded"
                ></video>
              </div>
            </transition>
          </section>

          <section v-else-if="currentStage === 'result'" class="result-stage">
            <div class="board stage-board--result">
              <img :src="finalArtwork" alt="成品" class="board__image" />
            </div>
            <div class="result-actions">
              <button class="primary-btn" @click="replayWorkshop">再做一遍</button>
              <button class="ghost-btn" @click="backHome">返回首页</button>
            </div>
          </section>

          <section
            v-else
            ref="boardRef"
            class="board game-board"
            :class="{ 'is-armed': toolSelected }"
            @pointerenter="handleBoardPointerEnter"
            @pointerdown.prevent="handleBoardPointerDown"
            @pointermove.prevent="handleBoardPointerMove"
            @pointerup="handleBoardPointerUp"
            @pointercancel="handleBoardPointerCancel"
          >
            <template v-if="currentStage === 'polish'">
              <img :src="roughBoard" alt="粗糙竹片" class="board__image" />
              <img
                :src="smoothStrip"
                alt="光滑竹片"
                class="board__image board__image--reveal"
                :style="{ opacity: polishProgress }"
              />
            </template>

            <template v-else-if="currentStage === 'sketch'">
              <img :src="smoothStrip" alt="光滑竹片" class="board__image board__image--stretch" />
              <img
                v-if="sketchImage"
                :src="sketchImage"
                alt="描稿进度"
                class="board__image board__image--reveal"
              />
              <img
                v-if="currentSketchDraft"
                :src="currentSketchDraft"
                alt="当前描稿"
                class="board__image board__image--reveal board__image--ink-progress"
                :style="{ opacity: sketchTrackProgress }"
              />
              <img
                v-if="toolSelected && currentSketchGuide"
                :src="currentSketchGuide"
                alt="描稿引导"
                class="board__guide-image board__guide-image--sketch"
                :style="{ opacity: 0.96 }"
              />
            </template>

            <template v-else-if="currentStage === 'edge'">
              <img :src="draft4" alt="画稿完成" class="board__image" />
              <img
                :src="edgedArtwork"
                alt="圈边图像"
                class="board__image board__image--reveal"
                :style="{ opacity: edgeProgress }"
              />
              <img
                v-if="toolSelected"
                :src="outlineGuide"
                alt="圈边引导"
                class="board__guide-image board__guide-image--edge"
                :style="{ opacity: 0.92 }"
              />
            </template>

            <template v-else-if="currentStage === 'ground'">
              <img :src="edgedArtwork" alt="圈边完成" class="board__image" />
              <img
                v-if="groundImage"
                :src="groundImage"
                alt="铲底进度"
                class="board__image board__image--reveal"
              />
              <svg
                v-if="toolSelected"
                class="board__guide"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <g v-for="(arrow, index) in groundArrows" :key="`${arrow.y}-${index}`">
                  <line
                    :x1="arrow.startX * 100"
                    :y1="arrow.y * 100"
                    :x2="arrow.endX * 100"
                    :y2="arrow.y * 100"
                    class="arrow-line"
                    :class="{
                      'is-complete': index < groundArrowIndex,
                      'is-active': index === groundArrowIndex,
                    }"
                  />
                  <polyline
                    :points="`${(arrow.endX - 0.02) * 100},${(arrow.y - 0.012) * 100} ${arrow.endX * 100},${arrow.y * 100} ${(arrow.endX - 0.02) * 100},${(arrow.y + 0.012) * 100}`"
                    class="arrow-head"
                    :class="{
                      'is-complete': index < groundArrowIndex,
                      'is-active': index === groundArrowIndex,
                    }"
                  />
                  <circle
                    :cx="arrow.startX * 100"
                    :cy="arrow.y * 100"
                    r="1.8"
                    class="arrow-start"
                    :class="{ 'is-active': index === groundArrowIndex }"
                  />
                </g>
                <line
                  v-if="currentGroundArrow"
                  :x1="currentGroundArrow.startX * 100"
                  :y1="currentGroundArrow.y * 100"
                  :x2="getArrowProgressX(currentGroundArrow) * 100"
                  :y2="currentGroundArrow.y * 100"
                  class="arrow-progress"
                />
              </svg>
            </template>

            <template v-else-if="currentStage === 'refine'">
              <img :src="chandi3" alt="铲底完成" class="board__image" />
              <img
                :src="fenyunArtwork"
                alt="分筠完成"
                class="board__image board__image--reveal"
                :style="{ opacity: refineProgress }"
              />
              <div v-if="toolSelected" class="board__atmosphere board__atmosphere--refine"></div>
            </template>

            <template v-else-if="currentStage === 'finish'">
              <img :src="fenyunArtwork" alt="分筠完成" class="board__image" />
              <img
                :src="finalArtwork"
                alt="成品生成"
                class="board__image board__image--reveal"
                :style="{ opacity: finishProgress }"
              />
              <div v-if="toolSelected" class="board__atmosphere board__atmosphere--finish"></div>
            </template>

            <div
              v-if="currentTool && toolSelected && floatingToolMeta"
              class="floating-tool"
              :class="[`floating-tool--${currentTool.id}`, { 'is-resting': !pointerState.active }]"
              :style="{
                left: `${floatingTool.x * 100}%`,
                top: `${floatingTool.y * 100}%`,
              }"
            >
              <img :src="floatingToolMeta.src" :alt="currentTool.name" class="floating-tool__image" />
            </div>
          </section>
        </div>

        <aside class="task-panel">
          <img :src="taskPanelAsset" alt="" class="task-panel__frame" />
          <div class="task-panel__content">
            <div class="task-panel__block">
              <h2>当前任务</h2>
              <p>{{ currentStageMeta.task }}</p>
            </div>
            <div class="task-panel__block">
              <h2>{{ currentStage === 'result' ? '工坊总结' : '工艺说明' }}</h2>
              <p>{{ currentStage === 'result' ? '留与去之间，竹青成画，竹肌成地。' : currentStageMeta.craft }}</p>
            </div>
            <div class="task-panel__progress">
              <div class="task-panel__progress-header">
                <span class="task-panel__percent">{{ Math.round(stageProgress * 100) }}%</span>
              </div>
              <div class="task-panel__bar">
                <span class="task-panel__fill" :style="{ width: `${stageProgress * 100}%` }"></span>
              </div>
              <p class="task-panel__label">{{ currentStageMeta.progressLabel }}</p>
            </div>
          </div>
        </aside>
      </div>
    </div>

    <div
      class="stage-black-transition"
      :class="{ 'is-visible': stageTransitionVisible }"
      aria-hidden="true"
    ></div>
  </div>
</template>

<style scoped>
@font-face {
  font-family: 'WorkshopTitle';
  src: url('@/assets/Fonts/ZiTiQuanXinYiJiXiangSong-2 字体圈欣意吉祥宋 Regular.ttf') format('truetype');
  font-display: block;
}
@font-face {
  font-family: '字体圈欣意吉祥宋';
  src: url('@/assets/Fonts/ZiTiQuanXinYiJiXiangSong-2 字体圈欣意吉祥宋 Regular.ttf') format('truetype');
  font-display: block;
}
@font-face {
  font-family: 'WorkshopBody';
  src: url('@/assets/Fonts/细体-思源黑体7号.otf') format('opentype');
  font-display: block;
}
@font-face {
  font-family: '思源黑体';
  src: url('@/assets/Fonts/细体-思源黑体7号.otf') format('opentype');
  font-display: block;
}
@font-face {
  font-family: 'WorkshopPanelTitle';
  src: url('@/assets/Fonts/NotoSerifSC-VF.ttf') format('truetype');
  font-weight: 300 700;
  font-display: block;
}
@font-face {
  font-family: '源流明體';
  src: url('@/assets/Fonts/NotoSerifSC-VF.ttf') format('truetype');
  font-weight: 300 700;
  font-display: block;
}

* {
  box-sizing: border-box;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.stage-preload {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  width: 1px;
  height: 1px;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
}

.stage-preload img {
  width: 1px;
  height: 1px;
}

.stage-preload__panel-title {
  font-family: '源流明體', 'WorkshopPanelTitle', serif;
}

.stage-preload__body {
  font-family: '思源黑体', 'WorkshopBody', sans-serif;
}

.stage-preload__title {
  font-family: '字体圈欣意吉祥宋', 'WorkshopTitle', serif;
}

.workshop {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  /* background: #050505;
  color: #ede6c3; */
  font-family: 'WorkshopBody', sans-serif;
}

.workshop__backdrop {
  position: absolute;
  inset: 0;
  z-index: 0;
  background: url('@/assets/Workshop/背景.png') center/cover no-repeat;
  pointer-events: none;
}

.workshop__backdrop::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.26) 100%);
}

/* .workshop.is-stage-view .workshop__backdrop {
  background-image: url('@/assets/Workshop/其他页面/background_2.png');
  background-position: center top;
} */

/* .workshop.is-stage-view .workshop__backdrop::after {
  background: linear-gradient(180deg, rgba(23,12,8,0.04) 0%, rgba(23,12,8,0.18) 52%, rgba(23,12,8,0.34) 100%);
} */

/* 初始界面 */
.intro-view {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding: 5vh 0;
}

.intro-start-btn {
  margin-top: auto;
  margin-bottom: 12vh;
  width: min(280px, 45vw);
  aspect-ratio: 600 / 236;
  border: none;
  background: url('@/assets/Workshop/button.png') center/contain no-repeat;
  background-color: transparent;
  cursor: pointer;
  filter: drop-shadow(0 20px 30px rgba(0,0,0,0.5));
  transition: transform 0.25s ease, filter 0.25s ease;
  animation: introBreathe 3s infinite ease-in-out;
}

.intro-start-btn:hover {
  transform: scale(1.02);
  filter: brightness(1.08) drop-shadow(0 20px 30px rgba(0,0,0,0.5));
}

.intro-video-layer {
  position: fixed;
  inset: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
}

.intro-video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.intro-guide-layer {
  position: fixed;
  inset: 0;
  z-index: 31;
  display: block;
  border: 0;
  padding: 0;
  overflow: hidden;
  background: transparent;
  color: #eee5c2;
  cursor: pointer;
  text-align: left;
}

.intro-guide__stage-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.intro-guide__shelf-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 165px;
  background: url('@/assets/Workshop/其他页面/background_1.png') center top / cover no-repeat;
}

.intro-guide__main-bg {
  position: absolute;
  top: 165px;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('@/assets/Workshop/其他页面/background_2.png') center top / cover no-repeat;
}

.intro-guide__shade {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: #000;
  opacity: 0.5;
  transition: opacity 1s ease;
}

.intro-guide__panel {
  position: absolute;
  z-index: 2;
  left: 50%;
  bottom: 0;
  width: min(92vw, 1380px);
  aspect-ratio: 2445 / 805;
  transform: translateX(-50%);
}

.intro-guide__asset {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
  user-select: none;
  opacity: 1;
  transition: opacity 1s ease;
}

.intro-guide__copy {
  position: absolute;
  left: 31.5%;
  top: 62.5%;
  width: 63%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #eee5c2;
  font-family: 'WorkshopTitle', '字体圈欣意吉祥宋', serif;
  font-size: 15px;
  line-height: 21px;
  letter-spacing: 0;
  opacity: 1;
  transition: opacity 1s ease;
}

.intro-guide__paragraph {
  display: block;
  opacity: 0;
  transform: translateY(4px);
  transition:
    opacity 0.45s ease,
    transform 0.45s ease;
}

.intro-guide__paragraph.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.intro-guide-layer.is-fading .intro-guide__shade {
  opacity: 0;
}

.intro-guide-layer.is-fading .intro-guide__asset,
.intro-guide-layer.is-fading .intro-guide__copy {
  opacity: 0;
}

.stage-black-transition {
  position: fixed;
  inset: 0;
  z-index: 80;
  background: #000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.36s ease;
}

.stage-black-transition.is-visible {
  opacity: 1;
  pointer-events: auto;
}

@keyframes introBreathe {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

/* 工坊布局 */
.stage-layout {
  position: relative;
  z-index: 2;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  isolation: isolate;
}

/* 工具架：严格从页面顶部开始 */
.tool-shelf {
  position: relative;
  z-index: 8;
  flex: 0 0 auto;
  height: 220px;
  margin: 0;
  padding: 0 58px;
  overflow: visible;
}

/* 工具架底板 */
.tool-shelf__strip {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: url('@/assets/Workshop/其他页面/background_1.png') center top / cover no-repeat;
  opacity: 1;
}

/* 工具箱 */
.tool-shelf__toolbox {
  position: absolute;
  left: 96px;
  top: 70px;
  z-index: 2;
}

.tool-shelf__toolbox img {
  display: block;
  width: 118px;
  filter: drop-shadow(0 14px 16px rgba(0,0,0,0.32));
}

/* 工具排列层 */
.tool-shelf__items {
  position: absolute;
  left: 248px;
  right: 118px;
  top: 18px;
  height: 260px;
  z-index: 3;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  overflow: visible;
}

.tool-shelf__item {
  position: relative;
  flex: 0 1 auto;
  min-width: 54px;
  height: 260px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background: none;
  border: none;
  padding: 0;
  cursor: default;
  transition: transform 0.22s ease, opacity 0.22s ease;
  overflow: visible;
}

.tool-shelf__item.is-clickable {
  cursor: pointer;
}

.tool-shelf__item:nth-child(9) {
  margin-left: 22px;
}

.tool-shelf__item:nth-child(10) {
  margin-left: 10px;
}

/* 核心：工具图压在 shelf 上面，并且有一半从 shelf 底部溢出 */
.tool-shelf__image {
  position: relative;
  z-index: 4;
  width: 120%;
  transform: translateY(34px);
  transform-origin: 50% 0%;
  filter: drop-shadow(0 14px 14px rgba(0,0,0,0.34));
  transition: transform 0.22s ease, filter 0.22s ease;
}
.tool-shelf__item:last-child .tool-shelf__image {
  transform: translateY(70px) rotate(15deg) scale(0.4);
  margin-left:80px;
}

/* hover 仍然保持下半部分会被 stage-main 压住 */
.tool-shelf__item:hover .tool-shelf__image,
.tool-shelf__item.is-current .tool-shelf__image {
  transform: translateY(22px) rotate(var(--tool-rotate));
  filter:
    drop-shadow(0 18px 18px rgba(0,0,0,0.38))
    drop-shadow(0 0 10px rgba(238,229,194,0.18));
}
.tool-shelf__item:last-child:hover .tool-shelf__image,
.tool-shelf__item:last-child.is-current .tool-shelf__image {
  transform: translateY(30px) rotate(8deg) scale(0.5);
}

.tool-shelf__item.is-armed .tool-shelf__image {
  filter:
    drop-shadow(0 18px 20px rgba(0,0,0,0.42))
    drop-shadow(0 0 14px rgba(238,229,194,0.22));
}

.tool-shelf__tooltip {
  position: absolute;
  left: 50%;
  bottom: calc(100% + 8px);
  z-index: 10;
  transform: translateX(-50%);
  padding: 10px 16px;
  /* background: rgba(47,28,20,0.9);
  color: #efe4c4; */
  font-family: '字体圈欣意吉祥宋', 'WorkshopTitle', serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: 0;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.16s ease;
  pointer-events: none;
}

.tool-shelf__item:hover .tool-shelf__tooltip {
  opacity: 1;
}

.tool-shelf__hint {
  position: absolute;
  top: 16px;
  left: 50%;
  z-index: 9;
  transform: translateX(-50%);
  color: #efe4c4;
  text-align: center;
  font-family: '字体圈欣意吉祥宋', 'WorkshopTitle', serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: 0;
  text-shadow: 0 2px 6px rgba(0,0,0,0.26);
}

.tool-shelf__hint span {
  display: block;
  margin-top: 6px;
  color: #efe4c4;
  font-family: '字体圈欣意吉祥宋', 'WorkshopTitle', serif;
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 0;
}

/* 核心：stage-main 上移并盖住工具下半部分 */
/* 主内容区域 */
.stage-main {
  position: relative;
  z-index: 20;
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 2.2fr 1fr;
  gap: 2vw;
  align-items: center;
  padding: 0;
  margin-top: -55px;
  background: url('@/assets/Workshop/其他页面/background_2.png') center top / cover no-repeat;
}

/* 左右面板 */
.master-panel,
.task-panel {
  position: relative;
  width: min(100%, 320px);
  max-width: 320px;
  margin: 0 auto;
}
.task-panel {
  transform: none;
}
.master-panel__frame,
.task-panel__frame {
  display: block;
  width: 100%;
}
.master-panel__content{
  position: absolute;
  top:0%;
  left:20%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.master-panel__content h2 {
  font-family: '源流明體', 'WorkshopPanelTitle', serif; /* 对应源流明體 */
  font-weight: 600;
  font-size: 30px;
  letter-spacing: 0.1em;
  color: #ede6c3;
  -webkit-font-smoothing: antialiased;
  text-rendering: geometricPrecision;
}
.master-panel__tip {
  font-family: '思源黑体', 'WorkshopBody', sans-serif;
  font-weight: normal;
  font-size: 15px;
  line-height: 22pt;
  color: #bcad88;
  margin:10% 16%;
  -webkit-font-smoothing: antialiased;
  text-rendering: geometricPrecision;
}
.master-panel__feedback {
  margin-top: auto;
}
/* .master-panel__label {
  margin: 0 0 8px;
  font-family: 'WorkshopTitle', serif;
  font-size: clamp(16px, 1.3vw, 20px);
} */
/* .master-panel__message {
  margin: 0;
  color: #bcad88;
  font-size: clamp(13px, 1vw, 16px);
  line-height: 1.6;
} */
.task-panel__content{
  position: absolute;
  inset: 6.5% 7.5% 6.8% 8.5%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
}
.task-panel__block {
  margin: 0;
}
.task-panel__block h2 {
  font-family: '源流明體', 'WorkshopPanelTitle', serif; /* 对应源流明體 */
  font-weight: 600;
  font-size: 30px;
  line-height: 1;
  letter-spacing: 0.1em;
  color: #ede6c3;
  margin: 0 5% 5%;
  -webkit-font-smoothing: antialiased;
  text-rendering: geometricPrecision;
}
.task-panel__block p {
  margin: 0 5% 30%;
  color: #bcad88;
  font-family: '思源黑体', 'WorkshopBody', sans-serif;
  font-size: 12px;
  font-weight: normal;
  line-height: 18px;
  -webkit-font-smoothing: antialiased;
  text-rendering: geometricPrecision;
}
.task-panel__progress {
  margin-top: auto;
  color: #ede6c3;
}
.task-panel__progress-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 12px;
}
.task-panel__percent {
  font-family: '字体圈欣意吉祥宋', 'WorkshopTitle', serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 1;
  color: #ede6c3;
  letter-spacing: 0;
  -webkit-font-smoothing: antialiased;
}
.task-panel__bar {
  height: 16px;
  background: #7a5f4d;
  border-radius: 0;
  overflow: hidden;
}
.task-panel__fill {
  display: block;
  height: 100%;
  background: #d4caa2;
}
.task-panel__label {
  margin: 14px 0 0;
  font-family: '字体圈欣意吉祥宋', 'WorkshopTitle', serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.1;
  color: #ede6c3;
  letter-spacing: 0;
  -webkit-font-smoothing: antialiased;
}

/* 工作板区域 */
.board-area {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.board {
  position: relative;
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  touch-action: none;
}
.game-board,
.stage-board--result {
  aspect-ratio: 3565 / 1176;
}
.game-board {
  overflow: visible;
}

.board__image {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.board__image--reveal {
  transition: opacity 0.3s ease;
}
.board__image--stretch {
  object-fit: fill;
}
.board__guide {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.board__guide-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}
.board__guide-image--sketch {
  mix-blend-mode: screen;
  filter: sepia(0.2) saturate(1.2) brightness(1.05) drop-shadow(0 0 12px rgba(229,109,0,0.3));
}
.board__guide-image--edge {
  mix-blend-mode: screen;
  filter: brightness(1.05) drop-shadow(0 0 10px rgba(237,230,195,0.25));
}
.board__image--ink-progress {
  mix-blend-mode: multiply;
  transition: opacity 0.15s linear;
}
.board__atmosphere {
  position: absolute;
  inset: 0;
  pointer-events: none;
  mix-blend-mode: screen;
}
.board__atmosphere--refine {
  background: radial-gradient(circle at 30% 30%, rgba(246,216,146,0.12), transparent 20%),
              radial-gradient(circle at 60% 50%, rgba(241,194,125,0.12), transparent 20%);
  animation: breathe 2.5s infinite;
}
.board__atmosphere--finish {
  background: linear-gradient(90deg, rgba(246,216,146,0.06) 0%, transparent 20%, transparent 80%, rgba(246,216,146,0.06) 100%);
}
@keyframes breathe {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

/* 箭头样式 */
.arrow-line,
.arrow-head {
  fill: none;
  stroke: rgba(255,220,162,0.25);
  stroke-width: 1;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.arrow-line.is-active,
.arrow-head.is-active {
  stroke: rgba(246,216,146,0.9);
  filter: drop-shadow(0 0 6px rgba(246,216,146,0.4));
}
.arrow-line.is-complete,
.arrow-head.is-complete {
  stroke: rgba(227,130,66,0.7);
}
.arrow-start {
  fill: rgba(255,220,162,0.2);
  stroke: rgba(255,220,162,0.5);
  stroke-width: 0.5;
}
.arrow-start.is-active {
  fill: rgba(246,216,146,0.7);
  stroke: rgba(255,243,214,0.9);
}
.arrow-progress {
  stroke: rgba(227,130,66,0.9);
  stroke-width: 1.4;
  stroke-linecap: round;
  filter: drop-shadow(0 0 5px rgba(227,130,66,0.4));
}

/* 选材卡片 */
.board--selection {
  height: clamp(500px, 50vh, 526px);
  overflow: visible;
}
.material-grid {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(20px, 3vw, 50px);
  width: 100%;
  height: 100%;
  padding: 20px;
}
.stage-layout--selection .material-grid {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: clamp(76px, 7.5vw, 150px);
  padding: 0 clamp(20px, 2vw, 40px);
  width: 100%;
  height: 100%;
}
.material-card {
  position: relative;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: transform 0.25s ease, opacity 0.25s ease;
}
.stage-layout--selection .material-card {
  display: flex;
  align-items: center;
  justify-content: center;
  width: clamp(154px, 9.2vw, 176px);
  height: 100%;
  background: transparent;
  padding: 0;
  border: none;
  cursor: pointer;
  transition: transform 0.25s ease, opacity 0.25s ease;
}
.material-card:hover {
  transform: translateY(-8px);
}
.material-card.is-dimmed {
  opacity: 0.4;
}
.material-card.is-selected {
  transform: translateY(-6px) scale(1.02);
}
.material-card.is-ghosted {
  opacity: 0.1;
  pointer-events: none;
}
.material-card__image {
  width: auto;
  height: 80%;
  filter: drop-shadow(0 16px 20px rgba(0,0,0,0.4));
}
.stage-layout--selection .material-card__image {
  position: absolute;
  left: 50%;
  top: 50%;
  width: clamp(500px, 50vh, 526px);
  height: auto;
  max-width: none;
  max-height: none;
  transform: translate(-50%, -50%) rotate(90deg);
  transform-origin: center center;
  object-fit: contain;
  display: block;
  filter: drop-shadow(0 16px 20px rgba(0,0,0,0.4))
}
.is-shaking {
  animation: shake 0.4s ease;
}
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-6px); }
  40% { transform: translateX(6px); }
  60% { transform: translateX(-4px); }
  80% { transform: translateX(4px); }
}

.prep-video {
  width: 100%;
  height: 100%;
  padding: 0;
}
.prep-video__media {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: transparent;
}

/* 结果界面 */
.result-stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 100%;
}
.stage-board--result {
  aspect-ratio: 3565 / 1176;
}
.result-actions {
  display: flex;
  gap: 16px;
}
.primary-btn,
.ghost-btn {
  padding: 12px 28px;
  font-family: 'WorkshopTitle', serif;
  font-size: 18px;
  border: none;
  cursor: pointer;
  transition: transform 0.2s, filter 0.2s;
}
.primary-btn {
  background: #ede6c3;
  color: #21110c;
  box-shadow: 0 10px 20px rgba(0,0,0,0.3);
}
.ghost-btn {
  background: transparent;
  border: 1px solid rgba(237,230,195,0.4);
  color: #ede6c3;
}
.primary-btn:hover,
.ghost-btn:hover {
  transform: translateY(-2px);
  filter: brightness(1.1);
}

/* 浮动工具 */
.floating-tool {
  position: absolute;
  z-index: 5;
  pointer-events: none;
  will-change: left, top;
}
.floating-tool__image {
  display: block;
  filter: drop-shadow(0 18px 24px rgba(0,0,0,0.3));
}
.floating-tool--sandpaper {
  transform: translate(-48%, -42%) rotate(-12deg);
}
.floating-tool--sandpaper .floating-tool__image {
  width: clamp(140px, 12vw, 220px);
}
.floating-tool--brush {
  transform: translate(-50%, -12%);
}
.floating-tool--brush .floating-tool__image {
  width: clamp(145px, 10.5vw, 198px);
  transform: rotate(205deg);
  transform-origin: 50% 12%;
}
.floating-tool--knife-large,
.floating-tool--knife-small {
  transform: translate(-50%, -18%);
}
.floating-tool--knife-large .floating-tool__image,
.floating-tool--knife-small .floating-tool__image {
  width: clamp(170px, 13vw, 244px);
  transform: rotate(205deg);
  transform-origin: 50% 18%;
}
.floating-tool.is-resting .floating-tool__image {
  animation: idle-tool 1.5s infinite;
}
@keyframes idle-tool {
  0%, 100% {
    filter: drop-shadow(0 18px 24px rgba(0,0,0,0.3));
  }
  50% {
    filter: brightness(1.04) drop-shadow(0 20px 26px rgba(0,0,0,0.34));
  }
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
