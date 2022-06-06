import styled from "styled-components";
import { themeColors } from "../../Styles/colorTheme";

export const Container = styled.div`
  width: 328px;
  height: 128px;
  display: flex;
  cursor: pointer;
`;

export const ImgSide = styled.img`
  width: 128px;
  height: 128px;
  border-radius: 10px 0 0px 10px;
`;

export const DetailSide = styled.div`
  flex-grow: 1;
  background-color: ${themeColors.auxGrey};
  padding: 10px;
  border-radius: 0px 10px 10px 0px;
`;

export const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
  white-space: nowrap;
  width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;

  text-align: left;
  color: ${themeColors.white};
`;
export const Status = styled.div`
  font-size: 12px;
  font-weight: 400;
  text-align: left;
  color: ${themeColors.white};
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const FirstMoment = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  font-weight: 400;
  color: ${themeColors.subDetail};
  white-space: nowrap;
  width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;

  text-align: left;

  span {
    color: ${themeColors.white};
  }
`;
export const LastMoment = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  font-weight: 400;
  color: ${themeColors.subDetail};
  span {
    color: ${themeColors.white};
  }

  white-space: nowrap;
  width: 170px;
  overflow: hidden;
  text-overflow: ellipsis;

  text-align: left;
`;

export const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ status }) => {
    return status ? status : "white";
  }};
  margin-right: 5px;
`;
