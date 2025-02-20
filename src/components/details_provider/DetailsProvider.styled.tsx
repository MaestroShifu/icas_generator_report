import { Card } from "@mui/material";
import styled from "styled-components";

const DetailsProviderStyled = styled(Card)`
    && {
        background-color: #1e1e1e;
        max-width: 800px;
        color: #9097a0;
    }

    .basic-info {
        display: flex;
        flex-direction: column;
        gap: 5px;

        margin-bottom: 15px;

        .basic-info-row {
            display: flex;
            justify-content: flex-start;

            .field {
                display: flex;
                flex: 1;
                
                .buttons {
                    margin-left: 60px;
                    
                    .button{
                        color: #f0f8ff;
                        margin-right: 2px;
                    }
                }
    
                .title {
                    color: #f0f8ff;
                    font-weight: bold;
                    margin-right: 5px;
                }
            }
        }
    }

    .container-actions {
        margin-top: 20px;
    }
    .noneData {
        background-color: #1e1e1e;
        color: #e6e6e6;
        text-align: center;
    }

    table {
        background-color: #1e1e1eed;
        
        th {
            color: #e6e6e6;
        }

        td {
            color: #f4f4f4;
        }
    }
`

export default DetailsProviderStyled


