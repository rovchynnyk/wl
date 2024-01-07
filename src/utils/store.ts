import { reactive } from 'vue';

type ArtObjectT = {
  id: string,
  title: string,
  longTitle: string,
  principalOrFirstMaker: string,
  webImage: {
    url: string,
  }
}

type GalleryStoreT = {
  count: number;
  artObjects: { [key: string]: ArtObjectT };
}

const normalizeGallery = (gallery: ArtObjectT[]) => {
  return gallery.reduce<GalleryStoreT['artObjects']>((acc, obj) => {
    acc[obj.id] = obj; 

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
