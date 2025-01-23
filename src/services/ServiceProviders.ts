import { ProvidersData } from "../types"
import { fixingNumberParsing } from "../utils"
import * as XLSX from 'xlsx';

// TODO: Proponer cambios de nombre. (ESPACIOS CON _) y limpieza de espacio en los nombre
// ORIGEN
// PROPIETARIO
// DOCUMENTO_1 -> DOCUMENTO_PROP
// RETE FTE -> RETE_FTE
// RETE ICA -> RETE_ICA

// Hay un error en el excel si utilizo la cedula 24197992 de ANA ROMERO PEREZ
// Filtro con cedula hay 14
// Filtro por nombre hay 13

// Constants names
const ORIGEN = "ORIGEN"
const PROPIETARIO = "PROPIETARIO"
const DOCUMENTO_PROP = "DOCUMENTO_PROP"
const RETE_FTE = "RETE_FTE"
const RETE_ICA = "RETE_ICA"
const VALOR_FLETE = "VALOR_FLETE"

const SHEET_TITLE: Array<string> = [ORIGEN, PROPIETARIO, DOCUMENTO_PROP, RETE_FTE, RETE_ICA, VALOR_FLETE]

const validateMissingKeys = (keys: Array<string>): Array<string> => {
  const isValidKeys: Record<string, boolean> = SHEET_TITLE.reduce((prev, curr) => {
    return {
      ...prev,
      [curr]: false
    }
  }, {})

  keys.forEach(value => {
    if (!(value in isValidKeys)) {
      return
    }
    isValidKeys[value] = true
  })

  return SHEET_TITLE.filter(key => !isValidKeys[key])
}

const sheetDataParseToGeneralData = (sheetData: unknown[]): ProvidersData => {
  const generalData: ProvidersData = {}
  sheetData.forEach((data: any) => {
    const dni = String(data[DOCUMENTO_PROP]).replace(/\s+/g, "")

    if (!generalData[dni]) {
      generalData[dni] = {
        dni,
        name: String(data[PROPIETARIO]).trim(),
        trips: []
      }
    }
      
    generalData[dni].trips.push({ 
      origin: String(data[ORIGEN]).trim().replace(/\s+/g, "_"), 
      RETE_FTE: fixingNumberParsing(data[RETE_FTE]), 
      RETE_ICA: fixingNumberParsing(data[RETE_ICA]),
      amount: fixingNumberParsing(data[VALOR_FLETE])
    })
  }) 
  return generalData
}

export const loadExcelFile = async (file: File): Promise<ProvidersData> => {
  try {
    const binaryString = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent<FileReader>) => {
        const result = event.target?.result;
        if (result) {
          resolve(result as string);
        } else {
          reject(new Error("No se pudo leer el archivo."));
        }
      };

      reader.onerror = () => reject(new Error("Error al leer el archivo."));
      reader.readAsArrayBuffer(file);
    });

    const workbook = XLSX.read(binaryString, { type: 'binary' });

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const sheetData = XLSX.utils.sheet_to_json(sheet, { raw: true }).map((row: any) => {
      const cleanedRow: any = {};
      for (const key in row) {
        const trimmedKey = key.trim();
        cleanedRow[trimmedKey] = row[key];
      }
      return cleanedRow;
    });

    const keys = Object.keys(sheetData[0] as any).map((key) => key.trim());
    const missingKeys = validateMissingKeys(keys);

    if (missingKeys.length > 0) {
      throw new Error(`Hace falta estas keys [${missingKeys.join(", ")}] en el excel`);
    }

    return sheetDataParseToGeneralData(sheetData);
  } catch (error) {
    throw error
  }
};
