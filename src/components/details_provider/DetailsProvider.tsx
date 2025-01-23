import { FC } from "react"
import DetailsProviderStyled from "./DetailsProvider.styled"
import { Provider, TripNormalize } from "../../types"
import { Button, CardContent, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { normalizeTrips, numberToFormatCOP } from "../../utils"
import { Print } from "@mui/icons-material"

type DetailsProviderProps = {
    provider: Provider
    handlePrintPDF: (dni: string) => void
}

const DetailsProvider: FC<DetailsProviderProps> = ({ provider, handlePrintPDF }) => {
    const tripsNomalize: TripNormalize = normalizeTrips(provider.trips)

    const rows = Object.values(tripsNomalize).map((trip, idx) => (
        <TableRow
            key={`${provider.name}_${idx}`}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                { idx + 1 }
            </TableCell>
            <TableCell align="right">{trip.origin}</TableCell>
            <TableCell align="right">{ numberToFormatCOP(trip.amount) }</TableCell>
            <TableCell align="right">{ numberToFormatCOP(trip.RETE_ICA) }</TableCell>
            <TableCell align="right">{ numberToFormatCOP(trip.RETE_FTE) }</TableCell>
        </TableRow>
    ))

    return (
        <DetailsProviderStyled>
            <CardContent>
                <div className="basic-info">
                    <div className="basic-info-row">
                        <div className="field">
                            <Typography variant="body1" className="title">
                                Nombre:
                            </Typography>
                            <Typography variant="body1">
                                { provider.name }
                            </Typography>   
                        </div>
                        <div className="field">
                            <Typography variant="body1" className="title">
                                Documento:
                            </Typography>
                            <Typography variant="body1">
                                { provider.dni }
                            </Typography>   
                        </div>
                    </div>

                    <div className="basic-info-row">
                        <div className="field">
                            <Typography variant="body1" className="title">
                                # Viajes:
                            </Typography>
                            <Typography variant="body1">
                                { provider.trips.length }
                            </Typography>   
                        </div>
                    </div>
                </div>

                <TableContainer component={Paper}>
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
                </TableContainer>

                <div className="container-actions">
                    <Button variant="outlined" startIcon={<Print />} onClick={() => { handlePrintPDF(provider.dni) }}>
                        Generate PDF
                    </Button>
                </div>
            </CardContent>
        </DetailsProviderStyled>
    )
}

export default DetailsProvider