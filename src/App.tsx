import { FormEvent, useState } from 'react'
import * as XLSX from 'xlsx';

import './App.css'

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
const SHEET_NAME = "UNIFICADO" // Nombre del libro

const ORIGEN = "ORIGEN"
const PROPIETARIO = "PROPIETARIO"
const DOCUMENTO_PROP = "DOCUMENTO_PROP"
const RETE_FTE = "RETE_FTE"
const RETE_ICA = "RETE_ICA"

const SHEET_TITLE: Array<string> = [ORIGEN, PROPIETARIO, DOCUMENTO_PROP, RETE_FTE, RETE_ICA]

type GeneralData = Record<string, Owner>

type Owner = {
  name: string
  dni: string
  trips: Trips[]
}

type Trips = {
  origin: string
  RETE_FTE: number
  RETE_ICA: number
}

const App = () => {
  const [isLoading, getIsLoading] = useState(false)
  const [generalData, setGeneralData] = useState<GeneralData>({})

  const changeStatusLoading = () => {
    getIsLoading(!isLoading)
  }

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

  const sheetDataParseToGeneralData = (sheetData: unknown[]): GeneralData => {
    const generalData: GeneralData = {}
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
        RETE_FTE: Number(data[RETE_FTE]), 
        RETE_ICA: Number(data[RETE_ICA])
      })
    }) 
    return generalData
  }

  const loadExcelFile = async (file: File) => {
    changeStatusLoading()
    setGeneralData({})

    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const binaryString = event.target?.result

      const workbook = XLSX.read(binaryString, { type: 'binary' });
      const isValid = workbook.SheetNames.findIndex((value: string) => value === SHEET_NAME) !== -1
      if (!isValid) {
        changeStatusLoading()
        const err = `El libro ${SHEET_NAME} no existe dentro del excel`
        alert(err)
        console.error(err)
        return
      }

      const sheet = workbook.Sheets[SHEET_NAME];      
      const sheetData = XLSX.utils.sheet_to_json(sheet);
      
      const keys = Object.keys(sheetData[0] as any)
      const misssingKeys = validateMissingKeys(keys)

      if (misssingKeys.length > 0) {
        changeStatusLoading()
        const err = `Hace falta estas keys [${misssingKeys.join(", ")}] en el excel`
        alert(err)
        console.error(err)
        return
      }

      const generalData = sheetDataParseToGeneralData(sheetData)
      setGeneralData(generalData)
      changeStatusLoading()
    };

    reader.readAsArrayBuffer(file)
  } 

  const submitFile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault() // Evita recarga de la pagina
    const formData = new FormData(event.currentTarget)
    const file = formData.get('file')
    if (!file || !(file instanceof File)) {
      console.error("No se subio un archivo valido")
      return
    }
    await loadExcelFile(file)
  }

  if (Object.values(generalData).length > 0) {
    console.log(generalData)
  }

  return (
    <>
      <form onSubmit={submitFile}>
        <input name="file" type="file" accept=".xlsx, .xls" />
        <button type="submit" disabled={isLoading}>Hacer Magia</button>
      </form>
    </>
  )
}

export default App
