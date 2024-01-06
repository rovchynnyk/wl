<script setup lang="ts">
// import TheWelcome from '../components/TheWelcome.vue'
// import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router'
import { makeHttpRequest, API_ROOT, API_KEY } from '@/utils/httpUtils';
import { XMarkIcon } from '@heroicons/vue/24/solid'
// import { ModalContainer } from '@/components/ModalContainer'
import ModalContainer from '@/components/ModalContainer.vue'
import Button from '@/components/ButtonVariant.vue';

import { ref } from 'vue';

const data = ref(null)

const selected = ref(0);

const search = defineModel();

const showModal = ref(false);

const handleSubmit = async () => {
  data.value = await makeHttpRequest({ 
    url: `${API_ROOT}/collection?key=${API_KEY}&ps=12&q=${search.value}&imgonly=true`,
  });
}

const handleModalShow = () => {
  showModal.value = !showModal.value;
};

const fetch = async () => {
  const res = await makeHttpRequest({ 
    url: `${API_ROOT}/collection?key=${API_KEY}&ps=12&q=lll&imgonly=true`,
  });
};

console.log(data)
</script>

<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <input class="search" type="text" v-model="search" placeholder="Search for a piece of art" />

      <Button type="submit">Search</Button>
    </form>

    <div class="container">
      <div class="wrapper" v-for="el in data?.artObjects" :key="el.id" :data-title="el.title" @click="handleModalShow(el.id)">
      <!-- <div class="wrapper" v-for="el in data?.artObjects" :key="el.id" :data-title="el.title" @click="handleModalShow(el.id)"> -->
        <img :src="el.webImage.url" />
      </div>

      <button @click="fetch">Load More</button>
    </div>

    <div class="overlay" v-show="showModal">
      <div class="modal" @click="handleModalShow">
        <button @click="handleModalShow" class="close-btn">
          <XMarkIcon />
        </button>

        <footer class="actions">
          <button class="button">Add To Favourites</button>
          <RouterLink to="/" class="button">View details</RouterLink>
        </footer>
      </div>
    </div>
    <!-- <ModalContainer v-show="showModal">
      hello modal
    </ModalContainer> -->
  </div>
</template>

<style scoped>
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
}

.actions {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 20px;
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
  line-height: 1;

  &:hover,
  &:focus {
    background-color: #4338ca; /* hover:bg-indigo-700 */
  }
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border: none;
  background-color: #fff;
  margin-bottom: 20px;

  & > svg {
    width: 24px;
  }
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