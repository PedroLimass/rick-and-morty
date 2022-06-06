import styled from "styled-components";
import { themeColors } from "../../Styles/colorTheme";
import { breakPoints } from "../../Utils/screenSizes";

export const Container = styled.div`
  min-width: 502px;
  width: 100%;
  height: 150px;
  background-color: ${themeColors.secondaryBackground};
  box-shadow: 0px 4px 16px 0px #011c4033;
  display: flex;

  @media only screen and (max-width: ${breakPoints.ipadAir}) {
    min-width: 380px;
  }

  @media only screen and (max-width: ${breakPoints.mobile}) {
    min-width: 280px;
  }
`;

export const DataSide = styled.div`
  flex-grow: 1;
  padding: 32px 0px 54px 23px;

  @media only screen and (max-width: ${breakPoints.mobile}) {
    padding: 5px 5px 10px 10px;
  }
`;

export const ImgSide = styled.img`
  max-width: 176px;
  max-height: 150px;
  background-color: ${themeColors.primaryBackground};
`;

export const Title = styled.h3`
  font-size: 24px;
  font-weight: 600;
  line-height: 33px;
  text-align: left;
  margin-bottom: 6px;

  @media only screen and (max-width: ${breakPoints.mobile}) {
    white-space: nowrap;
    width: 138px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const SubTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
  letter-spacing: 0em;
  text-align: left;

  @media only screen and (max-width: ${breakPoints.mobile}) {
    /* white-space: nowrap; */
    width: 138px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
