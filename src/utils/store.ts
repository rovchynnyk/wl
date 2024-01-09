import { reactive } from 'vue';

import type { ArtObjectT, GalleryStoreT } from './types';

export const normalizeGallery = (gallery: ArtObjectT[]) => {
  const artObjects = gallery.reduce<GalleryStoreT['artObjects']>((acc, obj) => {
    acc[obj.objectNumber] = obj; 

    return acc;
  }, {});

  const artObjectsKeys = gallery.map(({ objectNumber }) => {
    return objectNumber;
  })

  return {
    artObjects,
    artObjectsKeys,
  };
};

export const store = reactive<GalleryStoreT>({
  count: 0,
  artObjects: {},
  artObjectsKeys: [],
});

export const setGalleryData = ({ count, artObjects: artWorkPieces }: { count: number; artObjects: ArtObjectT[] }) => {
  store.count = count;

  const { artObjects, artObjectsKeys } = normalizeGallery(artWorkPieces);

  Object.assign(store.artObjects, artObjects);
  store.artObjectsKeys = [
    ...store.artObjectsKeys, ...artObjectsKeys,
  ]
};

export const resetGalleryData = () => {
  store.count = 0;
  store.artObjects = {};
  store.artObjectsKeys = [];
}
