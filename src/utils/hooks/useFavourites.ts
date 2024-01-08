import { computed, reactive, ref } from 'vue';
import { useToast } from "vue-toastification";

import { favouritesStorage } from '../favouritesStorage';

import type { ArtObjectT } from '@/utils/types';

const state = reactive({ 
  count: favouritesStorage.getFavouritesCount(),
});

export const useFavourites = () => {
  const saved = ref(false);
  const toast = useToast();

  const updateFavourites = (message: string, store: boolean) => {
    saved.value = store;
    state.count = favouritesStorage.getFavouritesCount();

    toast.success(message);
  };

  const saveFavourites = (artObject: ArtObjectT) => {
    try {
      favouritesStorage.setFavourite(artObject);

      updateFavourites('Art object successfully saved', true);
    } catch (err) {
      toast.error(`Error occurred: ${err}`);
    }
  };

  const removeFavourite = (id: string) => {
    favouritesStorage.deleteFavourite(id);

    updateFavourites('Art object successfully removed', false);
  }

  const count = computed(() => {
    return state.count;
  });

  return {
    saved,
    count,
    saveFavourites,
    removeFavourite,
  }
};
