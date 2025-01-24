import styled from 'styled-components';
/* import Icono from './assets/UNITRANSOLUCIONES_v2.png' */
import { TripNormalize } from '../types';
import { normalizeTrips } from '../utils';
import { numberToFormatCOP } from '../utils';  
import { TableRow, TableCell } from '@mui/material';

function HtmlToPdf({ provider }) {

  const Contenido = styled.div`
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    display: grid;
    place-items: center; /* Centra horizontal y verticalmente */
    height: 100vh; /* Toda la altura de la ventana */
    margin: 0;
  `;
  const Header = styled.div`
    display: flex;
    justify-content: space-between;
    margin-right: 160px;
  `;
  const Img =styled.img`
    width: 110px;
    margin-right: 30px;
  `;
  const Titulo = styled.div`
    margin: 0;
    padding: 0;
  `
  const TextoTitulo = styled.li`
    list-style-type: none;
    font-size: 17px;
    text-align: center;
  `
  const Subtitulo = styled.ul`
    margin-right: 20px
  `
  const TextoSubtitulo = styled.li`
    list-style-type: none;
    font-size: 20px;
    text-align: center;
  `
  const TextoPrincipal = styled.p`
    margin: 0 20px 0 20px;
    font-size: 18px;
  `
  const Tabla = styled.table`
    border-collapse: collapse;
    text-align: center;
    margin: 0 20px 0 20px
  `
  const TituloTabla = styled.caption`
    font-weight: bold;
    background-color: #0b3040;
    color: white; 
    border: 1px solid black;
    padding: 2px;
  `
  const TablaEncabezado = styled.th`
    background-color: #0b3040;
    color: white;
    border: 1px solid black;
    padding: 10px;
  `

  const SubTexto = styled.p`
    margin: 0 20px 0 20px;
    font-size: 18px;
    margin-Bottom: 40px
  `
  const TextoFinal = styled.p`
    font-size: 18px;
  `
  

  /* const handleDownloadPdf = () => {
    const element = document.getElementById('content-to-pdf');
    
    if (element) {
      const opt = {
        margin:       1,
        filename:     'documento.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 }, // Controlar la calidad de la imagen
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      // Usamos html2pdf.js para generar y descargar el PDF
      html2pdf().from(element).set(opt).save();
    }
  }; */

  const TripNormalize: TripNormalize = normalizeTrips(provider.trips)
  const rows = Object.values(TripNormalize).map((trip, idx) => (
    <TableRow
        key={`${provider.name}_${idx}`}
        sx={{ border: 1,
          padding: 10,
          textAlign: 'center'}}
    >
        <TableCell component="th" scope="row">
            { idx + 1 }
        </TableCell>
        <TableCell sx={{border:1}} align="right">{trip.origin}</TableCell>
        <TableCell sx={{border:1}} align="right">{ numberToFormatCOP(trip.amount) }</TableCell>
        <TableCell sx={{border:1}} align="right">{ numberToFormatCOP(trip.RETE_ICA) }</TableCell>
        <TableCell sx={{border:1}} align="right">{ numberToFormatCOP(trip.RETE_FTE) }</TableCell>
    </TableRow>
))
  
  
  return (
    <>
    <Contenido id='content-to-pdf'>
    <Header>
      <Img src="" alt="imagen" />
      <Titulo>
        <ul>
          <strong><TextoTitulo>unitenses transportando soluciones SAS</TextoTitulo></strong>
          <strong><TextoTitulo>unitransoluciones</TextoTitulo></strong>
          <TextoTitulo>Nit. 900.562.635</TextoTitulo>
        </ul>
      </Titulo>
    </Header>

    <Subtitulo>
      <TextoSubtitulo>unitransoluciones transportando soluciones SAS</TextoSubtitulo>
      <TextoSubtitulo>Nit. 900.562.635</TextoSubtitulo>
    </Subtitulo>

    

    <TextoPrincipal>Certifica que durante el año gravable de 2024 se distribuyó a la compañía 
        SAS por concepto de retención en la fuente a título de renta según art 
      102-2 del ET  y que el valor retenido a título de Ica se distribuyó en la tesorería 
      municipal de: </TextoPrincipal>

    <Tabla>
      <TituloTabla>durante el año fiscal "año"</TituloTabla>
      <thead>
        <tr>
          <TablaEncabezado>#</TablaEncabezado>
          <TablaEncabezado>ORIGEN SERVICIO PRESTADO</TablaEncabezado>
          <TablaEncabezado>BASE</TablaEncabezado>
          <TablaEncabezado>RETE ICA</TablaEncabezado>
          <TablaEncabezado>RETE FUENTE</TablaEncabezado>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </Tabla>

    <SubTexto>Que el valor retenido fué consignado oportunamente por el cliente en la 
      TESORERIA MUNICIPAL de la ciudad de SANTAFE DE BOGOTA D.C. </SubTexto>

    <TextoFinal>NO REQUIERE FIRMA AUTOGRAFA 

    SEGÚN DECRETO 836 DE 1991 ART 10 </TextoFinal>

    </Contenido>
  </> 
  );
}

export default HtmlToPdf
