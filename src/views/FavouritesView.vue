<script setup lang="ts">
import { getFavourites, getFavouritesCount} from '@/utils/localstorage';
import ArtGallery from '@/components/ArtGallery.vue';
</script>

<template>
  <div>
    <h1>Favourites Page</h1>

    <div v-if="!getFavouritesCount()">No items here</div>

    <ArtGallery :gallery="getFavourites()" />
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
