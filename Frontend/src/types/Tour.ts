export interface TourIncluded {
  title: string;
  description: string;
}

export interface TourExcluded {
  title: string;
  description: string;
}

export interface MeetingPoint {
  latitude: number;
  longitude: number;
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
  meeting_point: MeetingPoint;
}

export interface Tours {
  page: number;
  total: number;
  totalPages: number;
  data: Tour[];
}
