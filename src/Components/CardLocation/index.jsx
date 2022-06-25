import * as S from "./styles";

const CardLocation = ({ Title, SubTitle, imgLink }) => {
  const helpLink = "https://rickandmortyapi.com/api/character/avatar/1.jpeg";

  const clearWord = SubTitle.replace(/Dimension:/g, ""); 
  return (
    <S.Container data-testid="card-location">
      <S.DataSide>
        <S.Title>{Title}</S.Title>
        <S.SubTitle>Dimensão: {clearWord}</S.SubTitle>
      </S.DataSide>
      <S.ImgSide src={imgLink === undefined ? helpLink : imgLink} />
    </S.Container>
  );
};

export default CardLocation;
