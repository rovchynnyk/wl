<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Button from '@/components/ButtonVariant.vue';
import { setFavourites } from '@/utils/localstorage';
import ModalView from './ModalView.vue';

import type { GalleryStoreT } from '@/utils/types';

defineProps<{
  gallery: GalleryStoreT['artObjects'],
}>();

const showModal = ref(false);

const selected = ref<string>('');

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const handleArtClick = (id: string) => {
  selected.value = id;

  openModal();
};

const { name: routeName } = useRoute();
</script>

<template>
  <div class="gallery-container">
    <div 
      class="wrapper" 
      v-for="key in Object.keys(gallery)" 
      :key="key" 
      :data-title="gallery[key].title" 
      @click="handleArtClick(gallery[key].objectNumber)"
    >
      <img :src="gallery[key].webImage.url" />
    </div>
  </div>

  <ModalView :show="showModal" @modalClose="closeModal">
    <div class="art-container">
      <img 
        :src="gallery[selected].webImage.url" 
        :alt="gallery[selected].principalOrFirstMaker" 
      />

      <section>
        <h4>
          {{ gallery[selected].principalOrFirstMaker }}
        </h4>

        <p>
          {{ gallery[selected].longTitle }}
        </p>
      </section>
    </div>

    <template #footer>
      <Button 
        type="button" 
        v-if="routeName !== 'favourites'" 
        @click="setFavourites(gallery[selected])"
      >
        Add To Favourites
      </Button>

      <RouterLink 
        :to="{ name: 'details', params: { id: selected } }" 
        class="action-button"
      >
        View details
      </RouterLink>
    </template>
  </ModalView>
</template>

<style scoped>
.gallery-container {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 16px;
  row-gap: 26px;
  margin-bottom: 24px;
}

.wrapper {
  aspect-ratio: 1 / 1;
  width: 100%;
  overflow: hidden;
  position: relative;

  &:hover,
  &:focus {
    &::after {
      transform: translateY(0%);
    }
  }

  &::after {
    content: attr(data-title);
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: rgba(0,0,0,0.5);
    color: white;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    padding: 0 8px;
    transform: translateY(100%);
    transition: transform 0.25s ease-out;
    -webkit-line-clamp: 3;
            line-clamp: 3;
    -webkit-box-orient: vertical;
  }
}

.close-btn {
  margin-left: auto;
  border: none;
  background-color: #fff;
  color: #000;
  cursor: pointer;

  & > svg {
    width: 24px;
  }
}

.art-container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  column-gap: 20px;
  margin-bottom: 24px;

  h4 {
    font-weight: bolder;
    font-size: 18px;
    margin-bottom: 12px;
  }
}

@media (min-width: 768px) {
  .gallery-container {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .gallery-container {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
