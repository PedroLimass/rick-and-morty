import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";

import { getLocationsPage } from "../Services/locations";
import type { LocationFilters } from "../Services/locations";
import { getCharactersByIds } from "../Services/characters";
import { getIdFromUrl } from "../Utils/getIdFromUrl";
import type { LocationWithImage } from "../types/rickAndMorty";

type PagesMap = Record<number, LocationWithImage[]>;

interface UseLocationsResult {
  locations: LocationWithImage[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
}

export function useLocations(
  filters: LocationFilters = {}
): UseLocationsResult {
  const filterKey = JSON.stringify(filters);

  const [pages, setPages] = useState<PagesMap>({});
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reseta a paginação quando os filtros mudam (durante o render, antes do efeito de busca).
  const [appliedFilterKey, setAppliedFilterKey] = useState(filterKey);
  if (appliedFilterKey !== filterKey) {
    setAppliedFilterKey(filterKey);
    setPages({});
    setPage(1);
    setHasMore(true);
  }

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getLocationsPage(
          page,
          JSON.parse(filterKey) as LocationFilters,
          controller.signal
        );

        const residentIds = data.results
          .map((location) => getIdFromUrl(location.residents[0]))
          .filter((id): id is number => id !== null);

        const characters = await getCharactersByIds(
          residentIds,
          controller.signal
        );
        const imageById = new Map(characters.map((c) => [c.id, c.image]));

        const withImages: LocationWithImage[] = data.results.map(
          (location) => ({
            ...location,
            image: imageById.get(getIdFromUrl(location.residents[0]) ?? -1),
          })
        );

        setPages((current) => ({ ...current, [page]: withImages }));
        setHasMore(data.info.next !== null);
      } catch (err) {
        if (axios.isCancel(err)) return;
        // A API responde 404 quando nenhum local corresponde aos filtros.
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          setPages((current) => ({ ...current, [page]: [] }));
          setHasMore(false);
        } else {
          setError("Não foi possível carregar os lugares. Tente novamente.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    load();

    return () => controller.abort();
  }, [page, filterKey]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) setPage((current) => current + 1);
  }, [loading, hasMore]);

  const locations = useMemo(
    () =>
      Object.keys(pages)
        .map(Number)
        .sort((a, b) => a - b)
        .flatMap((key) => pages[key]),
    [pages]
  );

  return { locations, loading, error, hasMore, loadMore };
}
