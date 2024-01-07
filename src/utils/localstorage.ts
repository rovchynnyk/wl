import type { ArtObjectT } from '@/utils/types';

export const getFavourites = () => {
  return JSON.parse(localStorage.getItem('artObjects') ?? '{}');
}

export const setFavourites = (artObject: ArtObjectT) => {
  const { 
    webImage, principalOrFirstMaker, longTitle, title, objectNumber,
  } = artObject

  const artObjects = getFavourites();

  localStorage.setItem('artObjects', JSON.stringify({
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
