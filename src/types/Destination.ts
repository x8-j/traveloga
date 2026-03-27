export interface PreviewDestination {
  _id: string;
  title: string;
  location: string;
  image: string;
}

export interface Destionation extends PreviewDestination {
  description: string;
  limitedOffers: {
    domestic: number;
    international: number;
  };
}
