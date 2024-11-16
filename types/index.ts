export interface Hotel {
  id?: string;
  destination_id?: number;
  name?: string;
  location?: Location;
  description?: string;
  amenities?: Record<string, string[]>;
  images?: Record<string, Image[]>;
  booking_conditions?: string[];
}

export interface Image {
  link?: string;
  description?: string;
}

export interface Location {
  lat?: number;
  lng?: number;
  address?: string;
  city?: string;
  country?: string;
}

export const templateHotel: Hotel = {
  id: "",
  destination_id: 0,
  name: "",
  location: {
    lat: 0,
    lng: 0,
    address: "",
    city: "",
    country: "",
  },
  description: "",
  amenities: {},
  images: {},
  booking_conditions: [],
};
