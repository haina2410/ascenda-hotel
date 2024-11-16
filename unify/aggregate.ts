import { type Hotel } from "../types";

function deepMerge(target: any, source: any) {
  if (Array.isArray(target) && Array.isArray(source)) {
    // Merge arrays by concatenating and removing duplicates
    return Array.from(new Set([...target, ...source]));
  } else if (isObject(target) && isObject(source)) {
    // Merge objects recursively
    for (const key in source) {
      if (source[key] !== null && source[key] !== undefined) {
        if (key in target) {
          target[key] = deepMerge(target[key], source[key]);
        } else {
          target[key] = source[key];
        }
      }
    }
    return target;
  }
  // For primitive values, prioritize the source
  return source;
}

function isObject(obj: any) {
  return obj && typeof obj === "object" && !Array.isArray(obj);
}

export default function mergeData(hotels: Hotel[]) {
  const mergedObjects: Record<string, Hotel> = {};

  hotels.forEach((hotel) => {
    const { id } = hotel;
    if (!id) return;
    if (!mergedObjects[id]) {
      // Initialize the object if it doesn't exist
      mergedObjects[id] = { ...hotel };
    } else {
      // Deep merge objects
      mergedObjects[id] = deepMerge(mergedObjects[id], hotel);
    }
  });

  return Object.values(mergedObjects);
}
