<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { capitalize, computed } from 'vue';
import { useQuery } from "@tanstack/vue-query";
import { ArrowPathIcon } from '@heroicons/vue/24/solid'
import { makeHttpRequest, API_KEY, API_ROOT } from '@/utils/httpUtils';
import { getFavourite } from '@/utils/localstorage';
import { useSaveFavourites } from '@/utils/hooks/useSaveFavourites';
import Button from '@/components/ButtonVariant.vue';

const { params: { id } } = useRoute();
const router = useRouter();
const { saved, saveFavourites } = useSaveFavourites();

const { data, isPending } = useQuery({ 
  queryKey: ['art_object', id], 
  queryFn: () => {
    return makeHttpRequest({ 
      url: `${API_ROOT}/collection/${id}?key=${API_KEY}`,
    });
  },
  select: (response) => {
    return response.artObject;
  },
});

const addToFavourites = () => {
  saveFavourites(data.value);
};

const stored = computed(() => {
  return getFavourite(id as string);
});

const goBack = () => {
  router.go(-1);
};
</script>

<template>
  <div v-if="isPending" class="loader-container">
    <ArrowPathIcon class="loader" />
  </div>

  <div v-else>
    <Button 
      type="button" 
      class="button"
      aria-label="Go back to previous page"
      @click="goBack" 
    >
      Go Back
    </button>

    <div class="container">
      <img :src="data.webImage.url" :alt="data.title" />

      <section>
        <h1>{{ data.longTitle }}</h1>

        <p>{{ data.plaqueDescriptionEnglish }}</p>

        <ul v-if="data.objectCollection">
          <li 
            v-for="collection in data.objectCollection" 
            :key="collection"
            class="chip"
          >
            {{capitalize(collection)}}
          </li>
        </ul>

        <ul class="colors" v-if="data.colors">
          <li 
            v-for="({ hex }, index) in data.colors" 
            :key="index" 
            :style="{ backgroundColor: hex }" 
            class="color-box" 
          />
        </ul>

        <Button 
          type="button" 
          :disabled="saved || stored"
          @click="addToFavourites()"
        >
          Add to Favourites
        </Button>
      </section>
    </div>
  </div>
</template>

<style scoped>
h1, 
p {
  margin-bottom: 20px;
}

ul {
  padding: 0;
  margin-bottom: 20px;
}

li {
  display: inline-block;
  list-style-type: none;
  border-radius: 12px;
  padding: 4px 16px;

  &:not(:last-of-type) {
    margin-right: 8px;
  }
}

.container {
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 28px;
  row-gap: 24px;
}

.button {
  display: inline-flex;
  margin-bottom: 24px;
}

.chip {
  background-color: #eef2ff;
}

.color-box {
  width: 32px;
  height: 32px;
}

.loader-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.loader {
  width: 60px;
  animation: rotate 2s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (min-width: 768px) {
  .container {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
