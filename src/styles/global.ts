import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body{
    background: ${(props) => props.theme["gray700"]};
    color:black;
    -webkit-font-smoothing: antialiased;
}
:focus{
outline: 0;
box-shadow: 0 0 0 1px ${(props) => props.theme["blue"]};
border: 0;
}
body, input, textarea, button{
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 0.875rem;
}

`;
