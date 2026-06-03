import styled from "styled-components";
import { themeColors } from "../../Styles/colorTheme";
import { breakPoints } from "../../Utils/screenSizes";

export const Container = styled.div`
  width: 100%;
  min-width: 0;
  height: 150px;
  background-color: ${themeColors.secondaryBackground};
  box-shadow: 0px 4px 16px 0px #011c4033;
  display: flex;
  overflow: hidden;
`;

export const DataSide = styled.div`
  flex-grow: 1;
  min-width: 0;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SubTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
  letter-spacing: 0em;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
