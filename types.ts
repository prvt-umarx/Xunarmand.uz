
export enum UserRole {
  MIJOZ = 'MIJOZ',
  USTA = 'USTA'
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Ad {
  id: string;
  title: string;
  description: string;
  price?: string;
  category: string;
  status: 'active' | 'inactive';
  createdAt: string;
  images: string[];
}

export interface Master {
  id: string;
  name: string;
  profession: string;
  category: string;
  city: string;
  rating: number;
  reviewsCount: number;
  description: string;
  image: string;
  gallery: string[];
  phone: string;
  isTop?: boolean;
  experience?: string;
  location?: {
    lat: number;
    lng: number;
  };
  ads?: Ad[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}
