import styled from "styled-components";
import { themeColors } from "../../Styles/colorTheme";
import { breakPoints } from "../../Utils/screenSizes";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 93px;
  background-color: ${themeColors.primaryBackground};
  justify-content: center;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  max-width: var(--breakpoints-desktop);
  max-width: 1180px;
  width: 80%;
  height: 100%;
  justify-content: space-between;

  .hamburger {
    display: none;
    color: white;
    font-size: 40px;
    z-index: 40;
  }

  @media only screen and (max-width: ${breakPoints.ipadAir}) {
    .hamburger {
      display: block;
      cursor: pointer;
      color: white;
    }
  }
`;

export const Logo = styled.div`
  z-index: 40;
  img {
    width: 194px;
    height: auto;
  }
`;

export const Menu = styled.nav`
  display: flex;
  min-width: 320px;
  gap: 75px;
  color: black;
  justify-content: space-between;
  z-index: 10;

  a {
    font-family: "Open Sans", sans-serif;
    color: ${themeColors.primaryColors};
    font-size: 18px;
    font-weight: 600;
    line-height: 24px;
  }

  @media only screen and (max-width: 920px) {
    gap: 34px;
  }

  @media only screen and (max-width: 820px) {
    position: absolute;
    top: 93px;
    gap: 40px;
    z-index: 10;
    flex-direction: column;
    background-color: ${themeColors.primaryBackground};
    padding: 2rem;
    left: 0;

    width: 100%;

    text-align: center;
    transition: 0.3s;

    top: ${({ showMenu }) => {
      return showMenu ? "90px" : "-100%";
    }};
  }
`;
