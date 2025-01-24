import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`    
    html, body, #root {
        line-height: 1.5;
        font-weight: 400;
        height: 100%;
        margin: 0;
        display: flex;
        flex-direction: column;
    }
`

export default GlobalStyle