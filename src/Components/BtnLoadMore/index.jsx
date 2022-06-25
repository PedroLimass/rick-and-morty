import * as S from "./styles";
import ArrowDown from "../../Assets/arrowDown.png";

const BtnLoadMore = ({ actionFunc, btnColor }) => {
  return (
    <S.Container btnColor={btnColor}>
      <button
        type="button"
        className="btnLoadMore"
        data-testid="btnLoadMore"
        onClick={() => {
          return actionFunc();
        }}
      >
        Mostrar Mais
        <img src={ArrowDown} alt="Seta para baixo" />
      </button>
    </S.Container>
  );
};

export default BtnLoadMore;
