import { TripNormalize, Trips } from "./types";

export const numberToFormatCOP = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
}

export const formatOriginText = (text: string) => {
  return text
    .toLowerCase() // Convierte todo el texto a minúsculas
    .replace(/_/g, " ") // Reemplaza los guiones bajos por espacios
    .split(" ") // Divide el texto en palabras
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitaliza la primera letra de cada palabra
    .join(" "); // Une las palabras con espacios
};

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
