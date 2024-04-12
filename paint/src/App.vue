<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from './lib/supabaseClient.js'
interface boardDisplay {
  rows: number;
  columns: number;
  tileSize: number;
}
/* interface playerPos {
  x: number;
  y: number;
} */

const buttons = [
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
  tileSize: 25
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
  ctx.value.fillStyle="black";
  ctx.value.fillRect(boardConfig.rows *playerLocation.x.value,boardConfig.rows * playerLocation.y.value, boardConfig.tileSize, boardConfig.tileSize )
  
})  

 function move(){
  ctx.value.fillStyle="white";
  ctx.value.fillRect(0,0, boardConfig.rows*boardConfig.tileSize, boardConfig.columns*boardConfig.tileSize )
  playerLocation.x.value --
  ctx.value.fillStyle="black";
  ctx.value.fillRect(boardConfig.rows *playerLocation.x.value,boardConfig.rows * playerLocation.y.value, boardConfig.tileSize, boardConfig.tileSize )
} 

</script>

<template @keyup="move">
<canvas id="canvas"></canvas>
<button @click="move"> heyfhiw</button>
</template>

<style lang="scss" scoped>


  #canvas{
    border: 1px solid black;
  }


</style>