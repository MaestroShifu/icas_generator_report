import { TripNormalize, Trips } from "./types";

export const numberToFormatCOP = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
}

export const fixingNumberParsing = (value: number) => {
  return isNaN(value) ? 0 : Number(value)
}

export const normalizeTrips = (trips: Array<Trips>): TripNormalize => {
  return trips.reduce<TripNormalize>((prev, curr) => {
    if (!prev[curr.origin]) {
        prev[curr.origin] = { ...curr }
    }
    prev[curr.origin].RETE_FTE += curr.RETE_FTE;
    prev[curr.origin].RETE_ICA += curr.RETE_ICA;
    prev[curr.origin].amount += curr.amount;
    return prev
  }, {})
}
