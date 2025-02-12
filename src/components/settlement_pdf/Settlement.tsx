import { FC } from 'react';
import { Typography } from '@mui/material';
import { Provider, TripNormalize} from '../../types';
import logo from '../../assets/logo.png'
import SettlementStyled from './Settlement.styled';
import { excelDateToJSDate, formatOriginText, normalizeTrips, numberToFormatCOP } from '../../utils';

type SettlementProps = {
    provider: Provider
}

const ENTERPRISE_NAME = "Unitenses Transportando Soluciones SAS"
const ENTERPRISE_SHORT_NAME = "UNITRANSOLUCIONES"
const ENTERPRISE_DNI = "900.621.263-1"
const ENTERPRISE_EMAIL = "bcastaneda@unitransoluciones.com"
const ENTERPRISE_PHONE = "305 7 45 74 47"
const ENTERPRISE_ADDRESS = "Cra 57ª No. 5ª – 16" 



const Settlement: FC<SettlementProps> = ({ provider }) => {

    
    const tripsNomalize: TripNormalize = normalizeTrips(provider.trips)

    return(
    <SettlementStyled>
      {Object.values(tripsNomalize).map((trip, idx) => (
      <div key={`${provider.name}_${idx}`} id={`trip_${idx}`} className='settlement-container'>
        <div className="header-settlement">
          <img src={logo} />
          <div className="settlement-titles">
            <Typography variant="body1" component="div" className="text-bold">
              {ENTERPRISE_NAME}
            </Typography>
            <Typography variant="body1" component="div" className="text-bold">
              {ENTERPRISE_SHORT_NAME}
            </Typography>
            <Typography variant="body1" component="div">
              Nit. {ENTERPRISE_DNI}
            </Typography>
          </div>
        </div>

        {/* TABLA INDIVIDUAL PARA CADA VIAJE */}
        <table className="table">
          <Typography variant="body1" component="caption">
            LIQUIDADOR DE DESPACHOS
          </Typography>
          <thead>
            <tr>
              <Typography variant="body1" component="th">
                FECHA
              </Typography>
              <Typography variant="body1" component="th">
                PLACA
              </Typography>
              <Typography variant="body1" component="th">
                REMESA
              </Typography>
              <Typography variant="body1" component="th">
                ORIGEN
              </Typography>
              <Typography variant="body1" component="th">
                DESTINO
              </Typography>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Typography variant="body1" component="td">
                {excelDateToJSDate(trip.date)}
              </Typography>
              <Typography variant="body1" component="td">
                {trip.license_plate}
              </Typography>
              <Typography variant="body1" component="td">
                {trip.remittance}
              </Typography>
              <Typography variant="body1" component="td">
                {formatOriginText(trip.origin)}
              </Typography>
              <Typography variant="body1" component="td">
                {formatOriginText(trip.destiny)}
              </Typography>
            </tr>
            <tr>
            <Typography variant="body1" component="th">
                CONDUCTOR
              </Typography>
              <Typography variant="body1" component="td">
                {formatOriginText(trip.driver)}
              </Typography>
              <Typography variant="body1" component="th">
                PROPIETARIO
              </Typography>
              <Typography variant="body1" component="td" colSpan={2}>
                {formatOriginText(trip.owner)}
              </Typography>
              <td id='celdaVacia'>

              </td>
            </tr>
          </tbody>
        </table>

        {/* TABLA DETALLE DEL VIAJE */}
        <div className="secondTable">
          <table>
            <Typography variant="body1" component="caption">
              RELACION A DETALLAR
            </Typography>
            <tbody>
              <tr>
                <Typography variant="body1" component="th">
                  VALOR FLETE
                </Typography>
                <Typography variant="body1" component="td">
                  {numberToFormatCOP(trip.amount)}
                </Typography>
              </tr>
              <tr>
                <Typography variant="body1" component="th">
                  STANDBY
                </Typography>
                <Typography variant="body1" component="td">
                  {numberToFormatCOP(trip.STAND_BY)}
                </Typography>
              </tr>
              <tr>
                <Typography variant="body1" component="th">
                  DTO DESCARGUE
                </Typography>
                <Typography variant="body1" component="td">
                  {numberToFormatCOP(0)}
                </Typography>
              </tr>
              <tr>
                <Typography variant="body1" component="th">
                  ANTICIPO
                </Typography>
                <Typography variant="body1" component="td">
                  {numberToFormatCOP(trip.advance)}
                </Typography>
              </tr>
              <tr>
                <Typography variant="body1" component="th">
                  CXP
                </Typography>
                <Typography variant="body1" component="td">
                  {numberToFormatCOP(trip.CXP)}
                </Typography>
              </tr>
            </tbody>
          </table>
          <table>
            <Typography variant='body1' component="caption">DESCUENTO DE LEY</Typography>
            <thead>
              <tr>
                <Typography variant="body1" component="th">RTE FTE</Typography>
                <Typography variant="body1" component="th">RTE ICA</Typography>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Typography variant="body1" component="td">
                  { numberToFormatCOP(trip.RETE_FTE) }
                </Typography>
                <Typography variant="body1" component="td">
                  { numberToFormatCOP(trip.RETE_ICA) }
                </Typography>
              </tr>
              <tr key={`${provider.name}_${idx}`}> 
                <Typography variant="body1" component="th">
                  { formatOriginText("FECHA DE PAGO") }
                </Typography>
                <Typography variant="body1" component="td">
                  { excelDateToJSDate(trip.payment_date) }
                </Typography>
              </tr>
              <tr key={`${provider.name}_${idx}`}> 
                <Typography variant="body1" component="th">
                  { formatOriginText("CUMPLIDO") }
                </Typography>
                <Typography variant="body1" component="td">
                  12345
                </Typography>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='art-settlement'>
                <Typography variant="body1" component="span">NO REQUIERE FIRMA AUTOGRAFA</Typography>
                <Typography variant="body1" component="span">SEGÚN DECRETO 836 DE 1991 ART 10</Typography>
        </div>

        <div className="footer-settlement">
          <Typography variant="body1" component="span">
            {`Dirección ${ENTERPRISE_ADDRESS} Celular ${ENTERPRISE_PHONE}`}
          </Typography>
          <Typography variant="body1" component="span">
            {`Correo ${ENTERPRISE_EMAIL}`}
          </Typography>
        </div>
        
        
      </div>
    ))}
    </SettlementStyled>
    )

}

export default Settlement


