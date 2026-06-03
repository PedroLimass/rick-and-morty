import { describe, it, expect } from "vitest";
import { getIdFromUrl } from "./getIdFromUrl";

describe("getIdFromUrl", () => {
  it("extrai o id de uma URL de personagem", () => {
    expect(getIdFromUrl("https://rickandmortyapi.com/api/character/38")).toBe(
      38
    );
  });

  it("extrai o id de uma URL de episódio", () => {
    expect(getIdFromUrl("https://rickandmortyapi.com/api/episode/1")).toBe(1);
  });

  it("ignora barra final", () => {
    expect(getIdFromUrl("https://rickandmortyapi.com/api/location/12/")).toBe(
      12
    );
  });

  it("retorna null para string vazia ou undefined", () => {
    expect(getIdFromUrl("")).toBeNull();
    expect(getIdFromUrl(undefined)).toBeNull();
  });

  it("retorna null quando não há id numérico", () => {
    expect(getIdFromUrl("https://rickandmortyapi.com/api/character/")).toBeNull();
  });
});
