<script setup lang="ts">
import { ref, onMounted, render } from 'vue'
import type { boardDisplay, playerPos, data } from 'index.d.ts'
import { supabase } from '@/lib/supabaseClient'
import { useRoute, useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/user'
import { beforeEach } from 'node:test'


const router = useRouter()
const route = useRoute()
const canvas = ref()
const ctx = ref()
const params = route.params
const sessionStore = useSessionStore()


onMounted(async () => {
  canvas.value = document.getElementById('canvas')
  ctx.value = canvas.value.getContext('2d')
  canvas.value.height = boardConfig.boardSize * boardConfig.tileSize
  canvas.value.width = boardConfig.boardSize * boardConfig.tileSize
 /*  ctx.value.fillStyle = 'white'
  ctx.value.fillRect(0, 0, canvas.value.height, canvas.value.width) */
  renderPlayer(playerSprite.src)
  window.addEventListener('keydown', function (keydown) {
    mover(keydown)
  })
  window.addEventListener('keydown', function (keydown: KeyboardEvent) {
    const keyPressed = keyPresses.find((c) => c.key === keydown.code)
    if (keyPressed != undefined) {
      place(keyPressed.block)
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
  try {
    const { data, error } = await supabase.from('worlds').select('data').eq('id', params.id)
    if (error) throw error
    gameData.value = data[0].data
    placedStuff.value = data[0].data.placedBLocks as any
    boardConfig = (data[0].data.worldsize as any).boardConfig
    renderGrass()
    placedStuff.value.forEach((_item) => {
      replaceBoard()
    })
    renderPlayer(playerSprite.src)
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

const keyPresses: { key: string; block: string }[] = [
  {
    key: 'Digit1',
    block: '/cobblestone.png'
  },
  {
    key: 'Digit2',
    block: '/oakWood.jpg'
  },
  {
    key: 'Digit3',
    block: '/darkOakWood.jpg'
  },
  {
    key: 'Digit4',
    block: '/dirt.jpg'
  },
  {
    key: 'Digit5',
    block: '/diamond.png'
  },
  {
    key: 'Digit6',
    block: '/stone.jpg'
  },
  {
    key: 'Digit7',
    block: '/dirt.jpg'
  },
  {
    key: 'KeyQ',
    block: '/redWool.jpg'
  },
  {
    key: 'KeyW',
    block: '/orangeWool.png'
  },
  {
    key: 'KeyE',
    block: '/yellowWool.jpg'
  },
  {
    key: 'KeyR',
    block: '/greenWool.PNG'
  },
  {
    key: 'KeyT',
    block: '/blueWool.jpg'
  },
  {
    key: 'KeyY',
    block: '/purpleWool.PNG'
  },
  {
    key: 'KeyX',
    block: '/grass.png'
  },
  
]
let playerSprite = new Image()
playerSprite.src = '/left.jpg'
let grass = new Image()
grass.src = '/grass.png'
let blockX = new Image()


// let grass = new Image()
// grass.src = '/grass.jpg'
// grass.style.width = '25px'
// grass.style.height = '25px'
// console.log(grass)

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
  blockX.src = block
  ctx.value.drawImage(
    blockX,
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
/*   ctx.value.fillStyle = 'white'
  ctx.value.fillRect(
    boardConfig.tileSize * playerLocation.x.value,
    boardConfig.tileSize * playerLocation.y.value,
    boardConfig.tileSize,
    boardConfig.tileSize
  ) */
  ctx.value.drawImage(
  grass,
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
    blockX.src = `${block}`
   // ctx.value.fillStyle = `${block}`
    let x = playerLocation.x.value + placingDirection.facing.x
    let y = playerLocation.y.value + placingDirection.facing.y
    if (placedStuff.value.find((block) => block.x === x && block.y === y)) {
      placedStuff.value.splice(
        placedStuff.value.findIndex((block) => block.x === x && block.y === y),
        1
      )
    }
    ctx.value.drawImage(
      blockX,
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

function renderGrass(){
  let x = 0
  let y = 0
  for(let i=0; i<=(boardConfig.tileSize)*(boardConfig.boardSize); i++){
    ctx.value.drawImage(grass, x, y, boardConfig.tileSize, boardConfig.tileSize);
    y+=boardConfig.tileSize
      if(i%(boardConfig.tileSize) === 0 && i>0){
        y=0
        x+=boardConfig.tileSize
      }
    }
}

</script>


<template>
  <div class="body" v-if="sessionStore.expires > Math.floor(Date.now() / 1000)">
    <h2>it's not broken we swear it's just loading</h2>
    <div class="key" v-for="color in keyPresses">
      <li><img :src="color.block" class="colors"> - {{ color.key }}</li>
    </div>
    <button class="exit, buttonblock" @click="saveExit(gameData)">Exit And Save</button>
    <canvas id="canvas"></canvas>
    <img src="/grass.jpg" id="block-grass">
    <img src="/oakWood.jpg" id="block-oakWood">
    <img src="/cobblestone.png" id="block-cobblestone">
    <img src="/dirt.jpg" id="block-dirt">
  </div><div v-else>
    Please <router-link to="/login">log in</router-link> first to access worlds!
  </div>
</template>


<style lang="scss" scoped>
#canvas {
  border: 1px solid black;
}

.colors{
  width: 2%;
  height: 2%
}

.body {
  margin-top: 80px;
}
.buttonblock {
  background-color: #FFFFFF;
  border: 1px solid rgb(209,213,219);
  border-radius: .5rem;
  box-sizing: border-box;
  color: hsla(160, 100%, 37%, 1);
  line-height: 1.25rem;
  text-align: center;
  text-decoration: none #d1dbd6 solid;
  text-decoration-thickness: auto;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.buttonblock:hover {
  background-color: hsla(160, 100%, 37%, 0.2);
}

.buttonblock:focus {
  outline: 1px solid transparent;
  outline-offset: 1px;
}

.buttonblock:focus-visible {
  box-shadow: none;
}
</style>



