<script setup lang="ts">
import { ref, onMounted, render } from 'vue'
import type { boardDisplay, playerPos, data } from 'index.d.ts'
import { supabase } from '@/lib/supabaseClient'
import { useRoute, useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/user'

const router = useRouter()
const route = useRoute()
const canvas = ref()
const ctx = ref()
const params = route.params
const sessionStore = useSessionStore()

onMounted(async () => {
  try {
    const { data, error } = await supabase.from('worlds').select('data').eq('id', params.id)
    if (error) throw error
    gameData.value = data[0].data
    placedStuff.value = data[0].data.placedBLocks as any
    boardConfig = (data[0].data.worldsize as any).boardConfig
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    placedStuff.value.forEach((_item) => {
      replaceBoard()
    })
  } catch (error) {
    console.log(error)
  }
})

async function saveExit(saveData: any) {
  try {
    const { error } = await supabase
      .from('worlds')
      .update({ data: saveData })
      .eq('id', sessionStore.currentWorldID)
    if (error) throw error
    router.push('/worlds')
  } catch (error) {
    console.log(error)
  }
}
let boardConfig: boardDisplay = {
  tileSize: 25,
  boardSize: 25
}
let placedStuff = ref<{ x: number; y: number; block: string }[]>([])
let gameData = ref<data>({
  worldsize: { boardConfig: boardConfig },
  placedBLocks: placedStuff.value
})
let playerLocation: playerPos = {
  x: ref(Math.round(boardConfig.tileSize / 2)),
  y: ref(Math.round(boardConfig.tileSize / 2))
}
boardConfig = { tileSize: 25, boardSize: 25 }
const directions: { direction: string; facing: { x: number; y: number }; sprite: string }[] = [
  {
    direction: 'ArrowLeft',
    facing: {
      x: -1,
      y: 0
    },
    sprite: '/left.jpg'
  },
  {
    direction: 'ArrowRight',
    facing: {
      x: +1,
      y: 0
    },
    sprite: '/right.jpg'
  },
  {
    direction: 'ArrowUp',
    facing: {
      x: 0,
      y: -1
    },
    sprite: '/up.jpg'
  },
  {
    direction: 'ArrowDown',
    facing: {
      x: 0,
      y: +1
    },
    sprite: '/down.jpg'
  }
]

const keyPresses: { key: string; color: string }[] = [
  {
    key: 'KeyX',
    color: 'White'
  },
  {
    key: 'Digit1',
    color: 'Green'
  },
  {
    key: 'Digit2',
    color: 'Red'
  }
]
let playerSprite = new Image()
playerSprite.src = '/left.jpg'

onMounted(() => {
  canvas.value = document.getElementById('canvas')
  ctx.value = canvas.value.getContext('2d')
  canvas.value.height = boardConfig.boardSize * boardConfig.tileSize
  canvas.value.width = boardConfig.boardSize * boardConfig.tileSize
  ctx.value.fillStyle = 'white'
  ctx.value.fillRect(0, 0, canvas.value.height, canvas.value.width)
  renderPlayer(playerSprite.src)
  window.addEventListener('keydown', function (keydown) {
    mover(keydown)
  })
  window.addEventListener('keydown', function (keydown: KeyboardEvent) {
    const keyPressed = keyPresses.find((c) => c.key === keydown.code)
    if (keyPressed != undefined) {
      place(keyPressed.color)
    }
  })
  window.addEventListener(
    'keydown',
    function (e) {
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(e.code) > -1) {
        e.preventDefault()
      }
    },
    false
  )
})
function replaceBoard() {
  for (let i = 0; i < placedStuff.value.length; i++) {
    placedStuff.value.forEach((block) => replace(block.x, block.y, block.block))
  }
}

function replacer() {
  const replacing = placedStuff.value.find(
    (block) => block.x === playerLocation.x.value && block.y === playerLocation.y.value
  )
  if (replacing != undefined) {
    replace(replacing.x, replacing.y, replacing.block)
  }
}
function replace(x: number, y: number, block: string) {
  ctx.value.fillStyle = block
  ctx.value.fillRect(
    boardConfig.tileSize * x,
    boardConfig.tileSize * y,
    boardConfig.tileSize,
    boardConfig.tileSize
  )
}

let currentDirection = 'ArrowLeft'


function mover(key: KeyboardEvent) {
  let movingDirection = directions.find((direction) => direction.direction === key.code)
  if (movingDirection != undefined) {
    if (currentDirection != movingDirection.direction) {
      currentDirection = movingDirection.direction
      renderPlayer(movingDirection.sprite)
    } else {
      move(movingDirection)
    }
  }
}

function move(direction: { direction: string; facing: { x: number; y: number }; sprite: string }) {
  ctx.value.fillStyle = 'white'
  ctx.value.fillRect(
    boardConfig.tileSize * playerLocation.x.value,
    boardConfig.tileSize * playerLocation.y.value,
    boardConfig.tileSize,
    boardConfig.tileSize
  )
  replacer()
  playerLocation.x.value += direction.facing.x
  if (playerLocation.x.value < 0 || playerLocation.x.value === boardConfig.boardSize) {
    playerLocation.x.value -= direction.facing.x
  }
  playerLocation.y.value += direction.facing.y
  if (playerLocation.y.value < 0 || playerLocation.y.value === boardConfig.boardSize) {
    playerLocation.y.value -= direction.facing.y
  }
  renderPlayer(playerSprite.src)
}

function place(block: string) {
  let placingDirection = directions.find((direction) => direction.direction === currentDirection)
  if (placingDirection != undefined) {
    ctx.value.fillStyle = `${block}`
    let x = playerLocation.x.value + placingDirection.facing.x
    let y = playerLocation.y.value + placingDirection.facing.y
    if (placedStuff.value.find((block) => block.x === x && block.y === y)) {
      placedStuff.value.splice(
        placedStuff.value.findIndex((block) => block.x === x && block.y === y),
        1
      )
    }
    ctx.value.fillRect(
      boardConfig.tileSize * x,
      boardConfig.tileSize * y,
      boardConfig.tileSize,
      boardConfig.tileSize
    )
    placedStuff.value.push({
      x: x,
      y: y,
      block: `${block}`
    })
  }
}

function renderPlayer(sprite: string) {
  playerSprite.onload = function () {
    ctx.value.drawImage(
      playerSprite, 
      boardConfig.tileSize * playerLocation.x.value, 
      boardConfig.tileSize * playerLocation.y.value, 
      boardConfig.tileSize, 
      boardConfig.tileSize
    )
  };
  playerSprite.src = sprite
}
</script>

<template>
  <div class="body">
    <button class="exit" @click="saveExit(gameData)">Exit And Save</button>
    <canvas id="canvas"></canvas>
  </div>
</template>

<style lang="scss" scoped>
#canvas {
  border: 1px solid black;
}

.body {
  margin-top: 80px;
}
</style>
