import { FC, useEffect, useState } from "react"
import DetailsProviderStyled from "./DetailsProvider.styled"
import { Provider } from "../../types"
import { Button, CardContent, Paper, TableContainer, Typography } from "@mui/material"
import { Print } from "@mui/icons-material"
import DetailsCertificate from "./Selection/DetailsCertificate"
import DetailsSettlement from "./Selection/DetailsSettlement"

type DetailsProviderProps = {
    provider: Provider
    handlePrintPDF: (dni: string) => void
    selectedOption: (Selection: string) => void
}


const DetailsProvider: FC<DetailsProviderProps> = ({ provider, handlePrintPDF, selectedOption}) => {

    const [selection, setSelection] = useState<string>("")

    useEffect(() => {
        selectedOption(selection);
    }, [selection, selectedOption])

    const RenderTable = () => {
        if (selection == "Certificado"){
            return <DetailsCertificate provider={provider}/>
        }
        if (selection == "Liquidaciones"){
            return<DetailsSettlement provider={provider}/>
        }
        else{
            return<Typography variant="body1" className="noneData">no se ha seleccionado el tipo de documento</Typography>
        }
    }

    

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
                            <Typography variant="body1" className="title">
                                Documento:
                            </Typography>
                            <Typography variant="body1">
                                { provider.dni }
                            </Typography>
                        </div>
                        <div className="field">
                            <div className="buttons">
                                <Button className="button" variant="outlined" value="Certificado" disabled={selection == "Certificado"} onClick={(event) => setSelection(event.currentTarget.value)}>Certificado ICA</Button>
                                <Button className="button" variant="outlined" value="Liquidaciones" disabled={selection == "Liquidaciones"} onClick={(event) => setSelection(event.currentTarget.value)}>Liquidaciones</Button>
                            </div>   
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
                    {RenderTable()}
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