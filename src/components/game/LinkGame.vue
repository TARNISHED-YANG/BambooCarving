<script setup>
import { onMounted, ref } from 'vue'
import fudiao1 from '@/assets/LinkGame/fudiao1.png'
import fudiao2 from '@/assets/LinkGame/fudiao2.png'
import fudiao3 from '@/assets/LinkGame/fudiao3.png'
import fudiao4 from '@/assets/LinkGame/fudiao4.png'
import fudiao5 from '@/assets/LinkGame/fudiao5.png'
import fudiao6 from '@/assets/LinkGame/fudiao6.png'

import liuqing1 from '@/assets/LinkGame/liuqing1.png'
import liuqing2 from '@/assets/LinkGame/liuqing2.png'
import liuqing3 from '@/assets/LinkGame/liuqing3.png'
import liuqing4 from '@/assets/LinkGame/liuqing4.png'

import toudiao1 from '@/assets/LinkGame/toudiao1.png'
import toudiao2 from '@/assets/LinkGame/toudiao2.png'
import toudiao3 from '@/assets/LinkGame/toudiao3.png'
import toudiao4 from '@/assets/LinkGame/toudiao4.png'
import toudiao5 from '@/assets/LinkGame/toudiao5.png'
import toudiao6 from '@/assets/LinkGame/toudiao6.png'

import yinke1 from '@/assets/LinkGame/yinke1.png'
import yinke2 from '@/assets/LinkGame/yinke2.png'
import yinke3 from '@/assets/LinkGame/yinke3.png'
import yinke4 from '@/assets/LinkGame/yinke4.png'
import yinke5 from '@/assets/LinkGame/yinke5.png'
import yinke6 from '@/assets/LinkGame/yinke6.png'

import yuandiao1 from '@/assets/LinkGame/yuandiao1.png'
import yuandiao2 from '@/assets/LinkGame/yuandiao2.png'
import yuandiao3 from '@/assets/LinkGame/yuandiao3.png'
import yuandiao4 from '@/assets/LinkGame/yuandiao4.png'
import yuandiao5 from '@/assets/LinkGame/yuandiao5.png'
import yuandiao6 from '@/assets/LinkGame/yuandiao6.png'

const imageMap = {
  1: fudiao1, 2: fudiao2, 3: fudiao3, 4: fudiao4, 5: fudiao5, 6: fudiao6,
  7: liuqing1, 8: liuqing2, 9: liuqing3, 10: liuqing4,
  11: toudiao1, 12: toudiao2, 13: toudiao3, 14: toudiao4, 15: toudiao5, 16: toudiao6,
  17: yinke1, 18: yinke2, 19: yinke3, 20: yinke4, 21: yinke5, 22: yinke6,
  23: yuandiao1, 24: yuandiao2, 25: yuandiao3, 26: yuandiao4, 27: yuandiao5, 28: yuandiao6
}

const typeToValues = {
  fudiao: [1, 2, 3, 4, 5, 6],
  liuqing: [7, 8, 9, 10],
  toudiao: [11, 12, 13, 14, 15, 16],
  yinke: [17, 18, 19, 20, 21, 22],
  yuandiao: [23, 24, 25, 26, 27, 28]
}

const imageTypeMap = {}
Object.entries(typeToValues).forEach(([type, values]) => {
  values.forEach(value => {
    imageTypeMap[value] = type
  })
})

const grid = ref([])
const lastSelectedCell = ref([])
const selectCell = (rowIndex, colIndex) => {
  if (lastSelectedCell.value?.length) {
    if (canConnect(lastSelectedCell.value, [rowIndex, colIndex])) {
      console.log('可以连接~~')
      grid.value[lastSelectedCell.value[0]][lastSelectedCell.value[1]] = 0
      grid.value[rowIndex][colIndex] = 0
    }
    lastSelectedCell.value = []
  } else {
    lastSelectedCell.value = [rowIndex, colIndex]
  }
}
const getImage = (imageId) => {
  return imageMap[imageId] || '';
}
/**
 * 格子是否被选中
 */
