import { ref } from 'vue';
import { useToast } from "vue-toastification";

import { setFavourites } from '../localstorage';

import type { ArtObjectT } from '@/utils/types';

export const useSaveFavourites = () => {
  const saved = ref(false);
  const toast = useToast();

  const saveFavourites = (artObject: ArtObjectT) => {
    try {
      setFavourites(artObject);
      saved.value = true;
      toast.success('Art object successfully saved');
    } catch (err) {
      toast.error(`Error occurred: ${err}`);
    }
  };

  return {
    saveFavourites,
    saved,
  }
};
