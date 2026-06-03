import * as S from "./styles";
import ArrowDown from "../../Assets/arrowDown.png";

interface BtnLoadMoreProps {
  actionFunc: () => void;
  btnColor?: string;
}

const BtnLoadMore = ({ actionFunc, btnColor }: BtnLoadMoreProps) => {
  return (
    <S.Container btnColor={btnColor}>
      <button
        type="button"
        className="btnLoadMore"
        data-testid="btnLoadMore"
        onClick={actionFunc}
      >
        Mostrar Mais
        <img src={ArrowDown} alt="Seta para baixo" />
      </button>
    </S.Container>
  );
};

export default BtnLoadMore;
