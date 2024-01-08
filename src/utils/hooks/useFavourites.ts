import { computed, reactive, ref } from 'vue';
import { useToast } from "vue-toastification";

import { setFavourites, getFavouritesCount } from '../localstorage';

import type { ArtObjectT } from '@/utils/types';

const state = reactive({ 
  count: getFavouritesCount(),
});

export const useFavourites = () => {
  const saved = ref(false);
  const toast = useToast();

  const saveFavourites = (artObject: ArtObjectT) => {
    try {
      setFavourites(artObject);

      saved.value = true;
      state.count = getFavouritesCount();

      toast.success('Art object successfully saved');
    } catch (err) {
      toast.error(`Error occurred: ${err}`);
    }
  };

  const count = computed(() => {
    return state.count;
  });

  return {
    saved,
    count,
    saveFavourites,
  }
};
