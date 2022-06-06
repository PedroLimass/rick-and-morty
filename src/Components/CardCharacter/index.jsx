import { useState } from "react";
import { handleStatus } from "../../Utils/handleStatus";
import Modal from "../Modal";
import * as S from "./styles";

const CardCharacter = ({
  Title,
  Status,
  FirstMoment,
  LastMoment,
  imgLink,
  data,
}) => {
  const [showModal, setShowModal] = useState(false);
  const helpLink = "https://rickandmortyapi.com/api/character/avatar/1.jpeg";

  const openModal = () => {
    setShowModal((prev) => {
      return !prev;
    });
  };

  return (
    <>
      <S.Container onClick={openModal}>
        <S.ImgSide src={imgLink === undefined ? helpLink : imgLink} />
        <S.DetailSide>
          <S.Title>{Title}</S.Title>
          <S.Status>
            <S.Dot status={handleStatus(Status)}></S.Dot>
            {Status}
          </S.Status>
          <S.FirstMoment>
            Primeira aparição: <span>{FirstMoment}</span>
          </S.FirstMoment>
          <S.LastMoment>
            Ultima aparição: <span>{LastMoment}</span>
          </S.LastMoment>
        </S.DetailSide>
      </S.Container>

      {showModal && <Modal setOpenModal={setShowModal} dataOriginal={data} />}
    </>
  );
};

export default CardCharacter;
