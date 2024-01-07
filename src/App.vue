<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { PaintBrushIcon, HeartIcon } from '@heroicons/vue/24/solid'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">
        <PaintBrushIcon />
      </RouterLink>

      <RouterLink to="/favourites">
        <HeartIcon />
      </RouterLink>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  height: 64px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #f4f4f4;
  border-bottom: 2px solid #ccc;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  display: flex;
  place-items: center;
  z-index: 1;
}

a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 36px;
}

svg {
  fill: black;
  stroke: black;
}

nav {
  font-size: 12px;
  text-align: center;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
}

main {
  padding-top: 80px;
}
</style>
