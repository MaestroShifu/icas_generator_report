import { TripNormalize, Trips } from "./types";

export const numberToFormatCOP = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
}


export const excelDateToJSDate = (dateValue: any) => {
  if (typeof dateValue === "number") {
    // Caso: Número serial de Excel
    const date = new Date((dateValue - 25569) * 86400 * 1000);
    const day = String(date.getDate()).padStart(2, ""); // Día con dos dígitos
    const month = String(date.getMonth() + 1).padStart(2, ""); // Mes (se suma 1 porque enero es 0)
    const year = date.getFullYear();

    return `${day}/${month}/${year}`; // Devuelve "DD/MM/YYYY"
  } 
  if (typeof dateValue === "string" || !isNaN(Date.parse(dateValue))) {
    // Caso: Ya es una fecha válida en formato string
    return dateValue// Devuelve en formato "DD/MM/YYYY"
}
  
};

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
        return prev
    }
    prev[curr.origin].RETE_FTE += curr.RETE_FTE;
    prev[curr.origin].RETE_ICA += curr.RETE_ICA;
    prev[curr.origin].amount += curr.amount;
    return prev
  }, {})
}
