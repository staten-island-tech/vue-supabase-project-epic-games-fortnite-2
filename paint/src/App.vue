<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from './lib/supabaseClient.js'
interface boardDisplay {
  rows: number;
  columns: number;
  tileSize: number;
}
 interface playerPos {
  x: number;
  y: number;
} 

const keys = [
  {
    direction: "left",
    keyCode: 37,
  },
  {
    direction: "top",
    keyCode: 38,
  },
  {
    direction: "right",
    keyCode: 39,
  },
  {
    direction: "bottom",
    keyCode: 40,
  }
];


const canvas = ref();
const ctx = ref();

const boardConfig: boardDisplay = {
  rows: 20,
  columns: 20,
  tileSize: 20
}

let playerLocation/* : playerPos */ = {
  x: ref(10),
  y: ref(10),
}


onMounted(()=>{
  canvas.value = document.getElementById("canvas");
  ctx.value = canvas.value.getContext("2d");
  canvas.value.height = boardConfig.rows * boardConfig.tileSize
  canvas.value.width = boardConfig.columns * boardConfig.tileSize
  ctx.value.fillStyle="black"; //ctx => basically where the player is
  ctx.value.fillRect(boardConfig.rows *playerLocation.x.value,boardConfig.rows * playerLocation.y.value, boardConfig.tileSize, boardConfig.tileSize )
  window.addEventListener("keydown", function(){
     mover(this.event)
   })
   
})  

 function moveLeft(){
  if(playerLocation.x.value != 0){
  ctx.value.fillStyle="white";
  ctx.value.fillRect(0,0, boardConfig.rows*boardConfig.tileSize, boardConfig.columns*boardConfig.tileSize )
  playerLocation.x.value --
  ctx.value.fillStyle="black";
  ctx.value.fillRect(boardConfig.rows *playerLocation.x.value,boardConfig.rows * playerLocation.y.value, boardConfig.tileSize, boardConfig.tileSize )
    console.log(playerLocation.x)
}}

function moveUp(){
  if(playerLocation.y.value != 0){
  ctx.value.fillStyle="white";
  ctx.value.fillRect(0,0, boardConfig.rows*boardConfig.tileSize, boardConfig.columns*boardConfig.tileSize )
  playerLocation.y.value --
  ctx.value.fillStyle="black";
  ctx.value.fillRect(boardConfig.rows *playerLocation.x.value,boardConfig.rows * playerLocation.y.value, boardConfig.tileSize, boardConfig.tileSize )
} }
function moveDown(){
  if(playerLocation.y.value != boardConfig.rows-1){
  ctx.value.fillStyle="white";
  ctx.value.fillRect(0,0, boardConfig.rows*boardConfig.tileSize, boardConfig.columns*boardConfig.tileSize )
  playerLocation.y.value ++
  ctx.value.fillStyle="black";
  ctx.value.fillRect(boardConfig.rows *playerLocation.x.value,boardConfig.rows * playerLocation.y.value, boardConfig.tileSize, boardConfig.tileSize )
} }
function moveRight(){
  if(playerLocation.x.value !=boardConfig.columns-1 ){
  ctx.value.fillStyle="white";
  ctx.value.fillRect(0,0, boardConfig.rows*boardConfig.tileSize, boardConfig.columns*boardConfig.tileSize )
  playerLocation.x.value ++
  ctx.value.fillStyle="black";
  ctx.value.fillRect(boardConfig.rows *playerLocation.x.value,boardConfig.rows * playerLocation.y.value, boardConfig.tileSize, boardConfig.tileSize )
} }


    function mover(event) {
    const direction = keys.find(c => c.keyCode === event.keyCode)
    console.log(direction?.direction)
    if(direction?.direction === "left"){
      moveLeft()
    }else if(direction?.direction === "right"){
      moveRight()
    }else if( direction?.direction === "top"){
      moveUp()
    }else if(direction?.direction === "bottom"){
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