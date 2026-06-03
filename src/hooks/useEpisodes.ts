import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import { getAllEpisodes } from "../Services/episodes";
import { getCharactersByIds } from "../Services/characters";
import { getIdFromUrl } from "../Utils/getIdFromUrl";
import type { EpisodeWithImage } from "../types/rickAndMorty";

type SeasonsMap = Record<string, EpisodeWithImage[]>;

const getSeasonCode = (episode: string): string => episode.slice(1, 3);

/**
 * Usa o último personagem do episódio como imagem representativa: ele varia
 * bastante entre episódios (o primeiro é quase sempre o Rick) e sempre existe.
 */
const getRepresentativeUrl = (characters: string[]): string | undefined =>
  characters[characters.length - 1];

const groupBySeason = (episodes: EpisodeWithImage[]): SeasonsMap =>
  episodes.reduce<SeasonsMap>((seasons, episode) => {
    const season = getSeasonCode(episode.episode);
    (seasons[season] ??= []).push(episode);
    return seasons;
  }, {});

interface UseEpisodesResult {
  episodes: EpisodeWithImage[];
  seasons: SeasonsMap;
  loading: boolean;
  error: string | null;
}

export function useEpisodes(): UseEpisodesResult {
  const [episodes, setEpisodes] = useState<EpisodeWithImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const allEpisodes = await getAllEpisodes(controller.signal);

        const representativeIds = allEpisodes
          .map((episode) => getIdFromUrl(getRepresentativeUrl(episode.characters)))
          .filter((id): id is number => id !== null);

        const characters = await getCharactersByIds(
          representativeIds,
          controller.signal
        );
        const imageById = new Map(characters.map((c) => [c.id, c.image]));

        const withImages: EpisodeWithImage[] = allEpisodes.map((episode) => ({
          ...episode,
          image: imageById.get(
            getIdFromUrl(getRepresentativeUrl(episode.characters)) ?? -1
          ),
        }));

        setEpisodes(withImages);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError("Não foi possível carregar os episódios. Tente novamente.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    load();

    return () => controller.abort();
  }, []);

  const seasons = useMemo(() => groupBySeason(episodes), [episodes]);

  return { episodes, seasons, loading, error };
}
