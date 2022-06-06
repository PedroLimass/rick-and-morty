import * as S from "./styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { ReactComponent as IconSearch } from "../../Assets/Search.svg";
import api from "../../Services/index";
import FilterRickAndMorty from "../../Assets/Rick-and-Morty-Shop.png";

import { useEffect, useState } from "react";
import LinkApi from "../../Components/LinkApi";
import CardCharacter from "../../Components/CardCharacter";
import BtnLoadMore from "../../Components/BtnLoadMore";

const Character = () => {
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");
  const [name, setName] = useState("");
  const [dataSearch, setDataSearch] = useState([]);
  const [sliceData, setSliceData] = useState(6);
  const [loadMore, setLoadMore] = useState();

  const handleStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleGender = (event) => {
    setGender(event.target.value);
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  const searchCharacter = async (nameSearch, genderSearch, statusSearch) => {
    const params = {
      name: nameSearch,
      gender: genderSearch,
      status: statusSearch,
    };

    if (nameSearch !== "" || genderSearch !== "" || statusSearch !== "") {
      const { data } = await api.get("/character", { params });

      setLoadMore(data.info.next);

      const resultData = data.results.map(async (ele) => {
        const first = await api.get(ele.episode[0]);
        const last = await api.get(ele.episode[ele.episode.length - 1]);

        return { ...ele, firstEps: first.data.name, lastEps: last.data.name };
      });

      const solve = await Promise.all(resultData);
      console.log("solve", solve);

      setDataSearch(solve);
    }
  };

  const handleDataSearch = async () => {
    const { data } = await api.get(loadMore);
    setLoadMore(data.info.next);

    const resultData = data.results.map(async (ele) => {
      const first = await api.get(ele.episode[0]);
      const last = await api.get(ele.episode[ele.episode.length - 1]);

      return { ...ele, firstEps: first.data.name, lastEps: last.data.name };
    });

    const solveMoreData = await Promise.all(resultData);

    setDataSearch((currentList) => {
      return [...currentList, ...solveMoreData];
    });

    setSliceData((current) => current + 6);
  };

  useEffect(() => {
    searchCharacter(name, gender, status);
  }, [gender, name, status]);

  return (
    <S.Container>
      <S.Content>
        <S.Title>Buscar Personagens</S.Title>
        <S.Filter>
          <Box
            sx={{
              width: 500,
              maxWidth: "100%",
            }}
          >
            <TextField
              fullWidth
              label="Buscar Personagens"
              id="searchBar"
              onChange={handleName}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconSearch />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <FormControl sx={{ mt: 2, minWidth: 238 }} size="fullWidth">
            <InputLabel id="select-status">Status</InputLabel>
            <Select
              labelId="select-status"
              id="select-status"
              value={status}
              label="Status"
              onChange={handleStatus}
            >
              <MenuItem value={"alive"}>Alive</MenuItem>
              <MenuItem value={"dead"}>Dead</MenuItem>
              <MenuItem value={"unknown"}>Unknown</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ mt: 2, minWidth: 238 }} size="fullWidth">
            <InputLabel id="select-gender">Gênero</InputLabel>
            <Select
              labelId="select-gender"
              id="select-gender"
              value={gender}
              label="Gênero"
              onChange={handleGender}
            >
              <MenuItem value={"female"}>Female</MenuItem>
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"genderless"}>Genderless</MenuItem>
              <MenuItem value={"unknown"}>Unknown</MenuItem>
            </Select>
          </FormControl>
        </S.Filter>
      </S.Content>
      <S.BottomSide>
        {dataSearch.length > 0 ? (
          <>
            <S.ResultFilter>
              <S.FilterContent>
                <S.TitleRes>Resultado</S.TitleRes>
                <S.GridCard>
                  {dataSearch.slice(0, sliceData).map((persona, index) => {
                    return (
                      <CardCharacter
                        key={index}
                        Title={persona.name}
                        imgLink={persona.image}
                        Status={persona.status}
                        FirstMoment={persona.firstEps}
                        LastMoment={persona.lastEps}
                        data={persona}
                      />
                    );
                  })}
                </S.GridCard>
                <S.BtnContent>
                  {loadMore !== null && (
                    <BtnLoadMore btnColor="white" actionFunc={handleDataSearch} />
                  )}
                </S.BtnContent>
              </S.FilterContent>
            </S.ResultFilter>
            <S.ResultFilterBottom>
              <LinkApi />
            </S.ResultFilterBottom>
          </>
        ) : (
          <S.BottomAsset>
            <img src={FilterRickAndMorty} alt="Rick and Morty portal" />
            <LinkApi />
          </S.BottomAsset>
        )}
      </S.BottomSide>
    </S.Container>
  );
};

export default Character;
