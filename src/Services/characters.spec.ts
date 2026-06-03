import { describe, it, expect, beforeEach, vi } from "vitest";

import api from "./index";
import { getCharactersByIds } from "./characters";

vi.mock("./index", () => ({ default: { get: vi.fn() } }));

const mockedGet = vi.mocked(api.get);

beforeEach(() => {
  mockedGet.mockReset();
});

describe("getCharactersByIds", () => {
  it("retorna [] e não chama a API quando não há ids", async () => {
    const result = await getCharactersByIds([]);
    expect(result).toEqual([]);
    expect(mockedGet).not.toHaveBeenCalled();
  });

  it("normaliza para array quando a API retorna um único objeto", async () => {
    mockedGet.mockResolvedValue({ data: { id: 1, name: "Rick" } });

    const result = await getCharactersByIds([1]);

    expect(result).toEqual([{ id: 1, name: "Rick" }]);
    expect(mockedGet).toHaveBeenCalledWith("/character/1", expect.anything());
  });

  it("remove ids duplicados e inválidos ao montar a requisição em lote", async () => {
    mockedGet.mockResolvedValue({ data: [{ id: 1 }, { id: 2 }] });

    const result = await getCharactersByIds([1, 2, 2, NaN]);

    expect(result).toHaveLength(2);
    expect(mockedGet).toHaveBeenCalledWith("/character/1,2", expect.anything());
  });
});
