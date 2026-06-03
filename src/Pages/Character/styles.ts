import styled from "styled-components";
import { themeColors } from "../../Styles/colorTheme";
import { breakPoints } from "../../Utils/screenSizes";

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-top: 80px;
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  font-family: Open Sans;
  font-size: 28px;
  font-weight: 700;
  line-height: 38px;
  letter-spacing: 0em;
  text-align: center;
  color: ${themeColors.primaryColors};
`;

export const Filter = styled.div`
  width: 495px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 50px;

  @media only screen and (max-width: ${breakPoints.ipadAir}) {
    width: 238px;
  }
`;

export const BottomSide = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BottomAsset = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 160px;
  margin-bottom: 35px;
`;

export const ResultFilter = styled.div`
  width: 100%;
  min-height: 500px;
  margin-top: 75px;
  background-color: ${themeColors.primaryBackground};
  display: flex;
  justify-content: center;
  padding-bottom: 100px;
`;

export const TitleRes = styled.h3`
  font-size: 18px;
  font-weight: 400;
  text-align: left;
  color: ${themeColors.white};
  margin: 40px 0 20px;
`;

export const GridCard = styled.div`
  max-width: 1080px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 25px;
  grid-row-gap: 30px;

  @media only screen and (max-width: ${breakPoints.ipadAir}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (max-width: ${breakPoints.mobile}) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const ResultFilterBottom = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${themeColors.firstGrey};
`;

export const FilterContent = styled.div``;
export const BtnContent = styled.div`
  display: flex;
  padding: 45px 0px 0px;
  justify-content: center;
`;
