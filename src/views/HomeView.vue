<script setup lang="ts">
// import TheWelcome from '../components/TheWelcome.vue'
// import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router'
import { makeHttpRequest, API_ROOT, API_KEY } from '@/utils/httpUtils';
import { debounce } from '../utils/debounce';
// import { ModalContainer } from '@/components/ModalContainer'
import ModalContainer from '@/components/ModalContainer.vue'

import { ref } from 'vue';

const data = ref(null)

const selected = ref(0);

const showModal = ref(false);

const handleInput = debounce(async (ev: Event) => {
  const maker = (ev.target as HTMLInputElement).value;

  data.value = await makeHttpRequest({ 
    url: `${API_ROOT}/collection?key=${API_KEY}&involvedMaker=Rembrandt+van+Rijn`,
  });
}, 500);

const handleModalShow = (id: number) => {
  showModal.value = !showModal.value;
  selected.value = id;
};

console.log(data)
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
    <input class="search" type="search" @input="handleInput"/>

    <div class="container">
      <div class="wrapper" v-for="el in data?.artObjects" :key="el.id" :data-title="el.title" @click="handleModalShow(el.id)">
        <img :src="el.headerImage.url" />
      </div>
    </div>

    <div class="overlay" v-show="showModal">
      <div class="modal" @click="handleModalShow">
        <span>&times;</span>

        <footer class="actions">
          <button class="button">Add To Favourites</button>
          <RouterLink to="/" class="button">View details</RouterLink>
        </footer>
      </div>
    </div>
    <!-- <ModalContainer v-show="showModal">
      hello modal
    </ModalContainer> -->
  </main>
</template>

<style scoped>
main {
  padding-top: 80px;
}

.container {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 16px;
  row-gap: 26px;

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
    opacity: 0.5;

    &::after {
      transform: translateY(0%);
    }
  }

  &::after {
    content: attr(data-title);
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: black;
    opacity: 0.75;
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

.search { 
  display: block;
  margin: 0 auto 24px;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
}

.modal {
  background-color: white;
  padding: 20px;
  width: 80%;
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
}

.actions {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}

.button {
  border-radius: 8px;
  padding: 12px 24px;
  background-color: #4f46e5;
  color: #fff;
  border: none;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  line-height: 1;

  &:hover,
  &:focus {
    background-color: #4338ca; /* hover:bg-indigo-700 */
  }
}

@media (min-width: 640px) {
  .actions {
    flex-direction: row;
  }

  .button {
    &:not(:last-child) {
      margin-right: 20px;
    }
  }
}
</style>