import type { ArtObjectT } from '@/utils/types';

const ART_OBJECT_LS_KEY = 'artObjects';

export const getFavourites = () => {
  return JSON.parse(localStorage.getItem(ART_OBJECT_LS_KEY) ?? '{}');
}

export const setFavourites = (artObject: ArtObjectT) => {
  const { 
    webImage, principalOrFirstMaker, longTitle, title, objectNumber,
  } = artObject

  const artObjects = getFavourites();

  localStorage.setItem(ART_OBJECT_LS_KEY, JSON.stringify({
    ...artObjects,
    [objectNumber]: {
      webImage, principalOrFirstMaker, longTitle, title, objectNumber,
    }
  }))
};

export const getFavourite = (id: string) => {
  const artObjects = getFavourites();

  return artObjects[id];
};

export const getFavouritesCount = () => {
  const artObjects = getFavourites();

  return Object.keys(artObjects).length;
};
