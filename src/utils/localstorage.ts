import type { ArtObjectT } from '@/utils/types';

const ART_OBJECT_LS_KEY = 'artObjects';

const setFavourites = (favourites: ArtObjectT) => {
  localStorage.setItem(ART_OBJECT_LS_KEY, JSON.stringify(favourites));
}

export const getFavourites = () => {
  return JSON.parse(localStorage.getItem(ART_OBJECT_LS_KEY) ?? '{}');
}

export const setFavourite = (artObject: ArtObjectT) => {
  const { 
    webImage, principalOrFirstMaker, longTitle, title, objectNumber,
  } = artObject

  const favourites = {
    ...getFavourites(),
    [objectNumber]: {
      webImage, principalOrFirstMaker, longTitle, title, objectNumber,
    }
  };

  setFavourites(favourites);
};

export const deleteFavourite = (id: string) => {
  const favourites = getFavourites();

  if (!(id in favourites)) {
    return;
  }

  delete favourites[id];

  setFavourites(favourites)
};

export const getFavourite = (id: string) => {
  const artObjects = getFavourites();

  return artObjects[id];
};

export const getFavouritesCount = () => {
  const artObjects = getFavourites();

  return Object.keys(artObjects).length;
};
