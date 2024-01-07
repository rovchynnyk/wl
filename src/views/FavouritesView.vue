<script setup lang="ts">
import { computed } from 'vue';
import { getFavourites } from '@/utils/localstorage';
import ArtGallery from '@/components/ArtGallery.vue';

const gallery = computed(getFavourites);
</script>

<template>
  <div>
    <h1>Favourites Page</h1>

    <div v-if="!Object.keys(gallery)">No items here</div>

    <ArtGallery :gallery="gallery" />
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
