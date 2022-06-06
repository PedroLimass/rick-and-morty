import React from "react";
import * as S from "./styles";
import HomeImg from "../../Assets/rick-and-morty-plant.png";
import LinkApi from "../../Components/LinkApi";
import { allRoutes } from "../../Routes/allRoutes";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <S.Container>
      <S.Title>
        Está preparado para navegar no mundo de Rick and Morty ?
      </S.Title>

      <img src={HomeImg} className="homeAsset" alt="Rick and Morty portal" />

      <Link to={allRoutes.characters} className="btnHome">
        Iniciar Aventura
      </Link>

      <LinkApi />
    </S.Container>
  );
};

export default Home;
