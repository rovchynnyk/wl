<script setup lang="ts">
import { computed } from 'vue';
import { favouritesStorage } from '@/utils/favouritesStorage';
import ArtGallery from '@/components/ArtGallery.vue';

const gallery = computed(() => {
  const favourites = favouritesStorage.getFavourites();
  
  const artObjectsKeys = Object.keys(favourites);

  return {
    artObjectsKeys,
    artObjects: favourites,
    count: artObjectsKeys.length,
  }
});
</script>

<template>
  <div>
    <h1>Favourites Page</h1>

    <div v-if="!gallery.count">No items here</div>

    <ArtGallery :gallery="gallery" />
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
@/utils/favouritesStorage