import { style } from "@mui/system";
import styled from "styled-components";
import { themeColors } from "../../Styles/colorTheme";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  z-index: 80;
`;

export const ModalWrapper = styled.div`
  width: 1038px;
  height: 600px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: ${themeColors.primaryBackground};
  display: grid;
  grid-template-rows: 1fr 1fr;
  position: relative;
  z-index: 80;
  border-radius: 20px;
`;

export const SideImage = styled.div`
  display: flex;
  border-radius: 20px;
  padding: 60px 0px 0px 60px;
  position: relative;
`;

export const ModalContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  border-radius: 20px;
`;

export const CloseModalButton = styled.img`
  cursor: pointer;
  position: absolute;
  top: 15px;
  right: 15px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 80;
`;

export const ImgPersona = styled.img`
  height: 258px;
  width: 258px;
  border-radius: 10px;
`;

export const DataPersona = styled.div`
  min-width: 270px;
  height: 100%;
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  gap: 11px;

  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;
  color: ${themeColors.subDetail};

  span {
    color: ${themeColors.white};
  }
`;

export const Name = styled.h2`
  font-size: 44px;
  font-weight: 700;
  line-height: 50px;
  color: ${themeColors.title};
`;
export const Status = styled.div`
  display: flex;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const Gender = styled.div`
  display: flex;
  flex-direction: column;
`;
export const First = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Last = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ status }) => {
    return status ? status : "white";
  }};
  margin-right: 10px;
`;

export const PesonaTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
  color: ${themeColors.primaryColors};
  letter-spacing: 0em;
  text-align: left;
  margin-top: 43px;
  margin-bottom: 14px;
`;

export const RelatedPersona = styled.div`
  width: 276px;
  height: 100%;
  margin-right: 57px;
`;

export const ImgRelated = styled.img`
  height: 128px;
  border-radius: 10px;
`;

export const ContainerRelated = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

export const NameRelated = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: left;
  color: ${themeColors.white};
`;

export const ContentRelated = styled.div`
  width: 128px;
  gap: 5px;
  display: flex;
  flex-direction: column;
`;
