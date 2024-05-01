<template>
  <div class="backdrop">
    <div class="modal">
      <h2>Create a World</h2>
      <button class="btn-close" @click="$emit('close')">X</button>
      <form @submit.prevent="createWorld()">
        <button type="submit">Create</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
function createWorld(){
  
}
</script>

<style scoped>
  .backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.0001);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal {
    background: rgba(173, 173, 173, 0.9);
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    position: relative;
    width: 50vw;
    height: 80vh;
  }
  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #ffffff;
    background: transparent;
  }
  </style>
