import api from "./index";
import type { Character } from "../types/rickAndMorty";

/**
 * Busca vários personagens de uma só vez usando o endpoint em lote
 * da API (`/character/[1,2,3]`), evitando uma requisição por item.
 * Quando há apenas um ID, a API retorna um objeto em vez de array.
 */
export async function getCharactersByIds(
  ids: number[],
  signal?: AbortSignal
): Promise<Character[]> {
  const uniqueIds = [...new Set(ids)].filter((id) => Number.isFinite(id));
  if (uniqueIds.length === 0) return [];

  const { data } = await api.get<Character | Character[]>(
    `/character/${uniqueIds.join(",")}`,
    { signal }
  );

  return Array.isArray(data) ? data : [data];
}
