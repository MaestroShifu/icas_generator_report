import { ChangeEvent, useRef, useState } from 'react'
import ReactDOMServer from "react-dom/server";
import DetailsProvider from './components/details_provider/DetailsProvider';
import IcaCertificate from './components/convert_pdf/IcaCertificate';
import { Provider, ProvidersData } from './types';
import { loadExcelFile } from './services/ServiceProviders';
import { Autocomplete, Button, TextField, Typography } from '@mui/material';
import { Print, Upload } from '@mui/icons-material';
import { FileUpdateStyle, SelectProviderStyled } from './App.styled';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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

  const handleGenerateAllPdf = async () => {
    const keys = Object.keys(providersData);
    for (const key of keys) {
      await generatePDF(providersData[key]);
    }
  }

  const handlePrintPDFByDNI = async (dni: string) => {
    await generatePDF(providersData[dni])
    
  }

  const generatePDF = async (provider: Provider) => {
    // Renderiza el componente a un string de HTML usando ReactDOMServer
    const htmlString = ReactDOMServer.renderToStaticMarkup(
      <IcaCertificate provider={provider} />
    );

    // Crea un DOM virtual (documento temporal)
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString; // Inserta el HTML renderizado en el DOM temporal
    tempDiv.style.display = "flex"
    tempDiv.style.flexDirection = "column"
    tempDiv.style.padding = "20mm"


    tempDiv.style.width = "210mm"; // Tamaño A4
    tempDiv.style.minHeight = "297mm";

    tempDiv.style.backgroundColor = "#fff";
    
    tempDiv.style.position = "absolute";
    tempDiv.style.top = "-9999px"; // Mantenerlo fuera de la vista del usuario
    
    document.body.appendChild(tempDiv);

    try {
      // Captura el contenido del DOM virtual con html2canvas
      const canvas = await html2canvas(tempDiv, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      // Genera el PDF
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      const year = new Date().getFullYear() - 1;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${provider.name.toLowerCase().replace(/\s+/g, "_")}_certificado_ica_${year}.pdf`);
    } catch (error) {
      console.error("Error generando el PDF:", error);
    } finally {
      document.body.removeChild(tempDiv);
    }
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
