import { useEffect, useState } from "react";
import BtnLoadMore from "../../Components/BtnLoadMore";
import CardLocation from "../../Components/CardLocation";
import api from "../../Services/index";
import * as S from "./styles";

const FamousPlaces = () => {
  const [loadData, setloadData] = useState(false);
  const [totalItems, setTotalItems] = useState();
  const [sliceData, setSliceData] = useState(0);
  const [allLocation, setAllLocation] = useState([]);
  const [location, setLoadMore] = useState("/location");

  const handleLocation = async () => {
    setloadData(true);
    if (location !== null) {
      const { data } = await api.get(location);
      setLoadMore(data.info.next);
      setTotalItems(data.info.count);

      const resultData = data.results.map(async (ele) => {
        const { data } = await api.get(ele.residents[0]);

        return { ...ele, image: data.image };
      });

      const solve = await Promise.all(resultData);

      setAllLocation((currentList) => {
        return [...currentList, ...solve];
      });
    }
    setSliceData((current) => current + 6);
    setloadData(false);
  };

  useEffect(() => {
    handleLocation();
  }, []);

  return (
    <S.Container>
      <S.Content>
        <S.Title>Lugares Famosos de Rick & Morty</S.Title>

        <S.Grid>
          {allLocation.slice(0, sliceData).map((data, index) => {
            return (
              <CardLocation
                key={index}
                index={index}
                Title={data.name}
                SubTitle={data.dimension}
                imgLink={data.image}
              />
            );
          })}
        </S.Grid>

        {!(sliceData === totalItems) && (
          <BtnLoadMore actionFunc={handleLocation} />
        )}
      </S.Content>
    </S.Container>
  );
};

export default FamousPlaces;
