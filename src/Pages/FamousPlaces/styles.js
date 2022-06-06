import styled from "styled-components";
import { themeColors } from "../../Styles/colorTheme";
import { breakPoints } from "../../Utils/screenSizes";

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 80px;
  align-items: center;
  padding-bottom: 85px;
`;

export const Content = styled.div`
  max-width: 1180px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  line-height: 38px;
  letter-spacing: 0em;
  text-align: left;
  color: ${themeColors.primaryColors};
  margin-bottom: 70px;
  align-self: flex-start;

  @media only screen and (max-width: ${breakPoints.ipadAir}) {
    margin: 0 10% 10%;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 35px;
  justify-content: space-between;
  grid-row-gap: 38px;
  margin-bottom: 85px;
  width: 100%;

  @media only screen and (max-width: ${breakPoints.ipadAir}) {
    grid-template-columns: repeat(1, 1fr);
    padding: 0 10%;
  }
`;
