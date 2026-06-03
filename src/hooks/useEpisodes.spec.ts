import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

import { useEpisodes } from "./useEpisodes";
import { getAllEpisodes } from "../Services/episodes";
import { getCharactersByIds } from "../Services/characters";
import type { Character, Episode } from "../types/rickAndMorty";

vi.mock("../Services/episodes");
vi.mock("../Services/characters");

const episodes = [
  {
    id: 1,
    name: "Pilot",
    episode: "S01E01",
    air_date: "December 2, 2013",
    characters: [
      "https://rickandmortyapi.com/api/character/1",
      "https://rickandmortyapi.com/api/character/435",
    ],
    url: "",
    created: "",
  },
  {
    id: 11,
    name: "A Rickle in Time",
    episode: "S02E01",
    air_date: "July 26, 2015",
    characters: [
      "https://rickandmortyapi.com/api/character/1",
      "https://rickandmortyapi.com/api/character/200",
    ],
    url: "",
    created: "",
  },
] as Episode[];

beforeEach(() => {
  vi.mocked(getAllEpisodes).mockResolvedValue(episodes);
  vi.mocked(getCharactersByIds).mockResolvedValue([
    { id: 435, image: "img435" } as Character,
    { id: 200, image: "img200" } as Character,
  ]);
});

describe("useEpisodes", () => {
  it("agrupa por temporada e usa o último personagem como imagem", async () => {
    const { result } = renderHook(() => useEpisodes());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.episodes).toHaveLength(2);
    expect(result.current.seasons["01"]).toHaveLength(1);
    expect(result.current.seasons["02"]).toHaveLength(1);
    expect(result.current.seasons["01"][0].image).toBe("img435");
    expect(result.current.seasons["02"][0].image).toBe("img200");
    expect(result.current.error).toBeNull();
  });

  it("expõe mensagem de erro quando a busca falha", async () => {
    vi.mocked(getAllEpisodes).mockRejectedValue(new Error("500"));

    const { result } = renderHook(() => useEpisodes());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toMatch(/não foi possível/i);
    expect(result.current.episodes).toHaveLength(0);
  });
});
