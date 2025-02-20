import { FC } from 'react';
import { Provider } from '../../../types';
import { excelDateToJSDate, formatOriginText, numberToFormatCOP } from '../../../utils';
import { TableRow, TableCell, Table, TableHead, TableBody, Button } from "@mui/material"
import VisibilityIcon from '@mui/icons-material/Visibility';

type SettlementProps = {
    provider: Provider
}



const DetailsSettlement: FC<SettlementProps> = ({ provider }) => {

    const rows = Object.values(provider.trips).map((trip, idx) => (
        <TableRow
            key={`${provider.name}_${idx}`}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                { idx + 1 }
            </TableCell>
            <TableCell align="right">{ formatOriginText(trip.driver) }</TableCell>
            <TableCell align="right">{ trip.remittance }</TableCell>
            <TableCell align="right">{ numberToFormatCOP(trip.amount) }</TableCell>
            <TableCell align="right">{ numberToFormatCOP(trip.RETE_ICA) }</TableCell>
            <TableCell align="right">{ numberToFormatCOP(trip.RETE_FTE) }</TableCell>
            <TableCell align="right">{ numberToFormatCOP(trip.CXP) }</TableCell>
            <TableCell align="right">{ excelDateToJSDate(trip.payment_date) }</TableCell>
            {/* <Button variant='outlined'  startIcon={<VisibilityIcon/>}></Button> */}
        </TableRow>
    ))

    return (
    <Table>
        <TableHead>
            <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="right">Conductor</TableCell>
                <TableCell align="right">Remesa</TableCell>
                <TableCell align="right">Base</TableCell>
                <TableCell align="right">Rete ICA</TableCell>
                <TableCell align="right">Rete Fuente</TableCell>
                <TableCell align="right">CXP</TableCell>
                <TableCell align="right">fecha de pago</TableCell>
            </TableRow>
        </TableHead>

        <TableBody>
            { rows }
        </TableBody>
    </Table>
    )
}

export default DetailsSettlement