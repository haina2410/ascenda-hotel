import axios from "axios";

import type { HotelUnifiable, HotelUnifier } from "../unify";
import type { Hotel } from "../types";

export default abstract class BaseSupplier implements HotelUnifiable {
  protected origin: string;
  protected _name: string;

  constructor(origin: string) {
    this.origin = origin;
    this._name = this.origin.split("/").pop() || this.origin;
  }

  async fetch(): Promise<any[]> {
    const data = await axios.get(this.origin);
    return data.data;
  }

  get name(): string {
    return this._name;
  }

  abstract unify(u: HotelUnifier, data: any): Hotel;
}
