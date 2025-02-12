import styled from "styled-components";

const Settlement = styled.div`
    .settlement-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 100%;
        padding: 40px;


        .text-bold {
        font-weight: bold;
    }

    .header-settlement {
        display: flex;
        justify-content: center;
        gap: 20px;
        align-items: center;

        img {
            width: 90px;
        }

        .settlement-titles {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }
    .table{
        margin-top: 100px
    }
    table{
        border-collapse: collapse;
        border: 1px solid black;
        text-align: center;
        width: 100%;

        caption{
            border: 1px solid black;
            background-color: #0e2841;
            color: white;
        }
        
        th{
            background-color: #adadad;
            color: white;
            max-width: 50px;
        }
        td{
        max-width: 50px;
        }
        #celdaVacia{
        display: none;
        }
        th,
        td{
            border: 1px solid black; 
            padding: 3px
        }
    }
    .secondTable{
        display: flex;
        margin-top: 82px;
        width: 100%;
    }


    .art-settlement {
            margin-top: 100px;
            text-align: center;
            display: flex;
            flex-direction: column;
        }

    .footer-settlement {
        margin-top: 90px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    }

    

`
export default Settlement