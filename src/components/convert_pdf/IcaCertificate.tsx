import { FC } from 'react';
import { Provider, TripNormalize } from '../../types';
import IcaCertificateStyled from './IcaCertificate.styled';
import { Typography } from '@mui/material';

import logo from '../../assets/logo.png'
import { formatOriginText, normalizeTrips, numberToFormatCOP } from '../../utils';

type IcaCertificateProps = {
  provider: Provider
}

const ENTERPRISE_NAME = "Unitenses Transportando Soluciones SAS"
const ENTERPRISE_SHORT_NAME = "UNITRANSOLUCIONES"
const ENTERPRISE_DNI = "900.621.263-1"

const ENTERPRISE_EMAIL = "bcastaneda@unitransoluciones.com"
const ENTERPRISE_PHONE = "305 7 45 74 47"
const ENTERPRISE_ADDRESS = "Cra 57ª No. 5ª – 16"


const IcaCertificate: FC<IcaCertificateProps> = ({ provider }) =>  {
  const year = new Date().getFullYear() - 1;

  const tripsNomalize: TripNormalize = normalizeTrips(provider.trips)

  const rows = Object.values(tripsNomalize).map((trip, idx) => (
    <tr key={`${provider.name}_${idx}`}>
      <Typography variant="body1" component="th" scope="row">
        { idx + 1 }
      </Typography>
      <Typography variant="body1" component="td">
        { formatOriginText(trip.origin) }
      </Typography>
      <Typography variant="body1" component="td">
        { numberToFormatCOP(trip.amount) }
      </Typography>
      <Typography variant="body1" component="td">
        { numberToFormatCOP(trip.RETE_ICA) }
      </Typography>
      <Typography variant="body1" component="td">
        { numberToFormatCOP(trip.RETE_FTE) }
      </Typography>
    </tr>
  ))

  return (
    <IcaCertificateStyled>
      

      <div className='header-certificate'>
        <img src={logo} />

        <div className='certificate-titles'>
          <Typography variant="body1" component="div" className='text-bold'>
            { ENTERPRISE_NAME }
          </Typography>
          <Typography variant="body1" component="div" className='text-bold'>
            { ENTERPRISE_SHORT_NAME }
          </Typography>
          <Typography variant="body1" component="div">
            Nit. { ENTERPRISE_DNI }
          </Typography>
        </div>
      </div>

      <div className='title-certificate'>
        <Typography variant="body1" component="div">
          { ENTERPRISE_NAME.toUpperCase() }
        </Typography>
        <Typography variant="body1" component="p">
          Nit. { ENTERPRISE_DNI }
        </Typography>
      </div>

      <div className='content-certificate'>

        <Typography variant="body1" component="div">
          { `Certifica que durante el año gravable de ${year} se distribuyó a la compañía `} 
          <span className='text-bold'> {provider.name} </span> 
          { `por concepto de retención en la fuente a título de renta según art 102-2 del ET y que el valor retenido a título de Ica se distribuyó en la tesorería municipal de:`} 
        </Typography>

        <div className='certificate-table'>
          <Typography variant="body1" component="div" className='text-bold title-table'>
            { `DURANTE EL AÑO FISCAL ${year}` }
          </Typography>
          <table>
            <thead>
              <tr>
                <Typography variant="body1" component="th">#</Typography>
                <Typography variant="body1" component="th">ORIGEN SERVICIO PRESTADO</Typography>
                <Typography variant="body1" component="th">BASE</Typography>
                <Typography variant="body1" component="th">RETE ICA</Typography>
                <Typography variant="body1" component="th">RETE FUENTE</Typography>
              </tr>
            </thead>
            <tbody>
              { rows }
            </tbody>
          </table>
        </div>

        <Typography variant="body1" component="div">Que el valor retenido fué consignado oportunamente por el cliente en la TESORERIA MUNICIPAL de la ciudad de SANTAFE DE BOGOTA D.C.</Typography>
        
        <div className='art-certificate'>
          <Typography variant="body1" component="span">NO REQUIERE FIRMA AUTOGRAFA</Typography>
          <Typography variant="body1" component="span">SEGÚN DECRETO 836 DE 1991 ART 10</Typography>
        </div>
      </div>


      <div className='footer-certificate'>
        <Typography variant="body1" component="span">{ `Dirección ${ ENTERPRISE_ADDRESS } Celular ${ ENTERPRISE_PHONE }` }</Typography>
        <Typography variant="body1" component="span">{ `Correo ${ ENTERPRISE_EMAIL }` }</Typography>
      </div>
    </IcaCertificateStyled>
  )
}

export default IcaCertificate