const isCellSelected = (rowIndex, colIndex) => {
  return lastSelectedCell.value[0] === rowIndex && lastSelectedCell.value[1] === colIndex
}

/**
 * 检查两个格子是否可以连接  类型匹配
 */
const canConnect = (cell1, cell2) => {
  if (cell1[0] === cell2[0] && cell1[1] === cell2[1]) {
    return false
  }
  // 获取两个格子的图片值
  const value1 = grid.value[cell1[0]][cell1[1]]
  const value2 = grid.value[cell2[0]][cell2[1]]
  // 判断类型是否相同（而非值是否相同）
  if (imageTypeMap[value1] !== imageTypeMap[value2]) {
    return false
  }
  return isPathConnected(cell1, cell2)
}

/**
 * 使用 BFS 检查路径是否通 折点2个及以内
 */
const isPathConnected = (startCell, endCell) => {
  const originalRows = grid.value.length
  const originalCols = grid.value[0].length
  //边缘路径扩充
  const expandedRows = originalRows + 2
  const expandedCols = originalCols + 2
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]
  const visited = Array(expandedRows)
    .fill(0)
    .map(() => Array(expandedCols).fill([false, Infinity]))
  const queue = []
  const [startRow, startCol] = [startCell[0] + 1, startCell[1] + 1]
  const [endRow, endCol] = [endCell[0] + 1, endCell[1] + 1]
  visited[startRow][startCol] = [true, 0]
  queue.push([startRow, startCol, -1, 0])
  while (queue.length > 0) {
    const [currRow, currCol, prevDir, currInflection] = queue.shift()
    for (let currDir = 0; currDir < 4; currDir++) {
      const [dx, dy] = directions[currDir]
      let newRow = currRow + dx
      let newCol = currCol + dy
      let newInflection = currInflection
      if (prevDir !== -1 && currDir !== prevDir) {
        newInflection = currInflection + 1
      }
      if (newInflection > 2) {
        continue
      }
      while (true) {
        if (newRow < 0 || newRow >= expandedRows || newCol < 0 || newCol >= expandedCols) {
          break
        }
        if (newRow === endRow && newCol === endCol) {
          return true
        }
        const isInOriginalGrid =
          newRow >= 1 && newRow <= originalRows && newCol >= 1 && newCol <= originalCols

        if (isInOriginalGrid) {
          const originalRow = newRow - 1
          const originalCol = newCol - 1
          if (grid.value[originalRow][originalCol] !== 0) {
            break
          }
        }
        if (!visited[newRow][newCol][0] || newInflection < visited[newRow][newCol][1]) {
          visited[newRow][newCol] = [true, newInflection]
          queue.push([newRow, newCol, currDir, newInflection])
        }
        newRow += dx
        newCol += dy
      }
    }
  }
  return false
}

/**
 * 随机生成grid，确保每一个类型都是成对存在的，但是每个值只存在一次
 * 修改分配逻辑：保证附加的数量+2之后不超过这个类型图片的数量，建立一个可以分配的类型的数组，随机选择这个数组中的某个类型分配上去
 */
