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

  const saveFavourites = (artObject: ArtObjectT) => {
    try {
      favouritesStorage.setFavourite(artObject);

      saved.value = true;
      state.count = favouritesStorage.getFavouritesCount();

      toast.success('Art object successfully saved');
    } catch (err) {
      toast.error(`Error occurred: ${err}`);
    }
  };

  const removeFavourite = (id: string) => {
    favouritesStorage.deleteFavourite(id);

    saved.value = false;
    state.count = favouritesStorage.getFavouritesCount();

    toast.success('Art object successfully removed');
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
