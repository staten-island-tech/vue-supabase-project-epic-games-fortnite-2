<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue'
/* import { supabase } from './lib/supabaseClient.js'
import { BlockList } from 'net'; */
interface boardDisplay {
  rows: number;
  columns: number;
  tileSize: number;
} 
 interface playerPos {
  x: Ref<number>;
  y: Ref<number>;
}


let placedStuff: {x:number, y:number, block:string}[] = []


interface gameData {
  worldsize: object,
  placedBLocks: object
}

const canvas = ref();
const ctx = ref();

const boardConfig: boardDisplay = {
  rows: 25,
  columns: 25,
  tileSize: 25
}

let playerLocation : playerPos  = {
  x: ref(12),
  y: ref(13),
}

let gameData : gameData = {
  worldsize: {boardConfig},
  placedBLocks: [placedStuff]
}



const keyPresses:{key:string, color:string}[] = [
  {
   key: "Space",
   color: "Green"
  },
  {
    key: "KeyD",
    color: "Red"
  }
]

onMounted(()=>{
  canvas.value = document.getElementById("canvas");
  ctx.value = canvas.value.getContext("2d");
  canvas.value.height = boardConfig.rows * boardConfig.tileSize
  canvas.value.width = boardConfig.columns * boardConfig.tileSize
  ctx.value.fillStyle="black";
  ctx.value.fillRect(boardConfig.rows *playerLocation.x.value,boardConfig.rows * playerLocation.y.value, boardConfig.tileSize, boardConfig.tileSize )
  window.addEventListener("keydown", function(keydown){
     mover(keydown)
   })
   
  window.addEventListener("keydown", function(keydown: KeyboardEvent){
    const keyPressed = keyPresses.find(c => c.key === keydown.code);
    if(keyPressed != undefined){
      place(keyPressed.color)
    }
    console.log(keyPressed)

  } ) 
})  


function replace(){
  for( let i=0; i < placedStuff.length; i++ ){
    placedStuff.forEach((block) => rplace(block.x,block.y,block.block))
  }
  function rplace(x:number,y:number,block:string){
    ctx.value.fillStyle = block;
    ctx.value.fillRect(boardConfig.rows*x,boardConfig.rows*y, boardConfig.tileSize, boardConfig.tileSize)
     }
}
function moveLeft(){
  if(playerLocation.x.value != 0){
  ctx.value.fillStyle="white";
  ctx.value.fillRect(0,0, boardConfig.rows*boardConfig.tileSize, boardConfig.columns*boardConfig.tileSize )
  playerLocation.x.value --
  replace()
  ctx.value.fillStyle="black";
  ctx.value.fillRect(boardConfig.rows *playerLocation.x.value,boardConfig.rows * playerLocation.y.value, boardConfig.tileSize, boardConfig.tileSize )
}}
function moveUp(){
  if(playerLocation.y.value != 0){
  ctx.value.fillStyle="white";
  ctx.value.fillRect(0,0, boardConfig.rows*boardConfig.tileSize, boardConfig.columns*boardConfig.tileSize )
  playerLocation.y.value --
  replace()
  ctx.value.fillStyle="black";
  ctx.value.fillRect(boardConfig.rows *playerLocation.x.value,boardConfig.rows * playerLocation.y.value, boardConfig.tileSize, boardConfig.tileSize )
} }
function moveDown(){
  if(playerLocation.y.value != boardConfig.rows-1){
  ctx.value.fillStyle="white";
  ctx.value.fillRect(0,0, boardConfig.rows*boardConfig.tileSize, boardConfig.columns*boardConfig.tileSize )
  playerLocation.y.value ++
  replace()
  ctx.value.fillStyle="black";
  ctx.value.fillRect(boardConfig.rows *playerLocation.x.value,boardConfig.rows * playerLocation.y.value, boardConfig.tileSize, boardConfig.tileSize )
} }
function moveRight(){
  if(playerLocation.x.value !=boardConfig.columns-1 ){
  ctx.value.fillStyle="white";
  ctx.value.fillRect(0,0, boardConfig.rows*boardConfig.tileSize, boardConfig.columns*boardConfig.tileSize )
  playerLocation.x.value ++
  replace()
  ctx.value.fillStyle="black";
  ctx.value.fillRect(boardConfig.rows *playerLocation.x.value,boardConfig.rows * playerLocation.y.value, boardConfig.tileSize, boardConfig.tileSize )
} }


 function place(block: string){
  ctx.value.fillStyle = `${block}`;
  let x = playerLocation.x.value
  let y = playerLocation.y.value
  placedStuff.push({
    x:(x),
    y:(y),
    block:`${block}`
  })  
  ctx.value.fillRect(boardConfig.rows *(x),boardConfig.rows*(y), boardConfig.tileSize, boardConfig.tileSize)  
}

    function mover(key: KeyboardEvent) {
    if(key.code === "ArrowLeft"){
      moveLeft()
    }else if(key.code === "ArrowRight"){
      moveRight()
    }else if( key.code === "ArrowUp"){
      moveUp()
    }else if(key.code === "ArrowDown"){
      moveDown()
    }
   
  } 

 
</script>

<template>
<canvas id="canvas"></canvas>

</template>

<style lang="scss" scoped>


  #canvas{
    border: 1px solid black;
  }


</style>