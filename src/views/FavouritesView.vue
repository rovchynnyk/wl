<script setup lang="ts">
import { favouritesStorage } from '@/utils/favouritesStorage';
import ArtGallery from '@/components/ArtGallery.vue';
</script>

<template>
  <div>
    <h1>Favourites Page</h1>

    <div v-if="!favouritesStorage.getFavouritesCount()">No items here</div>

    <ArtGallery :gallery="favouritesStorage.getFavourites()" />
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
@/utils/favouritesStorage