const randomizeGrid = () => {
  const rows = 4
  const cols = 4
  const totalCells = rows * cols // 16
  const types = Object.keys(typeToValues)
  const numTypes = types.length // 5种类型

  // 1. 计算每种类型的目标数量（总和16，且均为偶数）
  const baseCount = Math.floor(totalCells / numTypes) // 3
  const typeCounts = {} //存每种类型分配的数量
  let remaining = totalCells

  types.forEach((type) => {
    // 确保基础数量是偶数
    let count = baseCount % 2 === 0 ? baseCount : baseCount - 1 //2
    typeCounts[type] = count
    remaining -= count
  })
  // 2. 分配剩余的单元格（必然是偶数，因为16是偶数，前面分配的总和也是偶数）
  // let typeIndex = 0
  while (remaining > 0) {
    const assignableTypes = types.filter((type) => {
      const maxPossibleCount = typeToValues[type].length
      return typeCounts[type] + 2 <= maxPossibleCount
    })
    if (assignableTypes.length === 0) {
      console.warn(`类型数不足，无法满足需求数量`)
      break
    }
    const randomTypeIndex = Math.floor(Math.random() * assignableTypes.length)
    const randomType = assignableTypes[randomTypeIndex]
    typeCounts[randomType] += 2 // 每次加2，保持偶数
    remaining -= 2
    // typeIndex = (typeIndex + 1) % numTypes
  }

  // 3. 为每种类型填充对应数量的数值（允许数值数量不均等）
  const imageValues = []
  const usedValues = new Set() //为了保证相同图不会被分配两次
  Object.entries(typeToValues).forEach(([type, values]) => {
    const total = typeCounts[type] // 当前类型需要的总数量
    let remainingInType = total

    // 随机分配数值，直到填满该类型的总数量
    while (remainingInType > 0) {
      const availableValues = values.filter((val) => !usedValues.has(val))
      // 如果当前类型已没有可用数值（防止死循环）,理论上如果格子数远小于图片数的时候，不会走到这一步
      if (availableValues.length === 0) {
        console.warn(`类型 ${type} 已无可用数值，无法满足需求数量 ${total}`)
        break
      }
      // 随机选一个该类型的数值
      const randomIndex = Math.floor(Math.random() * availableValues.length)
      const randomValue = availableValues[randomIndex]
      imageValues.push(randomValue)
      usedValues.add(randomValue)
      remainingInType--
    }
  })

  // 4. 打乱顺序并填充网格
  imageValues.sort(() => Math.random() - 0.5)
  const igrid = Array(rows)
    .fill(0)
    .map(() => Array(cols).fill(0))
  let index = 0
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      igrid[i][j] = imageValues[index]
      index++
    }
  }

  grid.value = igrid
}

// /**
//  * 动态引入图片
//  */
// const getImage = (image) => {
//   return new URL(`../assets/LinkGame/animal${image}.jpg`, import.meta.url).href
// }

onMounted(() => {
  randomizeGrid()
})
</script>

<template>
    <div class="game-board">

    <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="row">
      <div
        v-for="(cell, colIndex) in row"
        class="cell"
        :class="{ isSelected: isCellSelected(rowIndex, colIndex) }"
        :key="colIndex"
        @click="selectCell(rowIndex, colIndex)"
      >
        <span v-if="!grid[rowIndex][colIndex]"></span>
        <img v-else :src="getImage(grid[rowIndex][colIndex])" class="cell-image" alt="" />
        <div class="cell-halo" v-if="isCellSelected(rowIndex, colIndex)"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  width: 100%;
  height: 100%;
}
.game-board {
  width: 100vw;
  height: 100vh;
  background: url('@/assets/LinkGame/linkgame_bg.jpg') no-repeat;
  background-size: cover; /* 改用cover让背景图覆盖整个容器 */
  display: flex; /* 启用Flex布局 */
  flex-direction: column; /* 子元素垂直排列 */
  justify-content: center; /* 垂直居中 */
  align-items: center; /* 水平居中 */
}
.row {
  display: flex;
  justify-content: center; /* 确保每行内部单元格也水平居中 */
}
.cell {
  width: 100px;
  height: 100px;
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}
.cell-image {
  position: relative;
  transition: transform 0.3s ease-in-out;
}
.cell.isSelected .cell-image {
  transform: scale(1.2); /* 放大 10% */
}
/* 定义光圈效果 */
.cell-halo {
  position: absolute;
  width: 130px;
  height: 130px;
  border: 2px solid rgba(255, 255, 255, 0.5); /* 白色半透明边框 */
  box-sizing: border-box;
  border-radius: 50%; /* 圆形光圈 */
  animation: pulse 1s infinite; /* 循环动画 */
  pointer-events: none; /* 防止光圈阻挡点击事件 */
  z-index: 1;
}

/* 定义光圈的脉冲动画 */
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
