<template>
  <div>
    <h2>Create a World</h2>
    <button @click="$emit('close')">Close</button>
    <form @submit.prevent="">
        <submit>Create!</submit>
    </form>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
