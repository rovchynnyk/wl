<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { makeHttpRequest, API_ROOT, API_KEY } from '@/utils/httpUtils';
import { XMarkIcon } from '@heroicons/vue/24/solid'
import Button from '@/components/ButtonVariant.vue';
import { store, setGalleryData } from '@/utils/store';

import { ref, computed } from 'vue';
 
const page = ref(1);

const selected = ref<string>('');

const search = defineModel();

const showModal = ref(false);

const fetch = () => {
  return makeHttpRequest({ 
    url: `${API_ROOT}/collection?key=${API_KEY}&ps=12&p=${page.value}&q=${search.value}&imgonly=true`,
  });
};

const handleSubmit = async () => {
  setGalleryData(
    await fetch()
  );
}

const loadingMore = async () => {
  page.value++;

  await handleSubmit();
};

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const handleArtClick = (id: string) => {
  openModal();

  selected.value = id;
};

const shouldLoadMore = computed(() => {
  const { artObjects, count } = store;

  return Object.keys(artObjects).length < count;
});
</script>

<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <input class="search" type="text" v-model="search" placeholder="Search for a piece of art" />

      <Button type="submit">Search</Button>
    </form>

    <div class="gallery-container">
      <div 
        class="wrapper" 
        v-for="key in Object.keys(store.artObjects)" 
        :key="key" 
        :data-title="store.artObjects[key].title" 
        @click="handleArtClick(store.artObjects[key].id)"
      >
        <img :src="store.artObjects[key].webImage.url" />
      </div>
    </div>

    <div class="more-container">
      <Button 
        type="button" 
        v-if="shouldLoadMore"
        @click="loadingMore" 
      >
        Load More
      </button>
    </div>

    <div class="overlay" v-if="showModal">
      <div class="modal">
        <button @click="closeModal" class="close-btn">
          <XMarkIcon />
        </button>

        <div class="art-container">

          <img 
            :src="store.artObjects[selected].webImage.url" 
            :alt="store.artObjects[selected].principalOrFirstMaker" 
          />

          <section>
            <h4>
              {{ store.artObjects[selected].principalOrFirstMaker }}
            </h4>

            <p>
              {{ store.artObjects[selected].longTitle }}
            </p>
          </section>
        </div>

        <footer class="actions">
          <Button type="button">Add To Favourites</Button>
          
          <RouterLink 
            :to="selected" 
            class="button"
          >
            View details
          </RouterLink>
        </footer>
      </div>
    </div>
    <!-- todo implement modal container -->
  </div>
</template>

<style scoped>
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
.gallery-container {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 16px;
  row-gap: 26px;
  margin-bottom: 24px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
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

img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
}

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

.modal {
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 600px;
}

.overlay {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
  padding: 24px;
  display: flex;
  align-items: self-end;
  justify-content: center;

  @media (min-width: 1024px) {
    align-items: center;
  }
}

.actions {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 20px;
}

/* .button {
  border-radius: 8px;
  padding: 12px 24px;
  background-color: #4f46e5;
  color: #fff;
  border: none;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;

  &:hover,
  &:focus {
    background-color: #4338ca;
  }
} */

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

.more-container {
  display: flex;
  justify-content: center;
}

@media (min-width: 640px) {
  .actions {
    flex-direction: row;
  }

  .button {
    flex: 1;
  }
}
</style>