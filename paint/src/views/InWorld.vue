<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue'

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
  x: ref(12),
  y: ref(13),
}

let gameData: data = {
  worldsize: { boardConfig },
  placedBLocks: [placedStuff]
}

const directions: {direction:string, facing: {x: number, y:number}}[] = [
  {
    direction:"left",
    facing:{
      x: -1,
      y: 0
    }
  },
  {
    direction:"right",
    facing:{
      x: +1,
      y: 0
    }
  },
  {
    direction:"up",
    facing:{
      x: 0,
      y: -1
    }
  },
  {
    direction:"down",
    facing:{
      x: 0,
      y: +1
    }
  },
  
]

const keyPresses: { key: string, color: string }[] = [
  {
    key: "KeyX",
    color: "White"
  },
  {
    key: "Digit1",
    color: "Green"
  },
  {
    key: "Digit2",
    color: "Red"
  }
]

onMounted(() => {
  canvas.value = document.getElementById("canvas");
  ctx.value = canvas.value.getContext("2d");
  canvas.value.height = boardConfig.boardSize * boardConfig.tileSize
  canvas.value.width = boardConfig.boardSize * boardConfig.tileSize
  ctx.value.fillStyle = "white";
  ctx.value.fillRect(0, 0, canvas.value.height, canvas.value.width)
  ctx.value.fillStyle = "black";
  ctx.value.fillRect(boardConfig.tileSize * playerLocation.x.value, boardConfig.tileSize * playerLocation.y.value, boardConfig.tileSize, boardConfig.tileSize)
  window.addEventListener("keydown", function (keydown) {
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
  const replacing = placedStuff.find(block => block.x === playerLocation.x.value && block.y === playerLocation.y.value);
  if (replacing != undefined) {
    rplace(replacing.x, replacing.y, replacing.block)
  }
}
function rplace(x: number, y: number, block: string) {
  ctx.value.fillStyle = block;
  ctx.value.fillRect(boardConfig.tileSize * x, boardConfig.tileSize * y, boardConfig.tileSize, boardConfig.tileSize)

}

function moveLeft() {
  if (playerLocation.x.value != 0) {
    ctx.value.fillStyle = "white";
    ctx.value.fillRect(boardConfig.tileSize * playerLocation.x.value, boardConfig.tileSize * playerLocation.y.value, boardConfig.tileSize, boardConfig.tileSize)
    replace()
    playerLocation.x.value--
    ctx.value.fillStyle = "black";
    ctx.value.fillRect(boardConfig.tileSize * playerLocation.x.value, boardConfig.tileSize * playerLocation.y.value, boardConfig.tileSize, boardConfig.tileSize)
  }
  currentDirection = "left"

}
function moveUp() {
  if (playerLocation.y.value != 0) {
    ctx.value.fillStyle = "white";
    ctx.value.fillRect(boardConfig.tileSize * playerLocation.x.value, boardConfig.tileSize * playerLocation.y.value, boardConfig.tileSize, boardConfig.tileSize)
    replace()
    playerLocation.y.value--
    ctx.value.fillStyle = "black";
    ctx.value.fillRect(boardConfig.tileSize * playerLocation.x.value, boardConfig.tileSize * playerLocation.y.value, boardConfig.tileSize, boardConfig.tileSize)
  }
  currentDirection = "up"

}
function moveDown() {
  if (playerLocation.y.value != boardConfig.boardSize - 1) {
    ctx.value.fillStyle = "white";
    ctx.value.fillRect(boardConfig.tileSize * playerLocation.x.value, boardConfig.tileSize * playerLocation.y.value, boardConfig.tileSize, boardConfig.tileSize)
    replace()
    playerLocation.y.value++
    ctx.value.fillStyle = "black";
    ctx.value.fillRect(boardConfig.tileSize * playerLocation.x.value, boardConfig.tileSize * playerLocation.y.value, boardConfig.tileSize, boardConfig.tileSize)
  }
  currentDirection = "down"
}
function moveRight() {
  if (playerLocation.x.value != boardConfig.boardSize - 1) {
    ctx.value.fillStyle = "white";
    ctx.value.fillRect(boardConfig.tileSize * playerLocation.x.value, boardConfig.tileSize * playerLocation.y.value, boardConfig.tileSize, boardConfig.tileSize)
    replace()
    playerLocation.x.value++
    ctx.value.fillStyle = "black";
    ctx.value.fillRect(boardConfig.tileSize * playerLocation.x.value, boardConfig.tileSize * playerLocation.y.value, boardConfig.tileSize, boardConfig.tileSize)
  }
  currentDirection = "right"
}

let currentDirection = ""

function place(block: string) {
 let placingDirection = directions.find(direction => direction.direction === currentDirection && direction.direction === currentDirection);
if(placingDirection != undefined){
  ctx.value.fillStyle = `${block}`;
  let x = playerLocation.x.value + placingDirection.facing.x
  let y = playerLocation.y.value + placingDirection.facing.y
  console.log(placedStuff)
  if (placedStuff.find(block => block.x === x && block.y === y)) {
    placedStuff.splice(placedStuff.findIndex(block => block.x === x && block.y === y), 1)
  }
  ctx.value.fillRect(boardConfig.tileSize * (x), boardConfig.tileSize * (y), boardConfig.tileSize, boardConfig.tileSize)
  placedStuff.push({
    x: (x),
    y: (y),
    block: `${block}`
  })}
}


function mover(key: KeyboardEvent) {
  if (key.code === "ArrowLeft") {
    moveLeft()
  } else if (key.code === "ArrowRight") {
    moveRight()
  } else if (key.code === "ArrowUp") {
    moveUp()
  } else if (key.code === "ArrowDown") {
    moveDown()
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