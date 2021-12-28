import { createGlobalStyle } from 'styled-components';
import styledReset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
    ${styledReset}

    * {
        box-sizing: border-box;
    }

    html, body {
        margin: 0;
        padding: 0;
    }
`;

export default GlobalStyles;
