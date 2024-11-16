import type { Hotel } from "../types";
import type { HotelUnifier } from "../unify";
import BaseSupplier from "./base";

export default class PaperflySupplier extends BaseSupplier {
  constructor(origin?: string) {
    super(
      origin ||
        "https://5f2be0b4ffc88500167b85a0.mockapi.io/suppliers/paperflies"
    );
  }

  unify(u: HotelUnifier, data: Record<string, any>): Hotel {
    return u.convertPaperfly(data);
  }
}
