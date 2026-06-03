import { dateConvert } from "../../Utils/dateConvert";
import * as S from "./styles";

const FALLBACK_IMAGE =
  "https://rickandmortyapi.com/api/character/avatar/1.jpeg";

interface CardEpisodeProps {
  Id: number;
  Title: string;
  DateEps: string;
  imgLink?: string;
  Code?: string;
  CharactersCount?: number;
}

const CardEpisode = ({
  Id,
  Title,
  DateEps,
  imgLink,
  Code,
  CharactersCount,
}: CardEpisodeProps) => {
  return (
    <S.Container>
      <S.DataSide>
        <S.IdEps>{Code ?? Id}</S.IdEps>
        <S.Title>{Title}</S.Title>
        <S.EpsDate>Lançamento: {dateConvert(DateEps)}</S.EpsDate>
        {CharactersCount !== undefined && (
          <S.Characters>
            {CharactersCount} personagens neste episódio
          </S.Characters>
        )}
      </S.DataSide>

      <S.ImgSide src={imgLink ?? FALLBACK_IMAGE} alt={Title} />
    </S.Container>
  );
};

export default CardEpisode;
