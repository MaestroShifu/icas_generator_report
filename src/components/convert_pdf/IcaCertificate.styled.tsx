import styled from "styled-components";

const IcaCertificate = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    height: 100%;
    /* padding: 10mm 0px; */

    .text-bold {
        font-weight: bold;
    }

    .header-certificate {
        display: flex;
        justify-content: center;
        gap: 20px;
        align-items: center;

        img {
            width: 90px;
        }

        .certificate-titles {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }

    .title-certificate {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .content-certificate {
        /* padding: 0px 10mm; */
        display: flex;
        flex-direction: column;
        gap: 20px;

          
        .certificate-table {
            
            .title-table { 
                background-color: #0b3040;
                color: white;
                padding: 8px;
                text-align: center;
            }
            
            table {
                width: 100%;
                border-collapse: collapse;
                text-align: center;
            }
    
            thead {
                background-color: #0b3040;
                color: white; 
            }
    
            th,
            td {
                border: 1px solid black; /* Bordes para cada celda */
                padding: 8px; /* Espaciado dentro de las celdas */
            }
    
            th {
                font-weight: bold; /* Negrita en los encabezados */
            }
        }

        .art-certificate {
            margin-top: 100px;
            display: flex;
            flex-direction: column;
        }
    }


    .footer-certificate {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

`

export default IcaCertificate