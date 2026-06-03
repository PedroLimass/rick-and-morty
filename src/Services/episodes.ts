import api from "./index";
import type { ApiList, Episode } from "../types/rickAndMorty";

/**
 * Busca todos os episódios. Descobre o total de páginas na primeira
 * requisição e carrega as demais em paralelo, sem recursão nem mutação
 * de estado.
 */
export async function getAllEpisodes(
  signal?: AbortSignal
): Promise<Episode[]> {
  const { data: firstPage } = await api.get<ApiList<Episode>>("/episode", {
    signal,
  });

  const remainingPages = Array.from(
    { length: firstPage.info.pages - 1 },
    (_, index) => index + 2
  );

  const rest = await Promise.all(
    remainingPages.map((page) =>
      api
        .get<ApiList<Episode>>(`/episode?page=${page}`, { signal })
        .then((response) => response.data.results)
    )
  );

  return [firstPage.results, ...rest].flat();
}
