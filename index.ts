import AcmeSupplier from "./suppliers/acme";
import PaperflySupplier from "./suppliers/paperfly";
import PatagoniaSupplier from "./suppliers/patagonia";
import { HotelUnifier } from "./unify";
import mergeData from "./unify/aggregate";

import type BaseSupplier from "./suppliers/base";
import type { Hotel } from "./types";

import fs from "fs";
async function main() {
  // Initialize the unifier and data sources
  const unifier = new HotelUnifier();

  const Acme = new AcmeSupplier();
  const Paperfly = new PaperflySupplier();
  const Patagonia = new PatagoniaSupplier();

  const sources: BaseSupplier[] = [Acme, Paperfly, Patagonia];

  // Fetch and unify data from all sources to Hotel objects
  const hotels = (
    await Promise.all(
      sources.map(async (s) => {
        try {
          const rawHotels = await s.fetch();
          const hotels = rawHotels.map((rawHotel) => {
            try {
              return s.unify(unifier, rawHotel);
            } catch (e) {
              console.error(
                `Failed to unify data from ${s.origin.split("/")[-1]}`,
                e,
              );
              return null;
            }
          });
          return hotels;
        } catch (e) {
          console.error(`Failed to fetch from ${s.origin.split("/")[-1]}`, e);
          return null;
        }
      }),
    )
  )
    .flat()
    .filter((hotel) => hotel !== null) as Hotel[];

  const mergedHotels = mergeData(hotels);
  fs.writeFileSync("all.json", JSON.stringify(mergedHotels, null, 2));

  // get hotel id and destination id from arguments
  const rawHotelIds = process.argv[2];
  const rawDestinationIds = process.argv[3];

  const hotelIds = rawHotelIds !== "none" ? rawHotelIds.split(" ") : [];
  const destinationIds =
    rawDestinationIds && rawDestinationIds !== "none"
      ? rawDestinationIds.split(" ")
      : [];

  // filter hotels based on arguments
  const filteredHotels = mergedHotels.filter((hotel) => {
    if (hotelIds.length > 0 && hotel.id && hotelIds.includes(hotel.id)) {
      return true;
    }
    return false;
  });

  // write to file
  fs.writeFileSync("output.json", JSON.stringify(filteredHotels, null, 2));
  console.log(JSON.stringify(filteredHotels, null, 2));
}

main();
