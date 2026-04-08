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
  address?: string;
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
  additional_info?: {
    group_size?: string;
    [key: string]: any;
  };
  highlights?: string[];
}

export interface Tours {
  page: number;
  total: number;
  totalPages: number;
  data: Tour[];
}
