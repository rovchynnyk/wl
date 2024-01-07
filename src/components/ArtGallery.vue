<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Button from '@/components/ButtonVariant.vue';
import { setFavourites } from '@/utils/localstorage';

defineProps<{
  gallery: any,
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

  <div class="overlay" v-if="showModal">
      <div class="modal">
        <button @click="closeModal" class="close-btn">
          <XMarkIcon />
        </button>

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

        <footer class="actions">
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
        </footer>
      </div>
    </div>
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

.actions {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 20px;
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
