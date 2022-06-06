import styled from "styled-components";
import { themeColors } from "../../Styles/colorTheme";
import { breakPoints } from "../../Utils/screenSizes";

export const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  padding-top: 80px;
  align-items: center;
`;
export const Content = styled.div`
  max-width: 1180px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  line-height: 38px;
  letter-spacing: 0em;
  text-align: left;
  color: ${themeColors.primaryColors};
  margin-bottom: 70px;

  @media only screen and (max-width: ${breakPoints.ipadAir}) {
    margin-left: 10%;
  }
`;

export const ColumnEps = styled.div`
  max-width: 682px;
  height: 110px;
  display: flex;
  flex-direction: column;
  gap: 28px;

  .btnLoadMore {
    display: flex;
    justify-content: center;
    padding-top: 40px;
    padding-bottom: 45px;

    @media only screen and (max-width: ${breakPoints.mobile}) {
      width: 300px;
    }
  }

  @media only screen and (max-width: ${breakPoints.ipadAir}) {
    padding: 0 10%;
  }
`;

export const WrapperSelect = styled.div`
  margin-bottom: 49px;
  .selectTemp {
    width: 210px;
    height: 60px;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;

    background-image: linear-gradient(45deg, transparent 50%, #12b0c9 50%),
      linear-gradient(135deg, #12b0c9 50%, transparent 50%);
    background-position: calc(100% - 20px) calc(1em + 7px),
      calc(100% - 15px) calc(1em + 7px), calc(100% - 2.5em) 0.5em;
    background-size: 5px 5px, 5px 5px, 1px 1.5em;
    background-repeat: no-repeat;

    font-family: Open Sans;
    color: ${themeColors.primaryColors};
    background-color: ${themeColors.secondaryBackground};
    font-size: 22px;
    font-weight: 600;
    line-height: 30px;
    letter-spacing: 0em;
    text-align: center;
    border-radius: 6px;
    padding-right: 20px;
    border: none;

    @media only screen and (max-width: ${breakPoints.ipadAir}) {
      margin-left: 10%;
    }
  }
`;
