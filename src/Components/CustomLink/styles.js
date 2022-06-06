import styled from "styled-components";
import { themeColors } from "../../Styles/colorTheme";

export const ContainerCustom = styled.div`
  .active {    
    text-decoration: underline ${themeColors.primaryColors} 3px;
    text-underline-offset: 11px;
  }
  @media (max-width: var(--breakpoints-tabletAir)) {
    background-color: #fff;
    padding: 10px 30px;
    .active {
      text-underline-offset: 3px;
    }
    @media (max-width: var(--breakpoints-mobile)) {
      padding: 10px 35px 10px 10px;
    }
  }
`;
