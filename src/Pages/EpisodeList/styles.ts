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
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  line-height: 38px;
  letter-spacing: 0em;
  text-align: center;
  color: ${themeColors.primaryColors};
  margin-bottom: 70px;
`;

export const ColumnEps = styled.div`
  width: 100%;
  max-width: 682px;
  height: auto;
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

export const Filters = styled.div`
  width: 100%;
  max-width: 682px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
  margin-bottom: 49px;

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
  padding: 60px 10%;
  color: ${themeColors.primaryColors};
  font-size: 18px;
  text-align: center;
`;

export const WrapperSelect = styled.div`
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
      width: 100%;
    }
  }
`;
