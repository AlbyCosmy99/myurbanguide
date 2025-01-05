export interface TourIncluded {
  title: string;
}

export interface TourExcluded {
  title: string;
}

export interface Tour {
  _id: string;
  title: string;
  price: number;
  featured_image: string;
  description: string;
  duration: string;
  gallery: string[];
  includes: TourIncluded[];
  excludes: TourExcluded[];
  meeting_point: {
    latitude: number;
    longitude: number;
  };
}