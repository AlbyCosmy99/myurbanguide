interface Tour {
  _id: string;
  title: string;
  price: number;
  featured_image: string;
  description: string;
  duration: string;
  gallery: string[];
  includes: string[];
  excludes: string[];
  meeting_point: {
    latitude: number;
    longitude: number;
  };
}

export default Tour;
