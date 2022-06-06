import { useCallback, useEffect, useState } from "react";
import BtnLoadMore from "../../Components/BtnLoadMore";
import CardEpisode from "../../Components/CardEpisode";
import api from "../../Services/index";
import * as S from "./styles";

const EpisodeList = () => {
  const [selectTemp, setSelectTemp] = useState("01");
  const [sliceData, setSliceData] = useState(6);
  const [location, setLoadMore] = useState("/episode");
  const [allEpisode, setAllEpisode] = useState([]);
  const [episodeByTemp, setEpisodeByTemp] = useState([]);
  const [showTemp, setShowTemp] = useState([]);

  const handleEpisode = useCallback(
    async (url) => {
      if (url === null || allEpisode.length === 51) return 0;
      const { data } = await api.get(url);

      const resultData = data.results.map(async (ele) => {
        const { data } = await api.get(ele.characters[8]);

        return { ...ele, image: data.image };
      });

      const solve = await Promise.all(resultData);

      setAllEpisode((current) => {
        return [...current, ...solve];
      });

      handleEpisode(data.info.next);
    },

    [allEpisode.length]
  );

  const handleTempSlice = useCallback(() => {
    if (allEpisode <= 0) return 0;
    if (episodeByTemp.length === 5) return 0;
    const spliceNum = allEpisode.length === 51 ? 11 : 10;

    const temp = allEpisode.splice(0, spliceNum);
    setEpisodeByTemp((current) => {
      return [...current, [...temp]];
    });
    handleTempSlice();
  }, [allEpisode, episodeByTemp.length]);

  useEffect(() => {
    if (allEpisode.length === 51) {
      handleTempSlice();
    }
  }, [allEpisode, handleTempSlice, setAllEpisode]);

  useEffect(() => {
    handleEpisode(location);
  }, []);

  useEffect(() => {
    const indexTemp = Number(selectTemp);
    setShowTemp(episodeByTemp[indexTemp - 1]);
    setSliceData(6);
  }, [episodeByTemp, selectTemp]);

  return (
    <S.Container>
      <S.Content>
        <S.Title>Episódios</S.Title>
        <S.WrapperSelect>
          <select
            name="selectTemp"
            className="selectTemp"
            onChange={(e) => setSelectTemp(e.target.value)}
          >
            <option value="01">Temporada 1</option>
            <option value="02">Temporada 2</option>
            <option value="03">Temporada 3</option>
            <option value="04">Temporada 4</option>
            <option value="05">Temporada 5</option>
          </select>
        </S.WrapperSelect>
        <S.ColumnEps>
          {showTemp?.slice(0, sliceData).map((eps, index) => {
            return (
              <CardEpisode
                index={index}
                Id={eps.id}
                imgLink={eps.image}
                Title={eps.name}
                DateEps={eps.air_date}
              />
            );
          })}
          <div className="btnLoadMore">
            {!(sliceData === 12) && (
              <BtnLoadMore
                actionFunc={() => setSliceData((current) => current + 6)}
              />
            )}
          </div>
        </S.ColumnEps>
      </S.Content>
    </S.Container>
  );
};

export default EpisodeList;
