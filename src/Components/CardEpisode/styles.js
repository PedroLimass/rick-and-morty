import styled from "styled-components";
import { themeColors } from "../../Styles/colorTheme";
import { breakPoints } from "../../Utils/screenSizes";

export const Container = styled.div`
  max-width: 682px;
  height: 150px;
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: ${breakPoints.mobile}) {
    max-width: 280px;
  }
`;

export const DataSide = styled.div`
  flex-grow: 1;
  padding: 10px 0 30px 23px;
  background-color: ${themeColors.secondaryBackground};
`;

export const ImgSide = styled.img`
  width: 176px;
  height: 150px;
  background-color: red;
`;

export const IdEps = styled.span`
  font-size: 24px;
  font-weight: 600;
  line-height: 33px;
  letter-spacing: 0em;
  text-align: left;
  color: ${themeColors.primaryColors};
`;

export const Title = styled.h3`
  font-size: 20px;
  font-weight: 600;
  line-height: 27px;
  letter-spacing: 0em;
  text-align: left;
  margin: 18px 0 13px;

  @media only screen and (max-width: ${breakPoints.ipadAir}) {
    white-space: nowrap;
    width: 110px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const EpsDate = styled.span`
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: left;
`;
