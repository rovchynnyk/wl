<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { PaintBrushIcon, HeartIcon as HeartIconSolid } from '@heroicons/vue/24/solid'
import { HeartIcon as HeartIconOutlined } from '@heroicons/vue/24/outline';
</script>

<template>
  <header>
    <PaintBrushIcon class="icon" />

    <HeartIconOutlined class="icon" />
    <!-- <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div> -->
  </header>

  <RouterView />
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
  margin: 0 auto;
}

.icon {
  width: 36px;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
