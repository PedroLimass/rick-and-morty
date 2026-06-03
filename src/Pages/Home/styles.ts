import styled from "styled-components";
import { themeColors } from "../../Styles/colorTheme";
import { breakPoints } from "../../Utils/screenSizes";

export const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 75px;
  padding-bottom: 115px;
  gap: 50px;

  .btnHome {
    color: white;
    font-size: 24px;
    font-weight: 600;
    line-height: 33px;
    letter-spacing: 0em;
    text-align: center;
    background-color: ${themeColors.primaryColors};
    padding: 20px 60px;
    border-radius: 20px;
  }

  @media only screen and (max-width: ${breakPoints.mobile}) {
    .homeAsset {
      width: 100%;
      height: auto;
    }
  }
`;

export const Title = styled.h1`
  max-width: 555px;
  font-size: 28px;
  font-weight: 700;
  line-height: 38px;
  text-align: center;

  color: ${themeColors.primaryColors};

  @media only screen and (max-width: ${breakPoints.mobile}) {
    font-size: 24px;
    line-height: 28px;
  }
`;
