<template>
    
    <div class="home">
        <h1 class="micro-5-charted-regular" id="header">minecraft paint</h1>
        <div><!--v-for something the array below--></div>
    </div>
</template>

<script setup lang="ts">
const images: string[] = []; //fix this strings later :skull:
//for loop -> push each thing to the array thing
images.push('hi')

console.log(images)
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Micro+5+Charted&display=swap');
.home {
    margin-top: 6.1rem;
    margin-left: 23rem;
    text-align: center;
}

.micro-5-charted-regular {
  font-family: "Micro 5 Charted", sans-serif;
  font-weight: 400;
  font-style: normal;
}

#header{
    font-size: 10rem;
    text-align: center;
}
</style>