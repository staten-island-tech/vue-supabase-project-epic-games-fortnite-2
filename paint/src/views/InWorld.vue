<script setup lang="ts">
import { ref, onMounted, type Ref} from 'vue'
import { dir } from 'console';
/* import { type boardDisplay, type playerPos, type data } from 'database'
 */ 
interface boardDisplay {
  boardSize: number
  tileSize: number;
}
interface playerPos {
  x: Ref<number>;
  y: Ref<number>;
}


let placedStuff: { x: number, y: number, block: string }[] = []




interface data {
  worldsize: object,
  placedBLocks: object
}

const canvas = ref();
const ctx = ref();

const boardConfig: boardDisplay = {
  boardSize: 25,
  tileSize: 25
}

let playerLocation: playerPos = {
  x: ref(Math.round(boardConfig.boardSize / 2)),
  y: ref(Math.round(boardConfig.boardSize / 2)),
}

let gameData: data = {
  worldsize: { boardConfig },
  placedBLocks: [placedStuff]
}

const directions: { direction: string, facing: { x: number, y: number } }[] = [
  {
    direction: "ArrowLeft",
    facing: {
      x: -1,
      y: 0
    }
  },
  {
    direction: "ArrowRight",
    facing: {
      x: +1,
      y: 0
    }
  },
  {
    direction: "ArrowUp",
    facing: {
      x: 0,
      y: -1
    }
  },
  {
    direction: "ArrowDown",
    facing: {
      x: 0,
      y: +1
    }
  },

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
let img = new Image()
img.src = "/79344124_p0_master1200.jpg"
console.log(img.src)

onMounted(() => {
  setInterval(() => {
    console.log(gameData)
  }, 500)
  canvas.value = document.getElementById('canvas')
  ctx.value = canvas.value.getContext('2d')
  canvas.value.height = boardConfig.boardSize * boardConfig.tileSize
  canvas.value.width = boardConfig.boardSize * boardConfig.tileSize
  ctx.value.fillStyle = 'white'
  ctx.value.fillRect(0, 0, canvas.value.height, canvas.value.width)
 /*  ctx.value.fillStyle = 'black'
  ctx.value.fillRect(
    boardConfig.tileSize * playerLocation.x.value,
    boardConfig.tileSize * playerLocation.y.value,
    boardConfig.tileSize,
    boardConfig.tileSize
  ) */
  ctx.value.drawImage(img, boardConfig.tileSize * playerLocation.x.value, boardConfig.tileSize * playerLocation.y.value, boardConfig.tileSize, boardConfig.tileSize)
  window.addEventListener('keydown', function (keydown) {
    mover(keydown)
  })
  window.addEventListener("keydown", function (keydown: KeyboardEvent) {
    const keyPressed = keyPresses.find(c => c.key === keydown.code);
    if (keyPressed != undefined) {
      place(keyPressed.color)
    }
  })
})

function replace() {
  const replacing = placedStuff.find(
    (block) => block.x === playerLocation.x.value && block.y === playerLocation.y.value
  )
  if (replacing != undefined) {
    rplace(replacing.x, replacing.y, replacing.block)
  }
}
function rplace(x: number, y: number, block: string) {
  ctx.value.fillStyle = block
  ctx.value.fillRect(
    boardConfig.tileSize * x,
    boardConfig.tileSize * y,
    boardConfig.tileSize,
    boardConfig.tileSize
  )
}

let currentDirection = "ArrowRight";

function mover(key: KeyboardEvent) {
  let movingDirection = directions.find(direction => direction.direction === key.code);
  if (movingDirection != undefined ) {
    if(currentDirection != movingDirection.direction){
       currentDirection = `${movingDirection.direction}`
    }else{
    move(movingDirection)
  }}
}

function move(direction: { direction: string; facing: { x: number; y: number; }; }) {
  ctx.value.fillStyle = "white";
  ctx.value.fillRect(boardConfig.tileSize * playerLocation.x.value, boardConfig.tileSize * playerLocation.y.value, boardConfig.tileSize, boardConfig.tileSize)
  replace()
  playerLocation.x.value += direction.facing.x
  if (playerLocation.x.value < 0 || playerLocation.x.value === boardConfig.boardSize) {
    playerLocation.x.value -= direction.facing.x
  }
  playerLocation.y.value += direction.facing.y
  if (playerLocation.y.value < 0 || playerLocation.y.value === boardConfig.boardSize) {
    playerLocation.y.value -= direction.facing.y
  }
 /*  ctx.value.fillStyle = "black";
  ctx.value.fillRect(boardConfig.tileSize * playerLocation.x.value, boardConfig.tileSize * playerLocation.y.value, boardConfig.tileSize, boardConfig.tileSize) */
  ctx.value.drawImage(img, boardConfig.tileSize * playerLocation.x.value, boardConfig.tileSize * playerLocation.y.value, boardConfig.tileSize, boardConfig.tileSize)

  currentDirection = `${direction.direction}`
}


function place(block: string) {
  let placingDirection = directions.find(direction => direction.direction === currentDirection);
  if (placingDirection != undefined) {
    ctx.value.fillStyle = `${block}`;
    let x = playerLocation.x.value + placingDirection.facing.x
    let y = playerLocation.y.value + placingDirection.facing.y
    if (placedStuff.find(block => block.x === x && block.y === y)) {
      placedStuff.splice(placedStuff.findIndex(block => block.x === x && block.y === y), 1)
    }
    ctx.value.fillRect(boardConfig.tileSize * (x), boardConfig.tileSize * (y), boardConfig.tileSize, boardConfig.tileSize)
    placedStuff.push({
      x: (x),
      y: (y),
      block: `${block}`
    })
  }
}



</script>

<template>
  <canvas id="canvas"></canvas>
</template>

<style lang="scss" scoped>
#canvas {
  border: 1px solid black;
}
</style>
