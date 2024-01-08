import type { ArtObjectT } from '@/utils/types';

class FavouritesStorage {
  private storageKey = 'artObjects';

  private setFavourites(favourites: ArtObjectT) {
    localStorage.setItem(this.storageKey, JSON.stringify(favourites));
  }

  public deleteFavourite(id: string) {
    const favourites = this.getFavourites();
  
    if (!(id in favourites)) {
      return;
    }
  
    delete favourites[id];
  
    this.setFavourites(favourites)
  };

  public getFavourites() {
    return JSON.parse(localStorage.getItem(this.storageKey) ?? '{}');
  }
  
  public getFavourite(id: string) {
    const artObjects = this.getFavourites();
  
    return artObjects[id];
  };
  
  public getFavouritesCount() {
    const artObjects = this.getFavourites();
  
    return Object.keys(artObjects).length;
  };

  public setFavourite (artObject: ArtObjectT) {
    const { 
      webImage, principalOrFirstMaker, longTitle, title, objectNumber,
    } = artObject
  
    const favourites = {
      ...this.getFavourites(),
      [objectNumber]: {
        webImage, principalOrFirstMaker, longTitle, title, objectNumber,
      }
    };
  
    this.setFavourites(favourites);
  };
}

export const favouritesStorage = new FavouritesStorage();