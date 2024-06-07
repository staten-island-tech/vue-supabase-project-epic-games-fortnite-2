<template>
    <div class="home">
        <div class="head">
            <h1 class="micro-5-charted-regular" id="header">minecraft paint</h1>
        </div>
        <div><!--v-for something the array below-->
            <!-- <img src="/public/waifu/bocchiMikuJJK.jpg"> -->
        <h2>css'd with world's best css-er<br>(what even is the purpose of this page)</h2>
        <template v-for="image in images">
            <img :src="image.image">
        </template>
        </div>
    </div>
</template>

<script setup lang="ts">
const images: {image: string; artist: string}[] = [
    {
        image: '/waifu/bocchiMikuJJK.jpg',
        artist: 'bloop',
    },
    {
        image: '/waifu/exuAmmo.jpg',
        artist: 'eeee',
    },
    {
        image:'/waifu/exuAustist.jpg',
        artist: 'e'
    },
    {
        image: '/waifu/exuDevious.jpg',
        artist: 'eeee',
    },
    {
        image: '/waifu/exuNoodle.jpg',
        artist: 'eeee',
    },
    {
        image: '/waifu/exuWink.jpg',
        artist: 'eeee',
    },
    {
        image: '/waifu/mikuTeto.jpg',
        artist: 'eeee',
    },
    {
        image: '/waifu/moaBocchi.jpg',
        artist: 'eeee',
    },
    {
        image: '/waifu/nijiRyo.jpg',
        artist: 'eeee',
    },
    {
        image: '/waifu/ryoPoor.jpg',
        artist: 'eeee',
    },
    {
        image: '/waifu/ryoReal.jpg',
        artist: 'eeee',
    },
]; //fix this strings later :skull:
//for loop -> push each thing to the array thing
// images.push('hi')

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Micro+5+Charted&display=swap');
.home {
    margin-top: 6.1rem;
    margin-left: 18rem;
    text-align: center;
}

.head{
    border-color:red;
}

.micro-5-charted-regular {
  font-family: "Micro 5 Charted", sans-serif;
  font-weight: 400;
  font-style: normal;
}

#header{
    font-size: 8rem;
    text-align: center;
}

img{
    width: 25%
}
</style>