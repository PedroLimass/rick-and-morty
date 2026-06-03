import styled from "styled-components";
import { themeColors } from "../../Styles/colorTheme";
import { breakPoints } from "../../Utils/screenSizes";

export const Container = styled.div`
  width: 100%;
  max-width: 682px;
  min-height: 150px;
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: ${breakPoints.mobile}) {
    max-width: 280px;
  }
`;

export const DataSide = styled.div`
  flex-grow: 1;
  min-width: 0;
  padding: 10px 0 30px 23px;
  background-color: ${themeColors.secondaryBackground};
`;

export const ImgSide = styled.img`
  width: 176px;
  min-height: 150px;
  height: auto;
  align-self: stretch;
  object-fit: cover;
  background-color: ${themeColors.primaryBackground};
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const EpsDate = styled.span`
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: left;
  display: block;
`;

export const Characters = styled.span`
  display: block;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 600;
  line-height: 19px;
  color: ${themeColors.primaryColors};
`;
