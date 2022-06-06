import styled from "styled-components";

export const Container = styled.div`
  .btnLoadMore {
    font-family: Open Sans;
    font-size: 20px;
    font-weight: 600;
    line-height: 27px;
    letter-spacing: 0em;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 9px;
    align-items: center;
    color: ${({ btnColor }) => {
      return btnColor === "white" ? "white" : "black";
    }};

    background: transparent;

    border: none;
  }
`;
