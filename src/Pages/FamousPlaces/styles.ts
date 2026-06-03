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

export const Filters = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
  margin-bottom: 50px;

  @media only screen and (max-width: ${breakPoints.ipadAir}) {
    padding: 0 10%;
    flex-direction: column;
    align-items: stretch;
  }
`;

export const StatusMessage = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 10% 40px;
  color: ${themeColors.primaryColors};
  font-size: 18px;
  text-align: center;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-column-gap: 35px;
  grid-row-gap: 38px;
  margin-bottom: 85px;
  width: 100%;

  @media only screen and (max-width: ${breakPoints.ipadAir}) {
    grid-template-columns: minmax(0, 1fr);
    padding: 0 10%;
  }

  @media only screen and (max-width: ${breakPoints.mobile}) {
    padding: 0;
  }
`;
