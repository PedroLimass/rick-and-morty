import api from "./index";
import type { ApiList, Location } from "../types/rickAndMorty";

export interface LocationFilters {
  name?: string;
  type?: string;
  dimension?: string;
}

/** Busca uma página de locais (20 itens por página), com filtros opcionais. */
export async function getLocationsPage(
  page: number,
  filters: LocationFilters = {},
  signal?: AbortSignal
): Promise<ApiList<Location>> {
  const params: Record<string, string | number> = { page };

  for (const [key, value] of Object.entries(filters)) {
    if (value) params[key] = value;
  }

  const { data } = await api.get<ApiList<Location>>("/location", {
    params,
    signal,
  });
  return data;
}

export interface LocationFilterOptions {
  types: string[];
  dimensions: string[];
}

let filterOptionsCache: LocationFilterOptions | null = null;

/**
 * Lê todos os locais uma única vez (com cache) para derivar a lista real
 * de tipos e dimensões disponíveis, alimentando os selects de filtro.
 */
export async function getLocationFilterOptions(
  signal?: AbortSignal
): Promise<LocationFilterOptions> {
  if (filterOptionsCache) return filterOptionsCache;

  const firstPage = await getLocationsPage(1, {}, signal);

  const restPages = await Promise.all(
    Array.from({ length: firstPage.info.pages - 1 }, (_, index) =>
      getLocationsPage(index + 2, {}, signal)
    )
  );

  const allLocations = [firstPage, ...restPages].flatMap((page) => page.results);

  const distinctSorted = (values: string[]): string[] =>
    [...new Set(values)]
      .filter((value) => value.trim() !== "")
      .sort((a, b) => a.localeCompare(b));

  filterOptionsCache = {
    types: distinctSorted(allLocations.map((location) => location.type)),
    dimensions: distinctSorted(
      allLocations.map((location) => location.dimension)
    ),
  };

  return filterOptionsCache;
}
