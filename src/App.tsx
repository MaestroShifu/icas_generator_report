import ReactDOM from "react-dom";
import { ChangeEvent, useRef, useState } from 'react'
import DetailsProvider from './components/details_provider/DetailsProvider';
import { Provider, ProvidersData } from './types';
import { loadExcelFile } from './services/ServiceProviders';
import { Autocomplete, Button, TextField, Typography } from '@mui/material';
import { Print, Upload } from '@mui/icons-material';
import { FileUpdateStyle, SelectProviderStyled } from './App.styled';
import html2pdf from 'html2pdf.js';
import HtmlToPdf from "./convert_pdf/HtmlToPdf";

const App = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fileName, setFileName] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)
  const [providersData, setProvidersData] = useState<ProvidersData>({})

  const [dataDNISelected, setDataDNISelected] = useState<Array<string>>([])
   
  const changeStatusLoading = () => {
    setIsLoading(!isLoading)
  }

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {      
      try {
        const file = event.target.files[0];
        if (!file || !(file instanceof File)) {
          throw new Error("No se subio un archivo valido");
        }
        setFileName(file.name)
        changeStatusLoading()
        const data = await loadExcelFile(file)
        setProvidersData(data)
      } catch (error) {
        alert((error as Error).message)
      } finally {
        changeStatusLoading()
      }
    }
  }

  const handleUploadCSV = () => {
    fileInputRef.current?.click();
  }

  const handleSelectProvider = (_event: ChangeEvent<{}>, value: Array<Provider>) => {
    const selections = value.map(prov => prov.dni)
    setDataDNISelected([...selections])
  };

  const handleGenerateAllPdf = () => {
    Object.values(providersData).forEach(prov => {
      generatePDF(prov)
    })
  }

  const handlePrintPDFByDNI = (dni: string) => {
    generatePDF(providersData[dni])
  }

  const generatePDF = (provider: Provider) => {
    const container = document.createElement('div');
    container.style.display = 'none'; // Ocultar el contenedor para que no afecte la interfaz
    document.body.appendChild(container);

    const element = (<HtmlToPdf provider={provider}/>);

    ReactDOM.render(element, container, () => {
      // Callback ejecutado cuando el componente se ha renderizado
      const content = document.getElementById(`content-to-pdf`);
      if (content) {
        html2pdf().from(content).save(`newDocument.pdf`);
      }
      document.body.removeChild(container); // Limpiar el DOM
    });
    console.log(`Esta imprimiendo ${provider.name}`)
  }

  const providerSelected = dataDNISelected.map(dni => (<DetailsProvider key={dni} handlePrintPDF={handlePrintPDFByDNI} provider={providersData[dni]} />))

  return (
    <>
      <FileUpdateStyle>
        <Typography variant="body1" className='title'>
          { !!fileName ? `Archivo cargado: ${fileName}` : 'Cargar Archivo:'}
        </Typography>

        <Button variant="outlined" disabled={isLoading || !!fileName} startIcon={<Upload />} onClick={handleUploadCSV}>
          Upload .CSV
        </Button>
        
        <input
          ref={fileInputRef}
          type="file"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        <Button variant="outlined" disabled={Object.values(providersData).length === 0} startIcon={<Print />} onClick={handleGenerateAllPdf}>
          Generate All PDF
        </Button>
      </FileUpdateStyle>

      <SelectProviderStyled>
        <Autocomplete
          multiple
          id="tags-readOnly"
          options={Object.values(providersData)}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.dni === value.dni}
          onChange={handleSelectProvider}
          renderInput={(params) => (
            <TextField {...params} label="Nombre de proveedores" placeholder="Proveedores" />
          )}
        />
        <div className='selected-container'>
          { providerSelected }
        </div>
      </SelectProviderStyled>
    </>
  )
}

export default App
