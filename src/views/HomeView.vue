<script setup lang="ts">
import { makeHttpRequest, API_ROOT, API_KEY } from '@/utils/httpUtils';
import { store, setGalleryData, resetGalleryData } from '@/utils/store';
import Button from '@/components/ButtonVariant.vue';
import ArtGallery from '@/components/ArtGallery.vue';

import { ref, computed } from 'vue';
 
const page = ref(1);

const search = defineModel();

const fetch = async () => {
  const response = await makeHttpRequest({ 
    url: `${API_ROOT}/collection?key=${API_KEY}&ps=12&p=${page.value}&q=${search.value}&imgonly=true`,
  });

  setGalleryData(response);
};

const handleSubmit = () => {
  resetGalleryData();

  page.value = 1;

  fetch();
}

const loadingMore = () => {
  page.value++;

  fetch();
};

const shouldLoadMore = computed(() => {
  const { artObjects, count } = store;

  return Object.keys(artObjects).length < count;
});
</script>

<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <input 
        class="search" 
        type="text" 
        v-model="search" 
        placeholder="Search for a piece of art"
      />

      <Button type="submit">Search</Button>
    </form>

    <ArtGallery :gallery="store.artObjects" />

    <div class="more-container">
      <Button 
        v-if="shouldLoadMore"
        type="button"
        @click="loadingMore" 
      >
        Load More
      </button>
    </div>
  </div>
</template>

<style scoped>
form {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
}

.search { 
  display: block;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  width: 600px;
  font-size: 16px;
}

.more-container {
  display: flex;
  justify-content: center;
}
</style>