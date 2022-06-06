import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../Components/Header";
import Character from "../Pages/Character";
import EpisodeList from "../Pages/EpisodeList";
import FamousPlaces from "../Pages/FamousPlaces";
import Home from "../Pages/Home";
import GlobalStyle from "../Styles/global";
import { allRoutes } from "./allRoutes";

export const RoutesPages = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={allRoutes.home} element={<Home />} />
        <Route path={allRoutes.characters} element={<Character />} />
        <Route path={allRoutes.locations} element={<FamousPlaces />} />
        <Route path={allRoutes.episodes} element={<EpisodeList />} />
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
};
