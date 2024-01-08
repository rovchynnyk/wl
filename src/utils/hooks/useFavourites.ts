import { computed, reactive, ref } from 'vue';
import { useToast } from "vue-toastification";


// todo might be better to create a class
import { 
  setFavourite, getFavouritesCount, deleteFavourite,
} from '../localstorage';

import type { ArtObjectT } from '@/utils/types';

const state = reactive({ 
  count: getFavouritesCount(),
});

export const useFavourites = () => {
  const saved = ref(false);
  const toast = useToast();

  const saveFavourites = (artObject: ArtObjectT) => {
    try {
      setFavourite(artObject);

      saved.value = true;
      state.count = getFavouritesCount();

      toast.success('Art object successfully saved');
    } catch (err) {
      toast.error(`Error occurred: ${err}`);
    }
  };

  const removeFavourite = (id: string) => {
    deleteFavourite(id);

    saved.value = false;
    state.count = getFavouritesCount();

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
