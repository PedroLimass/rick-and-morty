import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";

import IconSearch from "../../Assets/Search.svg?react";
import BtnLoadMore from "../../Components/BtnLoadMore";
import CardLocation from "../../Components/CardLocation";
import { useLocations } from "../../hooks/useLocations";
import { useLocationOptions } from "../../hooks/useLocationOptions";
import { useDebounce } from "../../hooks/useDebounce";
import * as S from "./styles";

const FamousPlaces = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [dimension, setDimension] = useState("");
  const debouncedName = useDebounce(name);

  const { types, dimensions } = useLocationOptions();

  const filters = useMemo(
    () => ({ name: debouncedName, type, dimension }),
    [debouncedName, type, dimension]
  );

  const { locations, loading, error, hasMore, loadMore } =
    useLocations(filters);

  const isEmpty = !loading && !error && locations.length === 0;

  return (
    <S.Container>
      <S.Content>
        <S.Title>Lugares Famosos de Rick & Morty</S.Title>

        <S.Filters>
          <Box sx={{ flex: 1, minWidth: 240 }}>
            <TextField
              fullWidth
              label="Buscar lugares"
              value={name}
              onChange={(event) => setName(event.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconSearch />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel id="select-type">Tipo</InputLabel>
            <Select
              labelId="select-type"
              id="select-type"
              value={type}
              label="Tipo"
              onChange={(event) => setType(event.target.value)}
            >
              <MenuItem value="">Todos</MenuItem>
              {types.map((locationType) => (
                <MenuItem key={locationType} value={locationType}>
                  {locationType}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel id="select-dimension">Dimensão</InputLabel>
            <Select
              labelId="select-dimension"
              id="select-dimension"
              value={dimension}
              label="Dimensão"
              onChange={(event) => setDimension(event.target.value)}
            >
              <MenuItem value="">Todas</MenuItem>
              {dimensions.map((dim) => (
                <MenuItem key={dim} value={dim}>
                  {dim}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </S.Filters>

        <S.Grid>
          {locations.map((location) => (
            <CardLocation
              key={location.id}
              Title={location.name}
              SubTitle={location.dimension}
              imgLink={location.image}
            />
          ))}
        </S.Grid>

        {loading && (
          <S.StatusMessage>
            <CircularProgress />
          </S.StatusMessage>
        )}

        {error && !loading && <S.StatusMessage>{error}</S.StatusMessage>}

        {isEmpty && (
          <S.StatusMessage>
            Nenhum lugar encontrado para a busca.
          </S.StatusMessage>
        )}

        {!loading && !error && hasMore && locations.length > 0 && (
          <BtnLoadMore actionFunc={loadMore} />
        )}
      </S.Content>
    </S.Container>
  );
};

export default FamousPlaces;
