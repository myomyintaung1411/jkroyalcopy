<script setup>
import { ref } from 'vue'

let counter = ref(0)

setInterval(() => {
  counter.value++
}, 1000)
</script>

<template>
  <div>
    <!-- <header class="bg-white shadow" v-if="$route.meta.title">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1
          @click="counter = 0"
          class="text-3xl font-bold leading-tight text-gray-900"
        >
          {{ $route.meta.title }} / {{ counter }}
        </h1>
      </div>
    </header> -->
    <main>
      <router-view />
    </main>
  </div>
</template>

<style>
*,
*:before,
*:after {
  box-sizing: inherit;
}
a:focus,
a:active {
  outline: none;
}

a,
a:focus,
a:hover {
  cursor: pointer;
  color: inherit;
  text-decoration: none;
}

div:focus {
  outline: none;
}

html {
  height: 100%;
  box-sizing: border-box;
  scroll-behavior: smooth;
}
body {
  padding: 0;
  margin: 0;
  font-size: 16px;
  color: rgba(255, 255, 255);
  line-height: 1.7;
  font-family: "Open Sans", sans-serif;
  /* background: #350b2d; */
  @apply bg-slate-700;
  min-height: 100vh;
  max-height: 100vh;
  height: 100vh;


}

.__bg{
  background-image: url('@/assets/images/bgcard.jpg');
  background-size: cover;
}
/* .__testbg{
    background-image: url(https://i.pinimg.com/564x/3e/37/df/3e37dff6907356cf8f784076c2f2f475.jpg);
  background-size: cover;
} */
</style>