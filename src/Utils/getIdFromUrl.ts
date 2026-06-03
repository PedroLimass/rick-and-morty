/**
 * Extrai o ID numérico do final de uma URL da API
 * (ex.: ".../character/38" -> 38). Retorna null quando não há ID.
 */
export const getIdFromUrl = (url?: string): number | null => {
  if (!url) return null;
  const match = url.match(/\/(\d+)\/?$/);
  return match ? Number(match[1]) : null;
};
