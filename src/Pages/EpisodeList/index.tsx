import { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";

import IconSearch from "../../Assets/Search.svg?react";
import BtnLoadMore from "../../Components/BtnLoadMore";
import CardEpisode from "../../Components/CardEpisode";
import { useEpisodes } from "../../hooks/useEpisodes";
import { useDebounce } from "../../hooks/useDebounce";
import * as S from "./styles";

const PAGE_SIZE = 6;
const ALL_SEASONS = "all";
const SEASONS = ["01", "02", "03", "04", "05"];

const EpisodeList = () => {
  const { episodes, seasons, loading, error } = useEpisodes();
  const [selectedSeason, setSelectedSeason] = useState("01");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const debouncedSearch = useDebounce(search);

  const filteredEpisodes = useMemo(() => {
    const base =
      selectedSeason === ALL_SEASONS
        ? episodes
        : seasons[selectedSeason] ?? [];

    const term = debouncedSearch.trim().toLowerCase();
    if (!term) return base;

    return base.filter((episode) =>
      episode.name.toLowerCase().includes(term)
    );
  }, [episodes, seasons, selectedSeason, debouncedSearch]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [selectedSeason, debouncedSearch]);

  const canLoadMore = visibleCount < filteredEpisodes.length;
  const isEmpty = !loading && !error && filteredEpisodes.length === 0;

  return (
    <S.Container>
      <S.Content>
        <S.Title>Episódios</S.Title>

        <S.Filters>
          <Box sx={{ flex: 1, minWidth: 240 }}>
            <TextField
              fullWidth
              label="Buscar episódio"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconSearch />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <S.WrapperSelect>
            <select
              name="selectTemp"
              className="selectTemp"
              value={selectedSeason}
              onChange={(event) => setSelectedSeason(event.target.value)}
            >
              <option value={ALL_SEASONS}>Todas as temporadas</option>
              {SEASONS.map((season) => (
                <option key={season} value={season}>
                  Temporada {Number(season)}
                </option>
              ))}
            </select>
          </S.WrapperSelect>
        </S.Filters>

        {loading && (
          <S.StatusMessage>
            <CircularProgress />
          </S.StatusMessage>
        )}

        {error && !loading && <S.StatusMessage>{error}</S.StatusMessage>}

        {isEmpty && (
          <S.StatusMessage>Nenhum episódio encontrado.</S.StatusMessage>
        )}

        {!loading && !error && (
          <S.ColumnEps>
            {filteredEpisodes.slice(0, visibleCount).map((episode) => (
              <CardEpisode
                key={episode.id}
                Id={episode.id}
                Code={episode.episode}
                imgLink={episode.image}
                Title={episode.name}
                DateEps={episode.air_date}
                CharactersCount={episode.characters.length}
              />
            ))}
            <div className="btnLoadMore">
              {canLoadMore && (
                <BtnLoadMore
                  actionFunc={() =>
                    setVisibleCount((current) => current + PAGE_SIZE)
                  }
                />
              )}
            </div>
          </S.ColumnEps>
        )}
      </S.Content>
    </S.Container>
  );
};

export default EpisodeList;
