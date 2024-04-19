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



let placedStuff = [
  {
    x:4,
    y:4,
    block: "green"
  },
  {
    x:3,
    y:9,
    block: "yellow"
  }
]

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
  rows: 25,
  columns: 25,
  tileSize: 25
}

let playerLocation : playerPos  = {
  x: ref(10),
  y: ref(10),
}


onMounted(()=>{
  canvas.value = document.getElementById("canvas");
  ctx.value = canvas.value.getContext("2d");
  canvas.value.height = boardConfig.rows * boardConfig.tileSize
  canvas.value.width = boardConfig.columns * boardConfig.tileSize
  ctx.value.fillStyle="black";
  ctx.value.fillRect(boardConfig.rows *playerLocation.x.value,boardConfig.rows * playerLocation.y.value, boardConfig.tileSize, boardConfig.tileSize )
  window.addEventListener("keydown", function(){
     mover(this.event)
   })
})  


function replace(){
  for( let i=0; i < placedStuff.length; i++ ){
    placedStuff.forEach((block) => rplace(block.x,block.y,block.block))
  }
}
 function moveLeft(){
  if(playerLocation.x.value != 0){
  ctx.value.fillStyle="white";
  ctx.value.fillRect(0,0, boardConfig.rows*boardConfig.tileSize, boardConfig.columns*boardConfig.tileSize )
  playerLocation.x.value --
  ctx.value.fillStyle="black";
  ctx.value.fillRect(boardConfig.rows *playerLocation.x.value,boardConfig.rows * playerLocation.y.value, boardConfig.tileSize, boardConfig.tileSize )
  replace()
}}

function moveUp(){
  if(playerLocation.y.value != 0){
  ctx.value.fillStyle="white";
  ctx.value.fillRect(0,0, boardConfig.rows*boardConfig.tileSize, boardConfig.columns*boardConfig.tileSize )
  playerLocation.y.value --
  ctx.value.fillStyle="black";
  ctx.value.fillRect(boardConfig.rows *playerLocation.x.value,boardConfig.rows * playerLocation.y.value, boardConfig.tileSize, boardConfig.tileSize )
  replace()
} }
function moveDown(){
  if(playerLocation.y.value != boardConfig.rows-1){
  ctx.value.fillStyle="white";
  ctx.value.fillRect(0,0, boardConfig.rows*boardConfig.tileSize, boardConfig.columns*boardConfig.tileSize )
  playerLocation.y.value ++
  ctx.value.fillStyle="black";
  ctx.value.fillRect(boardConfig.rows *playerLocation.x.value,boardConfig.rows * playerLocation.y.value, boardConfig.tileSize, boardConfig.tileSize )
  replace()
} }
function moveRight(){
  if(playerLocation.x.value !=boardConfig.columns-1 ){
  ctx.value.fillStyle="white";
  ctx.value.fillRect(0,0, boardConfig.rows*boardConfig.tileSize, boardConfig.columns*boardConfig.tileSize )
  playerLocation.x.value ++
  ctx.value.fillStyle="black";
  ctx.value.fillRect(boardConfig.rows *playerLocation.x.value,boardConfig.rows * playerLocation.y.value, boardConfig.tileSize, boardConfig.tileSize )
  replace()
} }

function place(){
  ctx.value.fillStyle = "green";
  const x = playerLocation.x.value
  const y = playerLocation.y.value
  placedStuff.push({
    x:(x),
    y:(y),
    block: "Green"
  }) 
  ctx.value.fillRect(boardConfig.rows *(x +2),boardConfig.rows*(y+2), boardConfig.tileSize, boardConfig.tileSize)
  console.log(x,y)
  

}

function rplace(x:number,y:number,block:string){
  ctx.value.fillStyle = block;
  ctx.value.fillRect(boardConfig.rows*x,boardConfig.rows*y, boardConfig.tileSize, boardConfig.tileSize)
  console.log(x,y,block)
   }

    function mover(event) {
    const direction = keys.find(c => c.keyCode === event.keyCode)
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
<button @click="place">place green box</button>
<button @click="replace"> replace stuff</button>

</template>

<style lang="scss" scoped>


  #canvas{
    border: 1px solid black;
  }


</style>