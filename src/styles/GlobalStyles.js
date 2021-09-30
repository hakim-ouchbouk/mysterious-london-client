import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
   * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  /* font-size: 63.5%;/ */
}

body {
  /* font-family: 'Inter', Arial, Helvetica, sans-serif; */
  line-height: 1;
  font-weight: 400;
  color: #555;
  font-size: 18px;
  -webkit-user-select: none; /* Safari */
  -webkit-touch-callout: none; /* iOS Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -ms-user-select: none; /* Internet Explorer/Edge */
  -moz-user-select: none; /* Old versions of Firefox */
  user-select: none;
}
`;




export default GlobalStyles;
