import { reactive } from 'vue';

import type { ArtObjectT, GalleryStoreT } from './types';

export const normalizeGallery = (gallery: ArtObjectT[]) => {
  return gallery.reduce<GalleryStoreT['artObjects']>((acc, obj) => {
    acc[obj.objectNumber] = obj; 

    return acc;
  }, {});
};

export const store = reactive<GalleryStoreT>({
  count: 0,
  artObjects: {}
});

export const setGalleryData = ({ count, artObjects }: { count: number; artObjects: ArtObjectT[] }) => {
  store.count = count;

  Object.assign(store.artObjects, normalizeGallery(artObjects));
};

export const resetGalleryData = () => {
  store.count = 0;
  store.artObjects = {};
}
