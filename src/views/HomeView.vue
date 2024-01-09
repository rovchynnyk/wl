<script setup lang="ts">
import { ref, computed } from 'vue';
import { makeHttpRequest, API_ROOT, API_KEY } from '@/utils/httpUtils';
import { store, setGalleryData, resetGalleryData } from '@/utils/store';
import Button from '@/components/ButtonVariant.vue';
import ArtGallery from '@/components/ArtGallery.vue';

import type { GalleryStoreT } from '@/utils/types';
 
const loadingMoreSteps = ref(2);

const visibleItems = ref<GalleryStoreT>({
  count: 0,
  artObjects: {},
  artObjectsKeys: [],
});

const isPending = ref(false);

const search = defineModel();

const itemsPerPage = 12;

const fetch = async () => {
  const nextPage = store.artObjectsKeys.length / 20;

  isPending.value = true;

  const response = await makeHttpRequest({ 
    url: `${API_ROOT}/collection?key=${API_KEY}&ps=20&p=${nextPage}&q=${search.value}&imgonly=true`,
  });

  setGalleryData(response);

  updateSlice();

  isPending.value = false;
};

const handleSubmit = () => {
  resetGalleryData();

  loadingMoreSteps.value = 2;

  fetch();
}

const updateSlice = () => {
  const start = (loadingMoreSteps.value - 1) * itemsPerPage;

  visibleItems.value = {
    ...store,
    artObjectsKeys: [
      ...visibleItems.value.artObjectsKeys,
      ...store.artObjectsKeys.slice(start, start + itemsPerPage)
    ],
  };
};

const shouldLoadMore = computed(() => {
  const { artObjectsKeys, count } = store;

  return artObjectsKeys.length < count;
});

const loadingMore = () => {
  if (loadingMoreSteps.value * itemsPerPage >= store.artObjectsKeys.length) {
    fetch();
  } else {
    updateSlice();
  }

  loadingMoreSteps.value++;
};
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

    <ArtGallery :gallery="visibleItems" />

    <div class="more-container">
      <Button 
        :disabled="isPending"
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