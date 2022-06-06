import * as S from "./styles";
import Logo from "../../Assets/Rick-And-Morty-Logo.png";
import { allRoutes } from "../../Routes/allRoutes";
import { CustomLink } from "../CustomLink";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(useLocation());
  const location = useLocation();

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (currentLocation.pathname !== location.pathname) {
      setShowMenu(false);
      setCurrentLocation(location);
    }
  }, [currentLocation.pathname, location]);

  return (
    <S.Container>
      <S.Header>
        <S.Logo>
          <CustomLink to="/" className="logo">
            <img src={Logo} alt="Logo Rick and Morty" />
          </CustomLink>
        </S.Logo>
        <S.Menu showMenu={showMenu}>
          <CustomLink to={allRoutes.characters}>Personagens</CustomLink>
          <CustomLink to={allRoutes.locations}>Lugares Famosos</CustomLink>
          <CustomLink to={allRoutes.episodes}>Episódios</CustomLink>
        </S.Menu>
        <GiHamburgerMenu className="hamburger" onClick={handleMenu} />
      </S.Header>
    </S.Container>
  );
};

export default Header;
