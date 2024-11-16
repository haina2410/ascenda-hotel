import type { Hotel, Image } from "../types";

export interface HotelUnifiable {
  unify(u: HotelUnifier, data: Record<string, any>): Hotel;
}

export class HotelUnifier {
  convertAcme(source: Record<string, any>): Hotel {
    const hotel: Hotel = {
      id: source.Id?.trim(),
      destination_id: source.DestinationId,
      name: source.Name,
      location: {
        lat: source.Latitude,
        lng: source.Longitude,
        address: source.Address?.trim(),
        city: source.City?.trim(),
        country: source.Country?.trim(),
      },
      description: source.Description?.trim(),
      amenities: {
        general: source.Facilities?.map((facility: string) =>
          facility.trim().toLowerCase()
        ),
      },
    };
    return hotel;
  }

  convertPatagonia(source: Record<string, any>): Hotel {
    const hotel: Hotel = {
      id: source.id?.trim(),
      destination_id: source.destination,
      name: source.name?.trim(),
      location: {
        lat: source.lat,
        lng: source.lng,
        address: source.address?.trim(),
      },
      description: source.info?.trim(),
      amenities: {
        general: source.amenities?.map((amenity: string) =>
          amenity.toLowerCase()
        ),
      },
      images: source.images
        ? Object.entries(source.images).reduce((acc, [key, value]) => {
            if (!Array.isArray(value)) return acc;

            acc[key] = value.map((img: any) => ({
              link: img.url?.trim(),
              description: img.description?.trim(),
            }));
            return acc;
          }, {} as Record<string, Image[]>)
        : undefined,
    };
    return hotel;
  }

  convertPaperfly(source: Record<string, any>): Hotel {
    const hotel: Hotel = {
      id: source.hotel_id?.trim(),
      destination_id: source.destination_id,
      name: source.hotel_name?.trim(),
      location: source.location,
      description: source.details?.trim(),
      amenities: source.amenities,
      images: source.images
        ? Object.entries(source.images).reduce((acc, [key, value]) => {
            if (!Array.isArray(value)) return acc;

            acc[key] = value.map((img: any) => ({
              link: img.link?.trim(),
              description: img.caption?.trim(),
            }));
            return acc;
          }, {} as Record<string, Image[]>)
        : undefined,
      booking_conditions: source.booking_conditions?.map((condition: string) =>
        condition.trim()
      ),
    };
    return hotel;
  }
}
