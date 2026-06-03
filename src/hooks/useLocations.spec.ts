import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";

import { useLocations } from "./useLocations";
import { getLocationsPage } from "../Services/locations";
import { getCharactersByIds } from "../Services/characters";
import type { ApiList, Character, Location } from "../types/rickAndMorty";

vi.mock("../Services/locations");
vi.mock("../Services/characters");

const makePage = (
  _page: number,
  next: string | null,
  results: Partial<Location>[]
): ApiList<Location> =>
  ({
    info: { count: 0, pages: 9, next, prev: null },
    results,
  }) as ApiList<Location>;

beforeEach(() => {
  vi.mocked(getCharactersByIds).mockResolvedValue([]);
});

describe("useLocations", () => {
  it("carrega a primeira página e anexa as imagens dos residentes", async () => {
    vi.mocked(getLocationsPage).mockResolvedValue(
      makePage(1, "next", [
        {
          id: 1,
          name: "Earth",
          dimension: "D",
          residents: ["https://rickandmortyapi.com/api/character/38"],
        },
      ])
    );
    vi.mocked(getCharactersByIds).mockResolvedValue([
      { id: 38, image: "img38" } as Character,
    ]);

    const { result } = renderHook(() => useLocations());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.locations).toHaveLength(1);
    expect(result.current.locations[0].image).toBe("img38");
    expect(result.current.hasMore).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it("trata 404 como 'nenhum resultado' (sem erro)", async () => {
    vi.mocked(getLocationsPage).mockRejectedValue(
      Object.assign(new Error("not found"), {
        isAxiosError: true,
        response: { status: 404 },
      })
    );

    const { result } = renderHook(() => useLocations({ name: "zzz" }));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.locations).toHaveLength(0);
    expect(result.current.hasMore).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("reseta a lista ao trocar os filtros", async () => {
    vi.mocked(getLocationsPage).mockImplementation((_page, filters) =>
      Promise.resolve(
        makePage(1, null, [
          {
            id: filters?.name === "a" ? 1 : 2,
            name: String(filters?.name),
            dimension: "d",
            residents: [],
          },
        ])
      )
    );

    const { result, rerender } = renderHook((f) => useLocations(f), {
      initialProps: { name: "a" },
    });

    await waitFor(() => expect(result.current.locations[0]?.id).toBe(1));

    rerender({ name: "b" });

    await waitFor(() => expect(result.current.locations[0]?.id).toBe(2));
    expect(result.current.locations).toHaveLength(1);
  });

  it("expõe mensagem de erro em falhas que não são 404", async () => {
    vi.mocked(getLocationsPage).mockRejectedValue(new Error("500"));

    const { result } = renderHook(() => useLocations());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toMatch(/não foi possível/i);
  });

  it("loadMore busca e concatena a próxima página", async () => {
    vi.mocked(getLocationsPage).mockImplementation((page) =>
      Promise.resolve(
        makePage(page, page < 2 ? "next" : null, [
          { id: page, name: `L${page}`, dimension: "d", residents: [] },
        ])
      )
    );

    const { result } = renderHook(() => useLocations());

    await waitFor(() => expect(result.current.locations).toHaveLength(1));

    act(() => result.current.loadMore());

    await waitFor(() => expect(result.current.locations).toHaveLength(2));
    expect(result.current.hasMore).toBe(false);
  });
});
