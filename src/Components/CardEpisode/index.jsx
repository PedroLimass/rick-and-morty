import { dateConvert } from "../../Utils/dateConvert";
import * as S from "./styles";

const CardEpisode = ({ Id, Title, DateEps, imgLink }) => {
  const helpLink = "https://rickandmortyapi.com/api/character/avatar/1.jpeg";

  return (
    <S.Container>
      <S.DataSide>
        <S.IdEps>{Id}</S.IdEps>
        <S.Title>{Title}</S.Title>
        <S.EpsDate>Lançamento: {dateConvert(DateEps)}</S.EpsDate>
      </S.DataSide>

      <S.ImgSide src={imgLink === undefined ? helpLink : imgLink} />
    </S.Container>
  );
};

export default CardEpisode;
