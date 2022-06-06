import { useEffect, useState } from "react";
import * as S from "./styles";
import closeIcon from "../../Assets/closeIcon.svg";
import { handleStatus } from "../../Utils/handleStatus";

import api from "../../Services/index";

const Modal = ({ setOpenModal, dataOriginal }) => {
  const [firstRelated, setFirstRelated] = useState();
  const [seconfRelated, setSeconfRelated] = useState();
  console.log("data", dataOriginal);

  const handleReleate = async (data) => {
    const res = await api.get(data.episode[0]);

    const PersonaOne = await api.get(res.data.characters[1]);
    const PersonaTwo = await api.get(res.data.characters[3]);

    setFirstRelated(PersonaOne.data);
    setSeconfRelated(PersonaTwo.data);
  };

  useEffect(() => {
    handleReleate(dataOriginal);
  }, [dataOriginal]);

  useEffect(() => {
    console.log("seconfRelated", seconfRelated);
    console.log("firstRelated", firstRelated);
  }, [firstRelated, seconfRelated]);

  return (
    <S.Container>
      <S.ModalWrapper>
        <S.SideImage>
          <S.ImgPersona src={dataOriginal?.image} />
          <S.DataPersona>
            <S.Name>{dataOriginal?.name}</S.Name>
            <S.Status>
              <S.Dot status={handleStatus(dataOriginal?.status)}></S.Dot>
              {dataOriginal.status}
            </S.Status>
            <S.Gender>
              Gênero:<span>{dataOriginal?.gender}</span>{" "}
            </S.Gender>
            <S.First>
              Primeira aparição: <span>{dataOriginal?.firstEps}</span>
            </S.First>
            <S.Last>
              Ultima aparição: <span>{dataOriginal.lastEps}</span>
            </S.Last>
          </S.DataPersona>
        </S.SideImage>
        <S.ModalContent>
          <S.RelatedPersona>
            <S.PesonaTitle>Personagens relacionados</S.PesonaTitle>
            <S.ContainerRelated>
              <S.ContentRelated>
                <S.ImgRelated src={firstRelated?.image} />
                <S.NameRelated>{firstRelated?.name}</S.NameRelated>
              </S.ContentRelated>
              <S.ContentRelated>
                <S.ImgRelated src={seconfRelated?.image} />
                <S.NameRelated>{seconfRelated?.name}</S.NameRelated>
              </S.ContentRelated>
            </S.ContainerRelated>
          </S.RelatedPersona>
        </S.ModalContent>
        <S.CloseModalButton
          aria-label="Close modal"
          src={closeIcon}
          onClick={() => {
            setOpenModal(false);
          }}
        />
      </S.ModalWrapper>
    </S.Container>
  );
};

export default Modal;
