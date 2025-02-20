import { FC } from "react"
import { TripNormalize, Provider } from "../../../types"
import { normalizeTrips, formatOriginText, numberToFormatCOP } from "../../../utils"
import { TableRow, TableCell, Table, TableHead, TableBody } from "@mui/material"


type DetailsProviderProps = {
    provider: Provider
}

const DetailsCertificate: FC<DetailsProviderProps> = ({ provider }) => {

    
    const tripsNomalize: TripNormalize = normalizeTrips(provider.trips)
    const rows = Object.values(tripsNomalize).map((trip, idx) => (
        <TableRow
            key={`${provider.name}_${idx}`}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                { idx + 1 }
            </TableCell>
            <TableCell align="right">{ formatOriginText(trip.origin) }</TableCell>
            <TableCell align="right">{ numberToFormatCOP(trip.amount) }</TableCell>
            <TableCell align="right">{ numberToFormatCOP(trip.RETE_ICA) }</TableCell>
            <TableCell align="right">{ numberToFormatCOP(trip.RETE_FTE) }</TableCell>
        </TableRow>
    ))

    return(
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell align="right">Origen</TableCell>
                    <TableCell align="right">Base</TableCell>
                    <TableCell align="right">Rete ICA</TableCell>
                    <TableCell align="right">Rete Fuente</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                { rows }
            </TableBody>
        </Table>
    )
}

export default DetailsCertificate