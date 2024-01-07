<script setup lang="ts">
import { useRoute } from 'vue-router';
import { store } from '@/utils/store';
import { capitalize, onMounted } from 'vue';
import { useQuery } from "@tanstack/vue-query";
import { makeHttpRequest, API_KEY, API_ROOT } from '@/utils/httpUtils';
import Button from '@/components/ButtonVariant.vue';

const { params: { id } } = useRoute();

const shouldFetch = !store.artObjects[id as string];

const { data, refetch, isPending } = useQuery({ 
  queryKey: ['art_object'], 
  queryFn: () => {
    return makeHttpRequest({ 
      url: `${API_ROOT}/collection/${id}?key=${API_KEY}`,
    });
  },
  select: (response) => {
    return response.artObject;
  },
  enabled: shouldFetch,
});

onMounted(() => {
  if (shouldFetch) {
    refetch();
  }
});

const addToFavourites = () => {

};
</script>

<template>
  <div v-if="isPending">Loading</div>
  <div v-else>
    <Button variant="link" to="/" class="button">Back</Button>

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

img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
}

.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 28px;
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
</style>
