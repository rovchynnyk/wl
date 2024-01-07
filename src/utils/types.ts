export type ArtObjectT = {
  title: string,
  longTitle: string,
  objectNumber: string,
  principalOrFirstMaker: string,
  webImage: {
    url: string,
  }
}

export type GalleryStoreT = {
  count: number;
  artObjects: { [key: string]: ArtObjectT };
}
