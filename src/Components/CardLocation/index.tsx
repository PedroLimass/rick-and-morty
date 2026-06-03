import * as S from "./styles";

const FALLBACK_IMAGE =
  "https://rickandmortyapi.com/api/character/avatar/1.jpeg";

interface CardLocationProps {
  Title: string;
  SubTitle: string;
  imgLink?: string;
}

const CardLocation = ({ Title, SubTitle, imgLink }: CardLocationProps) => {
  const dimension = SubTitle.replace(/Dimension:?/g, "").trim();

  return (
    <S.Container data-testid="card-location">
      <S.DataSide>
        <S.Title>{Title}</S.Title>
        <S.SubTitle>Dimensão: {dimension}</S.SubTitle>
      </S.DataSide>
      <S.ImgSide src={imgLink ?? FALLBACK_IMAGE} alt={Title} />
    </S.Container>
  );
};

export default CardLocation;
