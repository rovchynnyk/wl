<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { PaintBrushIcon, HeartIcon as HeartIconSolid } from '@heroicons/vue/24/solid';
import { HeartIcon as HeartIconOutlined } from '@heroicons/vue/24/outline';
import { useFavourites } from './utils/hooks/useFavourites';

const { count } = useFavourites();

</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">
        <PaintBrushIcon />
      </RouterLink>

      <RouterLink to="/favourites">
        <span class="favourites" v-if="count" :data-count="count">
          <HeartIconOutlined />
        </span>

        <HeartIconSolid v-else />
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
  width: 44px;

  &:visited {
    color: black;
  }
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

.favourites {
  display: inline-flex;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: attr(data-count);
    position: absolute;
    font-weight: bold;
  }
}
</style>
./utils/hooks/useFavourites