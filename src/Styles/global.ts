import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html, body {
    width: 100%;
    height: 100%;
    font-family: 'Open Sans', sans-serif;
    /* overflow-x: clip; */
    a {
      text-decoration: none;      
    }
    h1, h2, h3 {
      text-decoration: none;
    }
    
    img {
      text-decoration: none;
    }
    
    
  }
  :root {
    --breakpoints-mobile: 320px;
    --breakpoints-tablet: 768px;
    --breakpoints-tablet-air: 820px;
    --breakpoints-computer: 992px;
    --breakpoints-desktop: 1200px;
    --breakpoints-widescreen: 1920px;
  }
`;
